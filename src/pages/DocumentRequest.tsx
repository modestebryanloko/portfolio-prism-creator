import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/document-chatbot`;

const DocumentRequest = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Start conversation on mount
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    sendMessage([], "Bonjour");
  }, []);

  const extractRequestData = (text: string) => {
    const match = text.match(/<REQUEST_DATA>([\s\S]*?)<\/REQUEST_DATA>/);
    if (match) {
      try {
        return JSON.parse(match[1]);
      } catch {
        return null;
      }
    }
    return null;
  };

  const cleanAssistantMessage = (text: string) => {
    return text.replace(/<REQUEST_DATA>[\s\S]*?<\/REQUEST_DATA>/, "").trim();
  };

  const submitRequest = async (data: Record<string, string>, chatHistory: Message[]) => {
    try {
      const { error } = await supabase.from("document_requests").insert({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone || null,
        organization_name: data.organization_name,
        organization_type: data.organization_type,
        position: data.position || null,
        sector: data.sector || null,
        reason: data.reason,
        chat_history: chatHistory,
      });

      if (error) throw error;
      setRequestSubmitted(true);
      toast.success("Demande envoyée avec succès !");
    } catch (err) {
      console.error("Error submitting request:", err);
      toast.error("Erreur lors de l'envoi de la demande.");
    }
  };

  const sendMessage = async (prevMessages: Message[], userText: string) => {
    const isInit = prevMessages.length === 0;
    const userMsg: Message = { role: "user", content: userText };
    const allMessages = isInit ? [] : [...prevMessages, userMsg];

    if (!isInit) {
      setMessages((prev) => [...prev, userMsg]);
    }

    setIsLoading(true);
    let assistantText = "";

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: isInit
            ? [{ role: "user", content: "Bonjour, je souhaite accéder aux documents de Modeste Loko." }]
            : allMessages,
        }),
      });

      if (!resp.ok || !resp.body) throw new Error("Stream failed");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      const updateAssistant = (text: string) => {
        const cleaned = cleanAssistantMessage(text);
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === "assistant") {
            return prev.map((m, i) => (i === prev.length - 1 ? { ...m, content: cleaned } : m));
          }
          return [...prev, { role: "assistant", content: cleaned }];
        });
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantText += content;
              updateAssistant(assistantText);
            }
          } catch {}
        }
      }

      // Check if AI has collected all data
      const requestData = extractRequestData(assistantText);
      if (requestData) {
        const finalMessages = isInit
          ? [{ role: "assistant" as const, content: cleanAssistantMessage(assistantText) }]
          : [...allMessages, { role: "assistant" as const, content: cleanAssistantMessage(assistantText) }];
        await submitRequest(requestData, finalMessages);
      }
    } catch (err) {
      console.error(err);
      toast.error("Erreur de connexion au chatbot.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const text = input.trim();
    setInput("");
    sendMessage(messages, text);
  };

  if (requestSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Demande envoyée !</h1>
          <p className="text-muted-foreground">
            Votre demande d'accès aux documents a été transmise à Modeste Loko. 
            Vous recevrez un email une fois votre accès approuvé.
          </p>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au portfolio
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold">Assistant de Modeste Loko</h1>
              <p className="text-xs text-muted-foreground">Demande d'accès aux documents</p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted rounded-bl-sm"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  msg.content
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-full bg-secondary/10 flex-shrink-0 flex items-center justify-center">
                  <User className="w-4 h-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-muted px-4 py-3 rounded-2xl rounded-bl-sm">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-border bg-background/80 backdrop-blur-sm sticky bottom-0">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 py-3 flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrivez votre message..."
            disabled={isLoading}
            className="rounded-full bg-muted border-none"
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
            className="rounded-full bg-primary text-primary-foreground flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DocumentRequest;
