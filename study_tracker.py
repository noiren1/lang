#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Study Tracker — ежедневный трекер учёбы для подготовки к HSK 4 и DET.
Хранит данные в study_tracker.json, использует только встроенные библиотеки.
"""

import json
import os
import sys
from datetime import date, datetime, timedelta

# ─── Константы ────────────────────────────────────────────────────────────────

DATA_FILE = "study_tracker.json"

HSK_EXAM_DATE  = date(2026, 7, 28)
DET_EXAM_DATE  = date(2026, 9, 8)
HSK_TOTAL_WORDS = 600           # целевое количество слов HSK 4
MIN_HABITS      = 5             # минимум привычек для засчёта серии

HABITS = [
    ("quizlet_night",    "Quizlet китайский (ночная сессия)"),
    ("chinese_main",     "Основная сессия китайского"),
    ("det_prep",         "Подготовка к DET (английский)"),
    ("morning_walk",     "Утренняя прогулка 20 минут"),
    ("power_nap",        "Power nap 20 минут"),
    ("cs50",             "Программирование CS50"),
    ("arabic",           "Арабский язык (база)"),
    ("quizlet_evening",  "Вечерний повтор Quizlet"),
    ("movie",            "Фильм"),
]

# Исламские цитаты (хадисы) — для нечётных дней
ISLAMIC_QUOTES = [
    {
        "ar": "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
        "ru": "Стремление к знаниям — обязанность каждого мусульманина. (Ибн Маджа)"
    },
    {
        "ar": "إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ",
        "ru": "Воистину, Аллах любит, когда кто-либо из вас делает дело, делает его превосходно. (Байхаки)"
    },
    {
        "ar": "أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ",
        "ru": "Самые любимые дела перед Аллахом — те, что постоянны, пусть даже малые. (Бухари)"
    },
    {
        "ar": "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
        "ru": "Кто идёт по пути поиска знания — Аллах облегчит ему путь в рай. (Муслим)"
    },
    {
        "ar": "اغْتَنِمْ خَمْسًا قَبْلَ خَمْسٍ: شَبَابَكَ قَبْلَ هَرَمِكَ",
        "ru": "Береги пять до пяти: молодость — до старости. (Хаким)"
    },
    {
        "ar": "الْعِلْمُ نُورٌ يَقْذِفُهُ اللَّهُ فِي قَلْبِ مَنْ يَشَاءُ",
        "ru": "Знание — свет, который Аллах вкладывает в сердце тому, кому пожелает. (Атрибутируется Шафии)"
    },
    {
        "ar": "مَنْ أَرَادَ الدُّنْيَا فَعَلَيْهِ بِالْعِلْمِ، وَمَنْ أَرَادَ الآخِرَةَ فَعَلَيْهِ بِالْعِلْمِ",
        "ru": "Кто хочет мирского — пусть ищет знание; кто хочет вечного — пусть ищет знание. (Шафии)"
    },
]

# Научные факты о памяти и языках — для чётных дней
SCIENCE_FACTS = [
    "🧠 BDNF (белок мозга): физические упражнения повышают уровень BDNF, укрепляя нейронные связи — именно поэтому прогулка утром усиливает запоминание слов.",
    "💤 REM-сон: во время фазы быстрого сна мозг переносит слова из кратковременной памяти в долговременную. 7–8 часов сна удваивают удержание новой лексики.",
    "🔁 Интервальное повторение: алгоритм Leitner показывает, что повтор через 1→3→7→14→30 дней снижает забывание до <5% против 80% без системы.",
    "🌐 Эффект двуязычия: билингвы имеют плотнее серое вещество в левой нижней теменной доле — это замедляет возрастное снижение когнитивных функций.",
    "🎬 Comprehensible input (Крашен): просмотр фильмов на изучаемом языке с субтитрами того же языка ускоряет восприятие речи на слух быстрее, чем учебники.",
    "⏰ Эффект тестирования (Testing Effect): самопроверка закрепляет материал в 2–3 раза лучше пассивного чтения — это объясняет пользу Quizlet.",
    "😴 Power nap 20 минут: короткий сон сбрасывает «буфер» гиппокампа, освобождая место для новых воспоминаний во второй половине дня.",
    "🔤 Фонологическая петля: рабочая память хранит ~7 слогов ~2 секунды — именно поэтому короткие слова и чанкинг иероглифов запоминаются легче.",
    "📈 Порог активной лексики: для понимания 95% устной речи нужно ~3000 самых частых слов. HSK 4 (~1200 слов) даёт уверенное понимание китайского медиа.",
    "🎵 Музыкальный эффект: тональные языки (китайский) легче даются людям с музыкальным слухом — мозг использует те же зоны для тона высоты и тона слова.",
]

# ─── Работа с данными ──────────────────────────────────────────────────────────

def load_data() -> dict:
    """Загрузить данные из JSON или вернуть пустую структуру."""
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {
        "days": {},            # ключ — строка "YYYY-MM-DD"
        "streak": 0,
        "max_streak": 0,
        "total_hsk_words": 0,
        "test_history": [],    # список {"date": ..., "hsk_pct": ..., "det_score": ...}
    }

def save_data(data: dict) -> None:
    """Сохранить данные в JSON с отступами для читаемости."""
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

# ─── Визуальные утилиты ────────────────────────────────────────────────────────

def progress_bar(done: int, total: int, width: int = 20) -> str:
    """Вернуть ASCII прогресс-бар заданной ширины."""
    if total <= 0:
        pct = 100
    else:
        pct = min(100, int(done / total * 100))
    filled = int(width * pct / 100)
    bar = "█" * filled + "░" * (width - filled)
    return f"[{bar}] {pct}% ({done}/{total})"

def days_left(target: date) -> int:
    """Количество дней до даты экзамена."""
    delta = (target - date.today()).days
    return max(0, delta)

def days_since_start(target: date, total_days: int) -> int:
    """Сколько дней прошло из отведённых (для прогресс-бара)."""
    return max(0, total_days - days_left(target))

# ─── Приветствие ──────────────────────────────────────────────────────────────

def show_greeting(data: dict) -> None:
    """Показать приветственный экран с датами, прогрессом и серией."""
    today = date.today()
    print("\n" + "═" * 52)
    print(f"  📅  {today.strftime('%A, %d %B %Y')}")
    print("═" * 52)

    # Прогресс-бары до экзаменов
    # Считаем общий диапазон от условной «точки старта» до экзамена.
    # Используем 1 января 2026 как старт для HSK и DET.
    hsk_start  = date(2026, 1, 1)
    det_start  = date(2026, 1, 1)
    hsk_total  = (HSK_EXAM_DATE - hsk_start).days
    det_total  = (DET_EXAM_DATE - det_start).days
    hsk_passed = (today - hsk_start).days
    det_passed = (today - det_start).days

    hsk_left = days_left(HSK_EXAM_DATE)
    det_left = days_left(DET_EXAM_DATE)

    print(f"\n  ⏳  Дней до экзаменов:")
    print(f"  HSK 4  {progress_bar(hsk_passed, hsk_total)}  осталось {hsk_left} дн.")
    print(f"  DET    {progress_bar(det_passed, det_total)}  осталось {det_left} дн.")

    # Серия
    streak = data.get("streak", 0)
    max_streak = data.get("max_streak", 0)
    print(f"\n  🔥  Текущая серия: {streak} дн.  (рекорд: {max_streak} дн.)")

    # Прогресс слов HSK
    total_words = data.get("total_hsk_words", 0)
    words_left  = HSK_TOTAL_WORDS - total_words
    # Сколько нужно слов в день чтобы успеть
    daily_needed = round(words_left / hsk_left) if hsk_left > 0 else 0
    print(f"  📖  Слов HSK: {total_words}/{HSK_TOTAL_WORDS}  "
          f"(нужно ≈{daily_needed}/день чтобы успеть)")
    print("═" * 52 + "\n")

# ─── Чекин привычек ───────────────────────────────────────────────────────────

def ask_yes_no(prompt: str) -> bool:
    """Спросить д/н и вернуть True/False."""
    while True:
        ans = input(f"  {prompt} [д/н]: ").strip().lower()
        if ans in ("д", "да", "y", "yes", "1"):
            return True
        if ans in ("н", "нет", "n", "no", "0"):
            return False
        print("  Введите д или н.")

def checkin_habits() -> dict:
    """Провести чекин всех привычек и вернуть словарь результатов."""
    print("─" * 52)
    print("  ✅  Чекин привычек за сегодня:")
    print("─" * 52)

    results = {}
    for key, label in HABITS:
        if key == "movie":
            watched = ask_yes_no(f"🎬  {label}")
            results[key] = watched
            if watched:
                # Уточнить язык фильма
                while True:
                    lang = input("     Язык фильма [1] Английский  [2] Китайский: ").strip()
                    if lang == "1":
                        results["movie_lang"] = "english"
                        break
                    elif lang == "2":
                        results["movie_lang"] = "chinese"
                        break
                    print("     Введите 1 или 2.")
            else:
                results["movie_lang"] = None
        else:
            results[key] = ask_yes_no(f"{'📚' if 'chinese' in key or 'quizlet' in key else '🏃' if 'walk' in key or 'nap' in key else '💻' if key == 'cs50' else '🕌' if key == 'arabic' else '📝'}  {label}")

    return results

def ask_session_mode() -> str:
    """Спросить режим дня и вернуть 'full' или 'minimal'."""
    print()
    while True:
        mode = input("  📋  Режим дня: [1] Полная сессия  [2] Минимальный режим: ").strip()
        if mode == "1":
            return "full"
        if mode == "2":
            return "minimal"
        print("  Введите 1 или 2.")

def ask_hsk_words() -> int:
    """Спросить количество новых слов HSK и вернуть число."""
    while True:
        try:
            n = input("  📖  Сколько новых слов HSK выучил сегодня? (число): ").strip()
            return max(0, int(n))
        except ValueError:
            print("  Введите целое число.")

def ask_note() -> str:
    """Спросить заметку дня."""
    note = input("  ✍️   Одна строка — что было сложно или что заметил сегодня:\n  > ").strip()
    return note

# ─── Тесты (воскресенье) ──────────────────────────────────────────────────────

def ask_test_results() -> dict | None:
    """Если сегодня воскресенье — спросить результаты тестов."""
    if date.today().weekday() != 6:  # 6 = воскресенье
        return None

    print("\n  📊  Воскресенье — время записать результаты тестов!")

    hsk_pct = None
    det_score = None

    if ask_yes_no("  Делал HSK mock-тест на этой неделе?"):
        while True:
            try:
                hsk_pct = float(input("  Результат HSK mock-теста (0–100%): ").strip())
                if 0 <= hsk_pct <= 100:
                    break
                print("  Введите число от 0 до 100.")
            except ValueError:
                print("  Введите число.")

    if ask_yes_no("  Делал DET пробник на этой неделе?"):
        while True:
            try:
                det_score = float(input("  Результат DET пробника (0–160 баллов): ").strip())
                if 0 <= det_score <= 160:
                    break
                print("  Введите число от 0 до 160.")
            except ValueError:
                print("  Введите число.")

    if hsk_pct is None and det_score is None:
        return None

    return {
        "date": date.today().isoformat(),
        "hsk_pct": hsk_pct,
        "det_score": det_score,
    }

# ─── Серия и достижения ───────────────────────────────────────────────────────

def count_done_habits(habits: dict) -> int:
    """Подсчитать количество выполненных привычек из 9."""
    keys = [k for k, _ in HABITS]
    return sum(1 for k in keys if habits.get(k, False))

def update_streak(data: dict, habits_done: int) -> int:
    """Обновить серию и вернуть новое значение."""
    today_str = date.today().isoformat()
    yesterday_str = (date.today() - timedelta(days=1)).isoformat()

    if habits_done >= MIN_HABITS:
        # Серия продолжается если вчера тоже был чекин с ≥5 привычек
        yesterday_data = data["days"].get(yesterday_str, {})
        yesterday_ok = count_done_habits(yesterday_data.get("habits", {})) >= MIN_HABITS

        if yesterday_ok or data["streak"] == 0:
            data["streak"] += 1
        else:
            data["streak"] = 1  # серия прервалась, начинаем заново
    else:
        data["streak"] = 0

    data["max_streak"] = max(data.get("max_streak", 0), data["streak"])
    return data["streak"]

def check_streak_milestone(streak: int) -> str | None:
    """Вернуть поздравление если серия достигла вехи."""
    milestones = {
        7:  "🎉  Неделя подряд! 7 дней — отличное начало!",
        14: "🌟  Две недели! 14 дней — привычка формируется!",
        21: "🏆  21 день! Говорят, именно столько нужно для привычки. Ты сделал это!",
        30: "🥇  30 ДНЕЙ! Месяц без пропусков — это настоящая дисциплина. Машааллах!",
    }
    return milestones.get(streak)

# ─── Мотивация ────────────────────────────────────────────────────────────────

def show_motivation() -> None:
    """Показать мотивационное сообщение — нечётный/чётный день."""
    day_num = date.today().timetuple().tm_yday  # номер дня в году
    print("\n" + "─" * 52)

    if day_num % 2 == 1:
        # Нечётный день — исламская цитата
        idx = (day_num // 2) % len(ISLAMIC_QUOTES)
        q = ISLAMIC_QUOTES[idx]
        print("  🕌  Мудрость дня:")
        print(f"\n  «{q['ar']}»")
        print(f"\n  {q['ru']}")
    else:
        # Чётный день — научный факт
        idx = (day_num // 2) % len(SCIENCE_FACTS)
        print("  🔬  Наука о памяти:")
        print(f"\n  {SCIENCE_FACTS[idx]}")

    print("─" * 52 + "\n")

# ─── Итоги недели ─────────────────────────────────────────────────────────────

def show_week_summary(data: dict) -> None:
    """Показать статистику за последние 7 дней."""
    print("\n" + "═" * 52)
    print("  📊  ИТОГИ НЕДЕЛИ")
    print("═" * 52)

    today = date.today()
    week_days = [(today - timedelta(days=i)).isoformat() for i in range(6, -1, -1)]

    # Счётчики привычек
    habit_counts = {k: 0 for k, _ in HABITS}
    full_days    = 0
    minimal_days = 0
    words_week   = 0
    days_recorded = 0

    for day_str in week_days:
        day_data = data["days"].get(day_str)
        if not day_data:
            continue
        days_recorded += 1
        habits = day_data.get("habits", {})
        for key, _ in HABITS:
            if habits.get(key, False):
                habit_counts[key] += 1
        mode = day_data.get("mode", "")
        if mode == "full":
            full_days += 1
        elif mode == "minimal":
            minimal_days += 1
        words_week += day_data.get("hsk_words", 0)

    print(f"\n  Записей за неделю: {days_recorded}/7\n")

    # % выполнения каждой привычки
    print("  Выполнение привычек за 7 дней:")
    for key, label in HABITS:
        count = habit_counts[key]
        pct   = int(count / 7 * 100)
        bar   = "█" * int(pct / 10) + "░" * (10 - int(pct / 10))
        print(f"  {label[:28]:<28} [{bar}] {count}/7")

    print(f"\n  📅  Полных сессий: {full_days}  |  Минимальных: {minimal_days}")
    print(f"  📖  Слов HSK за неделю: {words_week}")

    # График результатов тестов (все воскресенья)
    history = data.get("test_history", [])
    if history:
        print("\n  📈  История тестов (воскресенья):")
        print(f"  {'Дата':<12} {'HSK %':>7} {'DET баллы':>10}")
        print("  " + "─" * 32)
        for entry in history[-10:]:  # последние 10 записей
            hsk  = f"{entry['hsk_pct']:.0f}%" if entry.get("hsk_pct") is not None else "  —"
            det  = f"{entry['det_score']:.0f}"  if entry.get("det_score") is not None else "—"
            print(f"  {entry['date']:<12} {hsk:>7} {det:>10}")

        # ASCII-график DET если есть данные
        det_entries = [e for e in history if e.get("det_score") is not None]
        if len(det_entries) >= 2:
            print("\n  DET прогресс (макс. 160):")
            for e in det_entries[-8:]:
                score = e["det_score"]
                bar_w = int(score / 160 * 30)
                bar   = "█" * bar_w
                print(f"  {e['date']}: [{bar:<30}] {score:.0f}")

    print("═" * 52 + "\n")

# ─── Полная статистика ────────────────────────────────────────────────────────

def show_full_stats(data: dict) -> None:
    """Показать сводную статистику за всё время."""
    today = date.today()
    print("\n" + "═" * 52)
    print("  📊  ПОЛНАЯ СТАТИСТИКА")
    print("═" * 52)

    total_days = len(data["days"])
    streak     = data.get("streak", 0)
    max_streak = data.get("max_streak", 0)
    total_words = data.get("total_hsk_words", 0)
    hsk_left   = days_left(HSK_EXAM_DATE)
    det_left   = days_left(DET_EXAM_DATE)

    print(f"\n  Всего записей:       {total_days} дней")
    print(f"  Текущая серия:       {streak} дн.")
    print(f"  Рекорд серии:        {max_streak} дн.")
    print(f"  Слов HSK выучено:    {total_words}/{HSK_TOTAL_WORDS}")
    print(f"  До HSK 4:            {hsk_left} дней  ({HSK_EXAM_DATE})")
    print(f"  До DET:              {det_left} дней  ({DET_EXAM_DATE})")

    # Общий % выполнения привычек
    if total_days > 0:
        habit_totals = {k: 0 for k, _ in HABITS}
        for day_data in data["days"].values():
            habits = day_data.get("habits", {})
            for key, _ in HABITS:
                if habits.get(key, False):
                    habit_totals[key] += 1
        print("\n  Общее выполнение привычек:")
        for key, label in HABITS:
            pct = int(habit_totals[key] / total_days * 100)
            bar = "█" * int(pct / 10) + "░" * (10 - int(pct / 10))
            print(f"  {label[:28]:<28} [{bar}] {pct}%")

    history = data.get("test_history", [])
    if history:
        last = history[-1]
        print(f"\n  Последний тест ({last['date']}):")
        if last.get("hsk_pct") is not None:
            print(f"    HSK mock:  {last['hsk_pct']:.0f}%")
        if last.get("det_score") is not None:
            print(f"    DET пробник: {last['det_score']:.0f}/160")

    print("═" * 52 + "\n")

# ─── Основной поток ───────────────────────────────────────────────────────────

def daily_checkin(data: dict) -> None:
    """Ежедневный чекин: привычки, слова, заметка, серия, мотивация."""
    today_str = date.today().isoformat()

    # Проверить — уже делали чекин сегодня?
    if today_str in data["days"]:
        print(f"\n  ✅  Чекин за {today_str} уже сделан.")
        reopen = ask_yes_no("  Хочешь перезаписать данные за сегодня?")
        if not reopen:
            show_full_stats(data)
            return

    show_greeting(data)

    habits  = checkin_habits()
    mode    = ask_session_mode()
    words   = ask_hsk_words()
    note    = ask_note()

    # Тест в воскресенье
    test_result = ask_test_results()
    if test_result:
        data["test_history"].append(test_result)
        print("  💾  Результаты теста сохранены.")

    # Сохранить день
    data["days"][today_str] = {
        "habits":    habits,
        "mode":      mode,
        "hsk_words": words,
        "note":      note,
    }

    # Обновить общий счёт слов
    # Если перезаписываем — вычесть старое значение
    old_words = 0
    if today_str in data["days"]:
        old_words = data["days"][today_str].get("hsk_words", 0)
    data["total_hsk_words"] = data.get("total_hsk_words", 0) - old_words + words
    data["total_hsk_words"] = max(0, data["total_hsk_words"])

    # Серия
    done_count = count_done_habits(habits)
    streak     = update_streak(data, done_count)

    # Сохранить
    save_data(data)

    # Итог чекина
    print("\n" + "─" * 52)
    print(f"  ✅  Сохранено! Привычек выполнено: {done_count}/9")
    print(f"  🔥  Серия: {streak} дн.  |  📖  Всего слов: {data['total_hsk_words']}")

    milestone = check_streak_milestone(streak)
    if milestone:
        print(f"\n  {milestone}")

    # Воскресенье — показать итоги недели
    if date.today().weekday() == 6:
        show_week_summary(data)

    show_motivation()

# ─── Команда words ────────────────────────────────────────────────────────────

def add_words_manually(data: dict, n: int) -> None:
    """Добавить N слов HSK вручную (без полного чекина)."""
    data["total_hsk_words"] = data.get("total_hsk_words", 0) + n
    save_data(data)
    print(f"\n  ✅  Добавлено {n} слов. Всего: {data['total_hsk_words']}/{HSK_TOTAL_WORDS}\n")

# ─── Точка входа ──────────────────────────────────────────────────────────────

def main() -> None:
    data = load_data()
    args = sys.argv[1:]

    if not args:
        daily_checkin(data)

    elif args[0] == "stats":
        show_greeting(data)
        show_full_stats(data)

    elif args[0] == "week":
        show_week_summary(data)

    elif args[0] == "words" and len(args) == 2:
        try:
            n = int(args[1])
            if n <= 0:
                raise ValueError
            add_words_manually(data, n)
        except ValueError:
            print("\n  ❌  Укажи положительное число: python study_tracker.py words 15\n")

    else:
        print("\n  Использование:")
        print("  python study_tracker.py          — ежедневный чекин")
        print("  python study_tracker.py stats    — полная статистика")
        print("  python study_tracker.py week     — итоги недели")
        print("  python study_tracker.py words N  — добавить N слов HSK\n")


if __name__ == "__main__":
    main()
