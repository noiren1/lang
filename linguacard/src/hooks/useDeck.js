import { useState, useEffect } from 'react'

const STORAGE_KEY = 'linguacard_deck'
const PROGRESS_KEY = 'linguacard_progress'

const SAMPLE_CARDS = [
  { id: '1', word: 'Ephemeral', translation: 'Мимолётный, кратковременный', example: 'The ephemeral beauty of cherry blossoms makes them even more special.', difficulty: 'hard', nextReview: Date.now(), interval: 1, easeFactor: 2.5 },
  { id: '2', word: 'Resilient', translation: 'Стойкий, упругий', example: 'She was resilient enough to bounce back after every setback.', difficulty: 'medium', nextReview: Date.now(), interval: 1, easeFactor: 2.5 },
  { id: '3', word: 'Ambiguous', translation: 'Неоднозначный, двусмысленный', example: 'His ambiguous answer left everyone confused about his intentions.', difficulty: 'medium', nextReview: Date.now(), interval: 1, easeFactor: 2.5 },
  { id: '4', word: 'Eloquent', translation: 'Красноречивый', example: 'The eloquent speaker captivated the entire audience for two hours.', difficulty: 'easy', nextReview: Date.now(), interval: 1, easeFactor: 2.5 },
  { id: '5', word: 'Meticulous', translation: 'Дотошный, тщательный', example: 'The meticulous artist spent hours perfecting every tiny detail.', difficulty: 'hard', nextReview: Date.now(), interval: 1, easeFactor: 2.5 },
]

function loadDeck() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return SAMPLE_CARDS
}

function loadProgress() {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return { streak: 0, lastStudied: null, learnedToday: 0, totalLearned: 0, lastDate: null }
}

export function useDeck() {
  const [deck, setDeck] = useState(loadDeck)
  const [progress, setProgress] = useState(loadProgress)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deck))
  }, [deck])

  useEffect(() => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
  }, [progress])

  function addCards(cards) {
    setDeck(prev => {
      const existingWords = new Set(prev.map(c => c.word.toLowerCase()))
      const newCards = cards
        .filter(c => !existingWords.has(c.word.toLowerCase()))
        .map(c => ({ ...c, id: Date.now() + Math.random(), nextReview: Date.now(), interval: 1, easeFactor: 2.5 }))
      return [...prev, ...newCards]
    })
  }

  function reviewCard(id, knew) {
    setDeck(prev => prev.map(card => {
      if (card.id !== id) return card
      if (knew) {
        const newInterval = Math.round(card.interval * card.easeFactor)
        return { ...card, interval: newInterval, nextReview: Date.now() + newInterval * 86400000, easeFactor: Math.min(card.easeFactor + 0.1, 3.0) }
      } else {
        return { ...card, interval: 1, nextReview: Date.now() + 600000, easeFactor: Math.max(card.easeFactor - 0.2, 1.3) }
      }
    }))

    const today = new Date().toDateString()
    setProgress(prev => {
      const isNewDay = prev.lastDate !== today
      const streak = isNewDay
        ? (prev.lastDate === new Date(Date.now() - 86400000).toDateString() ? prev.streak + 1 : 1)
        : prev.streak
      return {
        streak,
        lastDate: today,
        learnedToday: isNewDay ? 1 : prev.learnedToday + 1,
        totalLearned: prev.totalLearned + 1,
      }
    })
  }

  const dueCards = deck.filter(c => c.nextReview <= Date.now())

  return { deck, dueCards, progress, addCards, reviewCard }
}
