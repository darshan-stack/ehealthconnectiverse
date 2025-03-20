
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { PaperClip, Send, Paperclip } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface ChatInterfaceProps {
  recipientId: string;
  recipientName: string;
  recipientAvatar?: string;
  recipientRole: 'doctor' | 'patient';
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  recipientId,
  recipientName,
  recipientAvatar,
  recipientRole,
}) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial messages for demo
  useEffect(() => {
    // Simulate loading initial messages
    setIsLoading(true);
    setTimeout(() => {
      const demoMessages: Message[] = [
        {
          id: '1',
          sender: recipientId,
          senderName: recipientName,
          senderAvatar: recipientAvatar,
          content: `Hello${user?.name ? ' ' + user.name : ''}, how can I help you today?`,
          timestamp: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
          isRead: true,
        },
      ];
      
      setMessages(demoMessages);
      setIsLoading(false);
    }, 1000);
  }, [recipientId, recipientName, recipientAvatar, user?.name]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !user) return;
    
    // Add user message
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      sender: user.id,
      senderName: user.name,
      senderAvatar: user.profilePicture,
      content: newMessage,
      timestamp: new Date(),
      isRead: false,
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate reply after a short delay
    setTimeout(() => {
      const replyContent = getAutoReply(newMessage, recipientRole);
      
      const replyMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        sender: recipientId,
        senderName: recipientName,
        senderAvatar: recipientAvatar,
        content: replyContent,
        timestamp: new Date(),
        isRead: true,
      };
      
      setMessages(prev => [...prev, replyMessage]);
    }, 1500);
  };

  // Simple auto-reply generator based on message content and recipient role
  const getAutoReply = (message: string, role: 'doctor' | 'patient'): string => {
    const lowerMessage = message.toLowerCase();
    
    if (role === 'doctor') {
      if (lowerMessage.includes('appointment')) {
        return "I have availability next Tuesday at 2 PM or Wednesday at 10 AM. Would either of those work for you?";
      } else if (lowerMessage.includes('pain') || lowerMessage.includes('hurt')) {
        return "I'm sorry to hear you're in pain. Can you describe the location and intensity of the pain on a scale of 1-10?";
      } else if (lowerMessage.includes('prescription') || lowerMessage.includes('medicine')) {
        return "I'll review your prescription needs. Please let me know which medications you're currently taking and if you're experiencing any side effects.";
      } else if (lowerMessage.includes('thank')) {
        return "You're welcome! Don't hesitate to reach out if you have any other questions or concerns.";
      } else {
        return "Thank you for your message. I'll review your medical history and get back to you with personalized advice. Is there anything specific you'd like me to address?";
      }
    } else {
      // Patient responses
      if (lowerMessage.includes('doctor')) {
        return "Yes, I'm seeing Dr. Shah next week for my follow-up appointment. I'll update you after my visit.";
      } else if (lowerMessage.includes('medication') || lowerMessage.includes('medicine')) {
        return "I've been taking the prescribed medication regularly. The symptoms have improved but I still have occasional discomfort.";
      } else if (lowerMessage.includes('thank')) {
        return "Thank you for your care and attention, doctor. I really appreciate it.";
      } else {
        return "I've been following your recommendations. My symptoms have improved since our last consultation, but I still have a few questions about my treatment plan.";
      }
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm border border-border/50 overflow-hidden">
      {/* Chat header */}
      <div className="p-4 border-b border-border/50 flex items-center justify-between bg-secondary/30">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={recipientAvatar} />
            <AvatarFallback className="bg-primary text-white">
              {recipientName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{recipientName}</h3>
            <p className="text-xs text-muted-foreground">
              {recipientRole === 'doctor' ? 'Doctor' : 'Patient'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-pulse text-muted-foreground">Loading conversation...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-muted-foreground">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === user?.id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] ${
                  message.sender === user?.id
                    ? 'bg-primary text-white rounded-t-lg rounded-bl-lg'
                    : 'bg-secondary rounded-t-lg rounded-br-lg'
                } p-3 shadow-sm`}
              >
                <p className="text-sm">{message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === user?.id ? 'text-white/70' : 'text-muted-foreground'
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="p-4 border-t border-border/50 bg-white">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            aria-label="Attach file"
          >
            <Paperclip size={20} />
          </Button>
          
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-secondary border-0"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          
          <Button
            variant="primary"
            size="icon"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-primary text-white"
            aria-label="Send message"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
