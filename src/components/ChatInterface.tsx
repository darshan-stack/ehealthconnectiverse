
import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Paperclip, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'doctor';
  timestamp: Date;
}

export interface ChatInterfaceProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  placeholder?: string;
  buttonText?: string;
  // Add the missing recipient properties
  recipientId?: string;
  recipientName?: string;
  recipientAvatar?: string;
  recipientRole?: string;
}

interface MessageProps {
  message: Message;
  isUser: boolean;
  recipientAvatar?: string;
}

const Message: React.FC<MessageProps> = ({ message, isUser, recipientAvatar }) => {
  return (
    <div className={`flex items-start gap-2 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <Avatar className="w-8 h-8">
          <AvatarImage src={recipientAvatar || "https://github.com/shadcn.png"} alt="Avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
      <div className="flex flex-col gap-1.5 rounded-md px-3 py-2 w-fit max-w-[400px]" style={{ backgroundColor: isUser ? '#DCF8C6' : '#FFFFFF' }}>
        <p className="text-sm">{message.content}</p>
        <span className="text-xs text-gray-500 self-end">{new Date(message.timestamp).toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages = [],
  onSendMessage,
  placeholder = "Type your message...",
  buttonText = "Send",
  recipientAvatar
}) => {
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (newMessage.trim() && onSendMessage) {
      onSendMessage(newMessage);
      setNewMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              isUser={message.sender === 'user'}
              recipientAvatar={recipientAvatar}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <Card className="border-t rounded-t-none">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <Textarea
              placeholder={placeholder}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="min-h-[80px] flex-1"
              onKeyDown={handleKeyDown}
              ref={textareaRef}
            />
            <div className="flex flex-col gap-2">
              <Button 
                type="button" 
                size="icon" 
                variant="outline"
                className="rounded-full"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button 
                type="submit" 
                size="icon" 
                variant="default"
                className="rounded-full"
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
