// components/AnimatedCard.js
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;