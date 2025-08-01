'use client';

import type React from 'react';

import { MessageSquare, User, Search, Send, Loader2, Bot, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRef, useEffect } from 'react';
import { useAppStore } from '@/stores/app-store';
import { TypeAnimation } from 'react-type-animation';
import Image from 'next/image';

export function ChatSidebar() {
  const { messages, currentMessage, setCurrentMessage, sendMessage } =
    useAppStore();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    const container = containerRef.current;

    if (!textarea || !container) return;

    // Reset height to calculate scrollHeight
    textarea.style.height = 'auto';

    // Get container height to calculate 30% max
    const containerHeight = container.clientHeight;
    const maxHeight = Math.floor(containerHeight * 0.3);

    // Calculate new height
    const scrollHeight = textarea.scrollHeight;
    const newHeight = Math.min(scrollHeight, maxHeight);

    textarea.style.height = `${newHeight}px`;

    // Enable/disable scrolling based on content
    if (scrollHeight > maxHeight) {
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.overflowY = 'hidden';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [currentMessage]);

  useEffect(() => {
    console.log('messages', messages);
    scrollAreaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMessage(e.target.value);
  };

  return (
    <div
      ref={containerRef}
      className='w-80 min-w-80 bg-gray-800 border-r border-gray-700 flex flex-col h-full'
    >
      {/* <div className="p-4 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center gap-2 mb-4">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-orange-500 text-white text-sm">T</AvatarFallback>
          </Avatar>
          <div>
            <div className="text-sm font-medium">Trending Karaoke</div>
            <div className="text-xs text-gray-400">Tạo giúp tôi game 2048</div>
          </div>
        </div>
      </div> */}

      <ScrollArea className='flex-1 min-h-0'>
        <div className='p-4 space-y-4 pb-52' ref={scrollAreaRef}>
          {messages.length === 0 ? (
            <div className='flex flex-col items-center justify-center h-full min-h-[400px] text-center'>
              <div className='mb-6'>
                <div className='w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto'>
                  <Bot className='w-8 h-8 text-white' />
                </div>
                <h3 className='text-lg font-semibold text-white mb-2'>
                  Chào mừng đến với <br /> Cloud Solution Agent
                </h3>
                <p className='text-gray-400 text-sm max-w-xs'>
                  Tôi có thể giúp bạn tạo và quản lý các giải pháp cloud một cách hiệu quả
                </p>
              </div>
              
              <div className='space-y-3 w-full max-w-sm'>
                <div className='text-xs text-gray-500 mb-4'>Bạn có thể hỏi tôi về:</div>
                
                <div className='flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600/50 hover:bg-gray-700/70 transition-colors cursor-pointer'>
                  <div className='w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center'>
                    <Sparkles className='w-4 h-4 text-blue-400' />
                  </div>
                  <div className='text-left'>
                    <div className='text-sm font-medium text-white'>Tạo giải pháp cloud</div>
                    <div className='text-xs text-gray-400'>Kiến trúc và triển khai</div>
                  </div>
                </div>
                
                <div className='flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600/50 hover:bg-gray-700/70 transition-colors cursor-pointer'>
                  <div className='w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center'>
                    <MessageSquare className='w-4 h-4 text-green-400' />
                  </div>
                  <div className='text-left'>
                    <div className='text-sm font-medium text-white'>Tư vấn kỹ thuật</div>
                    <div className='text-xs text-gray-400'>Hỏi đáp về cloud</div>
                  </div>
                </div>
                
                <div className='flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg border border-gray-600/50 hover:bg-gray-700/70 transition-colors cursor-pointer'>
                  <div className='w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center'>
                    <User className='w-4 h-4 text-purple-400' />
                  </div>
                  <div className='text-left'>
                    <div className='text-sm font-medium text-white'>Quản lý dự án</div>
                    <div className='text-xs text-gray-400'>Lập kế hoạch và theo dõi</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${
                  msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <Avatar className='w-8 h-8'>
                  <AvatarFallback
                    className={`${'bg-slate-300'} text-white text-xs font-medium`}
                  >
                    {msg.type !== 'user' ? (
                      <Image
                        src={msg.avatar}
                        alt={msg.name}
                        width={42}
                        height={42}
                      />
                    ) : (
                      <span className='text-blue-500 font-bold '>U</span>
                    )}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`flex-1 ${
                    msg.type === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div className='text-xs text-gray-400 mb-1 '>
                    {msg.name} • {msg.timestamp}
                  </div>
                  <div
                    className={`
                    rounded-lg p-3 text-sm max-w-[85%] inline-block
                    ${
                      msg.type === 'user'
                        ? 'bg-blue-600 text-white ml-auto'
                        : 'bg-gray-700 text-gray-300'
                    }
                  `}
                  >
                    {msg.role && msg.type === 'system' && (
                      <div className='flex items-center gap-2 mb-2'>
                        <MessageSquare className='w-4 h-4 text-blue-400' />
                        <span className='text-blue-400 font-medium'>
                          {msg.role}
                        </span>
                      </div>
                    )}
                    <div className='leading-relaxed text-left'>
                      {msg.type === 'system' ? (
                        <TypeAnimation
                          sequence={[
                            msg.content,
                            msg.content.length * 80,
                          ]}
                          cursor={false}
                          speed={50}
                          repeat={0}
                        />
                      ) : (
                        <p>{msg.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      {/* Chat Input with Auto-resize */}
      <div className='p-4 border-t border-gray-700 flex-shrink-0'>
        <div className='flex gap-2 items-end'>
          <div className='flex-1 relative'>
            <textarea
              ref={textareaRef}
              value={currentMessage}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              placeholder='Nhập yêu cầu của bạn'
              className='w-full min-h-[20px] max-h-none resize-none bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none rounded-md px-3 py-2 text-sm leading-5'
              style={{
                height: '50vh',
                overflowY: 'hidden',
              }}
            />
          </div>
          <Button
            onClick={sendMessage}
            disabled={!currentMessage.trim()}
            size='sm'
            className='bg-blue-600 hover:bg-blue-700 disabled:opacity-50 h-9 px-2 mb-[7px]'
          >
            <Send className='w-4 h-4' />
          </Button>
        </div>
        {/* <div className="text-xs text-gray-400 mt-2">@ to chat, # to select • Shift+Enter for new line</div>
        <div className="flex items-center gap-2 mt-2">
          <Button variant="ghost" size="sm" className="text-xs">
            <User className="w-3 h-3 mr-1" />
            Engineer
          </Button>
          <span className="text-xs text-gray-400">Claude Sonnet 3.7</span>
          <Button variant="ghost" size="sm" className="ml-auto">
            <Search className="w-4 h-4" />
          </Button>
        </div> */}
      </div>
    </div>
  );
}
