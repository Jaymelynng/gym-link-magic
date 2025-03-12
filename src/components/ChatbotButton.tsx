
import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, X, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatbotButton = () => {
  const { gymId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new ones are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize conversation when opened
  useEffect(() => {
    if (isOpen && !conversationId) {
      initializeConversation();
    }
  }, [isOpen]);

  const initializeConversation = async () => {
    try {
      // Create a new conversation in the database
      const { data, error } = await supabase
        .from('chatbot_conversations')
        .insert({ gym_id: gymId || null })
        .select()
        .single();
        
      if (error) throw error;
      
      setConversationId(data.id);
      
      // Add welcome message
      const welcomeMessage: Message = {
        id: 'welcome',
        content: "Hi! I'm your gymnastics assistant. How can I help you today?",
        isBot: true,
        timestamp: new Date()
      };
      
      setMessages([welcomeMessage]);
      
      // Save the welcome message to the database
      await supabase
        .from('chatbot_messages')
        .insert({
          conversation_id: data.id,
          content: welcomeMessage.content,
          is_bot: true
        });
        
    } catch (error) {
      console.error("Error initializing conversation:", error);
      toast.error("Failed to start conversation", {
        description: "Please try again later.",
        position: "bottom-right",
      });
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !conversationId) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      isBot: false,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    try {
      // Save user message to the database
      await supabase
        .from('chatbot_messages')
        .insert({
          conversation_id: conversationId,
          content: userMessage.content,
          is_bot: false
        });
      
      // In a real implementation, we would call an AI service here
      // For now, we'll simulate a response after a delay
      setTimeout(async () => {
        // Generate a simple response based on the input
        let botResponse = "";
        const lowerInput = userMessage.content.toLowerCase();
        
        if (lowerInput.includes("class") || lowerInput.includes("schedule")) {
          botResponse = "We offer a variety of classes for all ages and skill levels. You can check our schedule and book a class on our website.";
        } else if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("fee")) {
          botResponse = "Our pricing varies depending on the program and frequency. We offer flexible membership options and discounts for multiple family members.";
        } else if (lowerInput.includes("location") || lowerInput.includes("address") || lowerInput.includes("where")) {
          botResponse = "You can find our gym locations on the homepage. Each gym has its own dedicated page with address and contact information.";
        } else if (lowerInput.includes("trial") || lowerInput.includes("try")) {
          botResponse = "We offer a free trial class for new students! You can book your trial through our website or by calling us directly.";
        } else if (lowerInput.includes("age") || lowerInput.includes("old")) {
          botResponse = "We have programs for all ages, from toddlers to adults. Our classes are organized by age group and skill level to ensure everyone gets the appropriate instruction.";
        } else if (lowerInput.includes("coach") || lowerInput.includes("instructor") || lowerInput.includes("staff")) {
          botResponse = "Our coaches are certified professionals with extensive experience in gymnastics. Many of them were competitive gymnasts themselves!";
        } else {
          botResponse = "Thanks for your question. Our team can provide more detailed information. Would you like me to help you find contact information for the gym?";
        }
        
        const botMessage: Message = {
          id: Date.now().toString(),
          content: botResponse,
          isBot: true,
          timestamp: new Date()
        };
        
        // Save bot response to the database
        await supabase
          .from('chatbot_messages')
          .insert({
            conversation_id: conversationId,
            content: botMessage.content,
            is_bot: true
          });
          
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error("Error sending message:", error);
      setIsLoading(false);
      toast.error("Failed to send message", {
        description: "Please try again later.",
        position: "bottom-right",
      });
    }
  };

  const resetConversation = () => {
    setMessages([]);
    setConversationId(null);
    initializeConversation();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            size="icon" 
            className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 transition-transform hover:scale-105"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="sr-only">Open chatbot</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 sm:w-96 p-0 max-h-[500px] flex flex-col" align="end">
          {/* Header */}
          <div className="p-3 border-b flex items-center justify-between bg-primary/10">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-primary">Gym Assistant</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={resetConversation}
                title="New conversation"
              >
                <Sparkles className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                onClick={() => setIsOpen(false)}
                title="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`flex gap-2 max-w-[85%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                  {message.isBot && (
                    <Avatar className="h-8 w-8 bg-primary/20">
                      <Bot className="h-4 w-4 text-primary" />
                    </Avatar>
                  )}
                  <div 
                    className={`rounded-lg py-2 px-3 ${
                      message.isBot 
                        ? 'bg-gray-100 text-gray-800' 
                        : 'bg-primary text-white'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%]">
                  <Avatar className="h-8 w-8 bg-primary/20">
                    <Bot className="h-4 w-4 text-primary" />
                  </Avatar>
                  <div className="bg-gray-100 rounded-lg py-2 px-3 flex items-center">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input */}
          <div className="p-3 border-t mt-auto">
            <form 
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="resize-none min-h-[40px] max-h-[120px]"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                type="submit" 
                size="icon" 
                disabled={isLoading || !input.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChatbotButton;
