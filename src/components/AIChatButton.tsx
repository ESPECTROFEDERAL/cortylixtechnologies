import { Bot } from 'lucide-react';

const AIChatButton = () => (
  <button
    className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-secondary hover:bg-secondary/90 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group"
    aria-label="AI Customer Care"
    onClick={() => {}}
  >
    <Bot className="w-7 h-7 text-secondary-foreground group-hover:scale-110 transition-transform" />
  </button>
);

export default AIChatButton;
