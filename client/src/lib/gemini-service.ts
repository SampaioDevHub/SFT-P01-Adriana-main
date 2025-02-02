/* eslint-disable no-console */
import axios from "axios"

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"

export interface GeminiMessage {
  role: "user" | "model"
  content: string
}

// Cache para respostas comuns
const messageCache = new Map<string, string>()

const SYSTEM_PROMPT = `Você é um assistente virtual especializado da Adriana Showroom. 
Suas respostas devem ser:
- Concisas e diretas (máximo 2-3 frases) 
- Focadas em moda, roupas e acessórios
- Profissionais e amigáveis
- Sempre relacionadas ao contexto do showroom

Conhecimentos específicos:
- Horário de funcionamento: 9h às 18h
- Tipos de produtos: roupas femininas, acessórios, calçados
- Formas de pagamento: cartão, PIX, dinheiro
- Política de trocas: até 7 dias após a compra`

function normalizeQuestion(question: string): string {
  return question.toLowerCase().trim()
}

export async function sendMessageToGemini(message: string): Promise<string> {
  const normalizedMessage = normalizeQuestion(message)

  // Verifica cache
  if (messageCache.has(normalizedMessage)) {
    return messageCache.get(normalizedMessage)!
  }

  try {
    const response = await axios.post(`${API_URL}?key=${GEMINI_API_KEY}`, {
      contents: [
        {
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\nUsuário: ${message}\nAssistente:`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.3, // Mais preciso
        maxOutputTokens: 100, // Respostas mais curtas
        topP: 0.8,
        topK: 40,
      },
    })

    const aiResponse = response.data.candidates[0].content.parts[0].text

    // Armazena no cache se for uma pergunta comum
    if (shouldCacheResponse(normalizedMessage)) {
      messageCache.set(normalizedMessage, aiResponse)
    }

    return aiResponse
  } catch (error) {
    console.error("Error calling Gemini API:", error)
    throw new Error("Failed to get response from AI")
  }
}

// Determina se uma pergunta deve ser cacheada
function shouldCacheResponse(message: string): boolean {
  const commonQuestions = [
    "horário",
    "funcionamento",
    "pagamento",
    "troca",
    "endereço",
    "localização",
    "preço",
    "desconto",
    "promoção",
  ]

  return commonQuestions.some((q) => message.includes(q))
}

