import React from 'react';
import { ExternalLink, UserCheck } from 'lucide-react';

import { useTranslation } from "react-i18next";


interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
  showActions?: boolean;
  sources?: string[];
}


const ChatBubble: React.FC<ChatBubbleProps> = ({ 

  message, 
  isUser, 
  timestamp, 
  showActions = true,
  sources 
}) => {
  const { t } = useTranslation();

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
      <div className={`max-w-3xl ${isUser ? 'ml-12' : 'mr-12'}`}>
        <div
          className={`px-6 py-2 rounded-chat ${
            isUser 
              ? 'bg-primary-pink text-neutral-dark' 
              : 'bg-accent-purple text-white'
          } shadow-lg`}
        >
          <p className="text-base leading-relaxed whitespace-pre-wrap">{message}</p>
          {timestamp && (
            <p className={`text-xs mt-2 ${isUser ? 'text-neutral-medium' : 'text-white/70'}`}>
              {timestamp}
            </p>
          )}
        </div>
        
        {sources && sources.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {sources.map((source, index) => (
              <button
                key={index}
                className="flex items-center space-x-1 space-x-reverse bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>مصدر {index + 1}</span>
              </button>
            ))}
          </div>
        )}
        
        {showActions && !isUser && (
          <div className="mt-4 flex space-x-3 space-x-reverse">
            <button className="flex items-center mx-2 space-x-2 space-x-reverse bg-white dark:bg-neutral-dark text-accent-purple px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-neutral-medium transition-colors shadow-md">
              <ExternalLink className="w-4 h-4" />
              <span>{t("chat.check_resource")}</span>
            </button>
            <button className="flex items-center mx-2 space-x-2 space-x-reverse bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-md">
              <UserCheck className="w-4 h-4" />
              <span>{t("chat.contact_lawyer")}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;