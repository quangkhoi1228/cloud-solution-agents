'use client';

import type React from 'react';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ContentRevealPreviewProps {
  children: React.ReactNode;
  duration?: number; // Thời gian reveal (seconds)
  className?: string;
  overlayColor?: string;
  onRevealComplete?: () => void;
  autoStart?: boolean; // Tự động bắt đầu reveal khi mount
}

export default function ContentRevealPreview({
  children,
  duration = 3,
  className = '',
  overlayColor = 'bg-white dark:bg-gray-900',
  onRevealComplete,
  autoStart = false,
}: ContentRevealPreviewProps) {
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [key, setKey] = useState(0);

  const startReveal = () => {
    setIsRevealing(true);
    setRevealProgress(0);
    setIsComplete(false);
    setKey((prev) => prev + 1);

    // Reset scroll to top when starting
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };

  // Auto start if enabled
  useEffect(() => {
    if (autoStart && !isComplete) {
      const timer = setTimeout(() => {
        startReveal();
      }, 500); // Small delay for smooth mount
      return () => clearTimeout(timer);
    }
  }, [autoStart, isComplete]);

  useEffect(() => {
    if (!isRevealing) return;

    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      setRevealProgress(progress);

      // Logic scroll: chỉ scroll khi reveal line chạm mép dưới viewport
      if (containerRef.current && contentRef.current) {
        const container = containerRef.current;
        const content = contentRef.current;
        const containerHeight = container.clientHeight;
        const contentHeight = content.scrollHeight;

        // Tính vị trí reveal line trong content (pixel)
        const revealLinePosition = contentHeight * progress;

        // Chỉ scroll khi reveal line vượt quá chiều cao container
        if (revealLinePosition > containerHeight) {
          // Scroll để giữ reveal line ở mép dưới viewport
          const targetScroll = revealLinePosition - containerHeight;
          const maxScroll = Math.max(0, contentHeight - containerHeight);

          container.scrollTop = Math.min(targetScroll, maxScroll);
        }
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsRevealing(false);
        setIsComplete(true);
        onRevealComplete?.();
      }
    };

    requestAnimationFrame(animate);
  }, [isRevealing, duration, onRevealComplete]);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        ref={containerRef}
        className='h-full overflow-y-auto'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{ scrollBehavior: 'auto' }}
      >
        <div ref={contentRef} className='relative'>
          {/* Actual content - always rendered */}
          <div className='relative z-10'>{children}</div>

          {/* Overlay that slides down to reveal content */}
          <AnimatePresence>
            {(isRevealing || revealProgress === 0) && !isComplete && (
              <motion.div
                key={key}
                className={`absolute inset-0 z-20 ${overlayColor}`}
                style={{
                  clipPath: `inset(${revealProgress * 100}% 0 0 0)`,
                }}
                initial={{ clipPath: 'inset(0% 0 0 0)' }}
                animate={{
                  clipPath: `inset(${revealProgress * 100}% 0 0 0)`,
                }}
                transition={{
                  duration: 0.1,
                  ease: 'linear',
                }}
              />
            )}
          </AnimatePresence>

          {/* Reveal line effect */}
          {isRevealing && (
            <motion.div
              className='absolute left-0 right-0 z-30 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-lg'
              style={{
                top: `${revealProgress * 100}%`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </div>
      </motion.div>

      {/* Manual control button (optional) */}
      {!autoStart && (
        <button
          onClick={startReveal}
          disabled={isRevealing}
          className='absolute top-2 right-2 z-40 px-3 py-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white text-xs rounded transition-colors'
        >
          {isRevealing ? 'Revealing...' : '▶ Reveal'}
        </button>
      )}

      {/* Status indicator */}
      <AnimatePresence>
        {isRevealing && (
          <motion.div
            className='absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1 z-40'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className='w-1.5 h-1.5 bg-white rounded-full animate-pulse' />
            {Math.round(revealProgress * 100)}%
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
