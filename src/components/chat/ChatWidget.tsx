"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, X, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatWidgetProps {
  title?: string;
  botName?: string;
  botAvatar?: string;
  userAvatar?: string;
  primaryColor?: string;
  secondaryColor?: string;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  welcomeMessage?: string;
  placeholder?: string;
}

const ChatWidget = ({
  title = "Chat Support",
  botName = "AI Assistant",
  botAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=assistant",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
  primaryColor = "#4f46e5",
  secondaryColor = "#ffffff",
  position = "bottom-right",
  welcomeMessage = "Hello! How can I help you today?",
  placeholder = "Type your message here...",
}: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: welcomeMessage,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Position styles based on the position prop
  const positionStyles = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    // Simulate bot typing
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content:
          "This is a simulated response from the AI assistant. In a real implementation, this would be replaced with an actual response from the AI model.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const messagesContainer = document.getElementById("messages-container");
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className={`fixed ${positionStyles[position]} z-50 bg-background`}>
      {/* Chat bubble when closed */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 flex items-center justify-center shadow-lg"
          style={{ backgroundColor: primaryColor }}
        >
          <MessageCircle size={24} color={secondaryColor} />
        </Button>
      )}

      {/* Chat widget when open */}
      {isOpen && (
        <Card className="w-80 sm:w-96 shadow-xl border bg-background">
          {/* Header */}
          <CardHeader
            className="flex flex-row items-center justify-between p-4"
            style={{ backgroundColor: primaryColor, color: secondaryColor }}
          >
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={botAvatar} alt={botName} />
                <AvatarFallback>{botName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{title}</h3>
                <p className="text-xs opacity-80">
                  {isTyping ? "Typing..." : "Online"}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 rounded-full"
              >
                {isMinimized ? (
                  <Maximize2 size={16} />
                ) : (
                  <Minimize2 size={16} />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full"
              >
                <X size={16} />
              </Button>
            </div>
          </CardHeader>

          {/* Messages area */}
          {!isMinimized && (
            <>
              <CardContent
                className="p-4 h-80 overflow-y-auto"
                id="messages-container"
              >
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"} items-start gap-2 max-w-[80%]`}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={msg.sender === "user" ? userAvatar : botAvatar}
                            alt={msg.sender === "user" ? "You" : botName}
                          />
                          <AvatarFallback>
                            {msg.sender === "user" ? "U" : botName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`rounded-lg p-3 ${msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <span className="text-xs opacity-70 block mt-1">
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex flex-row items-start gap-2 max-w-[80%]">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={botAvatar} alt={botName} />
                          <AvatarFallback>{botName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg p-3 bg-muted">
                          <div className="flex space-x-1">
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>

              {/* Input area */}
              <CardFooter className="p-4 border-t">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    type="text"
                    placeholder={placeholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    style={{
                      backgroundColor: primaryColor,
                      color: secondaryColor,
                    }}
                  >
                    <Send size={18} />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </div>
  );
};

export default ChatWidget;
