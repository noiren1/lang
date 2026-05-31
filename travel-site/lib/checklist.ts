export interface CheckItem {
  id: string
  label: string
  detail?: string
  emoji: string
}

export interface CheckSection {
  id: string
  title: string
  emoji: string
  color: string
  items: CheckItem[]
}

export const CHECKLIST: CheckSection[] = [
  {
    id: "documents",
    title: "Документы",
    emoji: "📋",
    color: "text-red-400 border-red-500/30 bg-red-500/10",
    items: [
      { id: "passport", emoji: "🛂", label: "Паспорт", detail: "Срок действия минимум 6 месяцев после возвращения" },
      { id: "visa", emoji: "🔖", label: "Виза / разрешение", detail: "Проверь нужна ли виза, ESTA, ETA или eVisa" },
      { id: "insurance", emoji: "🛡️", label: "Медстраховка", detail: "SafetyWing, World Nomads — минимум $100,000 покрытие" },
      { id: "copies", emoji: "📸", label: "Копии документов в облаке", detail: "Google Drive / Dropbox — паспорт, визы, бронирования" },
      { id: "bank_notify", emoji: "🏦", label: "Уведомить банк", detail: "Сообщи банку о странах и датах поездки" },
      { id: "emergency", emoji: "📞", label: "Контакты посольства", detail: "Запиши номер посольства своей страны" },
      { id: "hotel_booking", emoji: "🏨", label: "Бронирования отель/рейс", detail: "Сохрани PDF офлайн + пересли на email" },
    ],
  },
  {
    id: "money",
    title: "Деньги",
    emoji: "💰",
    color: "text-yellow-400 border-yellow-500/30 bg-yellow-500/10",
    items: [
      { id: "travel_card", emoji: "💳", label: "Карта без комиссий", detail: "Revolut, Wise, Charles Schwab" },
      { id: "backup_card", emoji: "💳", label: "Запасная карта", detail: "Другой банк — на случай блокировки основной" },
      { id: "cash", emoji: "💵", label: "Наличные", detail: "Часть в кошельке, часть в багаже" },
      { id: "apple_pay", emoji: "📱", label: "Карты в телефоне", detail: "Apple Pay / Google Pay активированы" },
      { id: "exchange", emoji: "💱", label: "Изучить лучший обмен", detail: "Где менять валюту в конкретной стране" },
    ],
  },
  {
    id: "health",
    title: "Здоровье",
    emoji: "💊",
    color: "text-green-400 border-green-500/30 bg-green-500/10",
    items: [
      { id: "vaccines", emoji: "💉", label: "Прививки", detail: "Проверь рекомендованные для страны назначения" },
      { id: "prescriptions", emoji: "💊", label: "Лекарства по рецепту + запас", detail: "На весь срок + 3-4 дня про запас" },
      { id: "kit", emoji: "🩹", label: "Аптечка", detail: "Имодиум, ибупрофен, антигистамин, пластыри, крем от ожогов" },
      { id: "electrolytes", emoji: "⚡", label: "Электролиты", detail: "Nuun, Liquid IV — для перелёта и акклиматизации" },
      { id: "spf", emoji: "🧴", label: "Солнцезащитный крем SPF 50+", detail: "Особенно для тропических и горных направлений" },
      { id: "repellent", emoji: "🦟", label: "Репеллент от насекомых", detail: "DEET 30%+ для малярийных регионов" },
    ],
  },
  {
    id: "connectivity",
    title: "Связь и технологии",
    emoji: "📶",
    color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    items: [
      { id: "esim", emoji: "📡", label: "eSIM или локальная SIM", detail: "Airalo, Holafly — купи до вылета" },
      { id: "vpn", emoji: "🔒", label: "VPN установлен", detail: "ProtonVPN, Mullvad — для публичного WiFi" },
      { id: "offline_maps", emoji: "🗺️", label: "Офлайн-карты скачаны", detail: "Google Maps или Maps.me — скачай регион" },
      { id: "powerbank", emoji: "🔋", label: "Павербанк 10,000+ мАч", detail: "До 100Вт·ч без разрешения на борту (~27,000 мАч)" },
      { id: "adapter", emoji: "🔌", label: "Универсальный адаптер", detail: "Тип розетки в стране назначения" },
      { id: "cables", emoji: "🪢", label: "Кабели для зарядки × 2", detail: "Запасной кабель для каждого устройства" },
    ],
  },
  {
    id: "packing",
    title: "Сборы",
    emoji: "🎒",
    color: "text-teal-400 border-teal-500/30 bg-teal-500/10",
    items: [
      { id: "packing_cubes", emoji: "📦", label: "Органайзеры-кубы", detail: "Compression cubes — 7 дней в ручную кладь" },
      { id: "clothes", emoji: "👕", label: "Правило 1-2-3", detail: "1 обувь, 2 нижних, 3 верхних — базовый минимум" },
      { id: "lock", emoji: "🔒", label: "Замок на багаж + дверной стопор", detail: "TSA замок для чемодана, резиновый стопор для номера" },
      { id: "rain", emoji: "🌧️", label: "Дождевик / зонт", detail: "Компактный дождевик в рюкзак" },
      { id: "snacks", emoji: "🍫", label: "Снеки на рейс", detail: "Орехи, шоколад, батончики — не зависеть от самолётной еды" },
      { id: "pillow", emoji: "😴", label: "Дорожная подушка", detail: "Надувная — для длинных рейсов" },
      { id: "earplugs", emoji: "🎧", label: "Беруши / наушники с ANC", detail: "Для самолёта, хостела, шумного отеля" },
    ],
  },
  {
    id: "before_flight",
    title: "Перед вылетом",
    emoji: "✈️",
    color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    items: [
      { id: "checkin", emoji: "🎫", label: "Онлайн-регистрация", detail: "Открывается за 24-48 часов до вылета" },
      { id: "electrolytes_drink", emoji: "⚡", label: "Выпить электролиты", detail: "За 1-2 часа до посадки — лучшая защита от джетлага" },
      { id: "notify_someone", emoji: "📱", label: "Сообщить кому-то маршрут", detail: "Кто-то дома должен знать где ты и когда вернёшься" },
      { id: "home", emoji: "🏠", label: "Закрыть/выключить всё дома", detail: "Газ, вода, окна, свет, розетки" },
      { id: "airport_time", emoji: "⏰", label: "Аэропорт за 2+ часа", detail: "Международные рейсы — 3 часа, внутренние — 1.5 часа" },
    ],
  },
]
