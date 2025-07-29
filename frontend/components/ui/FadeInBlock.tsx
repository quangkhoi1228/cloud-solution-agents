'use client';

import { motion } from 'framer-motion';

export function FadeInBlock({
  children,
  index,
  delayPerItem = 0.1,
}: {
  children: React.ReactNode;
  index: number;
  delayPerItem?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * delayPerItem, duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
