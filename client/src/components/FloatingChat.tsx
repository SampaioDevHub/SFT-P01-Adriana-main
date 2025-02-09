/* eslint-disable import/no-unresolved */
"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { X, Send, Loader2, ThumbsUp, ThumbsDown, Bot } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { sendMessageToGemini, type GeminiMessage } from "@/lib/gemini-service"
import { useDebounce } from "@/hooks/use-debounce"

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<(GeminiMessage & { id: string; feedback?: "positive" | "negative" })[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const debouncedInput = useDebounce(inputMessage, 300)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Scroll para a última mensagem
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
    }
  }, [isOpen, scrollToBottom]) // Removed unnecessary dependency: messages

  // Limpa requisição anterior se o usuário digitar rapidamente
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [debouncedInput])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim() || isLoading) return

    const userMessage = inputMessage.trim()
    const messageId = Date.now().toString()
    setInputMessage("")

    // Adiciona mensagem do usuário
    setMessages((prev) => [...prev, { id: messageId, role: "user", content: userMessage }])

    setIsLoading(true)
    abortControllerRef.current = new AbortController()

    try {
      const response = await sendMessageToGemini(userMessage)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "model",
          content: response,
        },
      ])
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "model",
          content: "Desculpe, ocorreu um erro. Por favor, tente novamente.",
        },
      ])
    } finally {
      setIsLoading(false)
      abortControllerRef.current = null
    }
  }

  const handleFeedback = (messageId: string, type: "positive" | "negative") => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, feedback: type } : msg)))
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="absolute bottom-16 right-0 w-[350px] mb-2"
          >
            <Card className="shadow-lg">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="font-semibold">Adriana Showroom</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <ScrollArea className="h-[400px] p-4">
                <div className="flex flex-col gap-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className="flex flex-col gap-2">
                        <div
                          className={`rounded-lg px-4 py-2 max-w-[80%] ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                        >
                          {message.content}
                        </div>
                        {message.role === "model" && !message.feedback && (
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleFeedback(message.id, "positive")}
                            >
                              <ThumbsUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => handleFeedback(message.id, "negative")}
                            >
                              <ThumbsDown className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              <form onSubmit={handleSendMessage} className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite sua mensagem..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <Button className="rounded-full h-14 w-14 shadow-lg" onClick={() => setIsOpen(!isOpen)}>
        <Bot />
      </Button>
    </div>
  )
}

