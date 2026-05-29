import { GoogleGenerativeAI } from '@google/generative-ai'

const MOCK_RESULT = [
  { word: 'Serendipity', translation_ru: 'Счастливая случайность', example_sentence: 'Finding that old bookstore was pure serendipity — I discovered my favourite author.', difficulty: 'hard' },
  { word: 'Perseverance', translation_ru: 'Настойчивость, упорство', example_sentence: 'Her perseverance through years of training finally paid off at the Olympics.', difficulty: 'medium' },
  { word: 'Eloquent', translation_ru: 'Красноречивый', example_sentence: 'His eloquent speech moved the entire crowd to tears.', difficulty: 'medium' },
  { word: 'Inevitable', translation_ru: 'Неизбежный', example_sentence: 'Change is inevitable; the key is how we adapt to it.', difficulty: 'easy' },
  { word: 'Meticulous', translation_ru: 'Тщательный, дотошный', example_sentence: 'The meticulous scientist recorded every observation in precise detail.', difficulty: 'hard' },
]

export async function mineWords(text) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey) {
    await new Promise(r => setTimeout(r, 1200))
    return { data: MOCK_RESULT, mock: true }
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `Analyze this text and extract 5-8 interesting or advanced vocabulary words that would be useful to learn.
For each word provide:
- word: the word in its base form
- translation_ru: Russian translation
- example_sentence: a clear example sentence using the word (from the text or a new one)
- difficulty: "easy", "medium", or "hard"

Return ONLY a valid JSON array, no markdown, no explanation.

Text: """
${text.slice(0, 3000)}
"""`

    const result = await model.generateContent(prompt)
    const raw = result.response.text().trim()
    const clean = raw.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim()
    const data = JSON.parse(clean)
    return { data, mock: false }
  } catch (err) {
    console.error('Gemini error:', err)
    return { data: MOCK_RESULT, mock: true, error: err.message }
  }
}
