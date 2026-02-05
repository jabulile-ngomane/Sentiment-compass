
import React from 'react';
import { motion } from 'framer-motion';

interface DriftingBlobProps {
  color: string;
  size: string;
  top: string;
  left: string;
  delay: number;
}

const DriftingBlob: React.FC<DriftingBlobProps> = ({ color, size, top, left, delay }) => (
  <motion.div
    initial={{ x: 0, y: 0, scale: 1 }}
    animate={{
      x: [0, 80, -80, 40, 0],
      y: [0, -60, 60, -30, 0],
      scale: [1, 1.2, 0.85, 1.15, 1]
    }}
    transition={{
      duration: 30,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    className="absolute rounded-full blur-[140px] pointer-events-none opacity-30"
    style={{
      backgroundColor: color,
      width: size,
      height: size,
      top,
      left,
      zIndex: 0
    }}
  />
);

export default DriftingBlob;
