
import { useState } from "react";
import { MessageCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { toast } from "sonner";

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAskQuestion = () => {
    toast.info("AI Chatbot coming soon!", {
      description: "We're working on implementing this feature.",
      position: "bottom-right",
    });
    setIsOpen(false);
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
        <PopoverContent className="w-80 p-4" align="end">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Clock className="h-5 w-5" />
              <h3 className="font-semibold">AI Assistance Coming Soon</h3>
            </div>
            <p className="text-sm text-gray-600">
              Our AI-powered chatbot will help you find the perfect gymnastics program 
              for your needs. We're currently building this feature.
            </p>
            <div className="flex justify-end pt-2">
              <Button onClick={handleAskQuestion}>
                Stay Tuned
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChatbotButton;
