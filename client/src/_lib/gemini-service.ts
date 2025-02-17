/* eslint-disable no-console */
import axios from 'axios';

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export interface GeminiMessage {
  role: 'user' | 'model';
  content: string;
}

// Cache para respostas comuns e histórico de conversas
const messageCache = new Map<string, string>();
const conversationHistory: GeminiMessage[] = [];

const SYSTEM_PROMPT = `Você é um assistente virtual especializado da Adriana Showroom, com foco em marketing e vendas no setor de moda. 
Suas respostas devem ser:
- Concisas e diretas (máximo 2-3 frases)
- Focadas em moda, roupas e acessórios, estratégias de marketing e vendas
- Profissionais, amigáveis e sempre relacionadas ao contexto do showroom

Conhecimentos específicos:
- Horário de funcionamento: 9h às 18h
- Tipos de produtos: roupas femininas, acessórios, calçados
- Formas de pagamento: cartão, PIX, dinheiro
- Política de trocas: até 7 dias após a compra
- Estratégias de marketing digital: campanhas no Instagram, anúncios pagos, promoções e descontos
- Técnicas de engajamento de clientes: e-mail marketing, promoções sazonais, parcerias
- Pesquisa de mercado: tendências de moda, concorrência e comportamento de compra
- Aconselhamento de vendas: como aumentar o ticket médio, técnicas de vendas eficazes, upsell e cross-sell`;

function normalizeQuestion(question: string): string {
  return question.toLowerCase().trim();
}

export async function sendMessageToGemini(message: string): Promise<string> {
  const normalizedMessage = normalizeQuestion(message);

  // Verifica cache
  if (messageCache.has(normalizedMessage)) {
    return messageCache.get(normalizedMessage)!;
  }

  // Adiciona mensagem ao histórico
  conversationHistory.push({ role: 'user', content: message });

  try {
    const response = await axios.post(`${API_URL}?key=${GEMINI_API_KEY}`, {
      contents: [
        {
          parts: [
            {
              text: `${SYSTEM_PROMPT}\n\nHistórico: ${formatHistory()}\nUsuário: ${message}\nAssistente:`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 150,
        topP: 0.8,
        topK: 40,
      },
    });

    let aiResponse = response.data.candidates[0].content.parts[0].text;

    // Adiciona resposta ao histórico
    conversationHistory.push({ role: 'model', content: aiResponse });

    // Armazena no cache se for uma pergunta comum
    if (shouldCacheResponse(normalizedMessage)) {
      messageCache.set(normalizedMessage, aiResponse);
    }

    return aiResponse;
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw new Error('Falha ao obter resposta da IA');
  }
}

// Formata o histórico de conversas para melhorar contexto
function formatHistory(): string {
  return conversationHistory
    .slice(-5) // Mantém apenas as últimas 5 mensagens
    .map(
      (msg) =>
        `${msg.role === 'user' ? 'Usuário' : 'Assistente'}: ${msg.content}`
    )
    .join('\n');
}

// Determina se uma pergunta deve ser cacheada
function shouldCacheResponse(message: string): boolean {
  const commonQuestions = [
    'horário',
    'funcionamento',
    'pagamento',
    'troca',
    'endereço',
    'localização',
    'preço',
    'desconto',
    'promoção',
  ];

  return commonQuestions.some((q) => message.includes(q));
}
