import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function Card3D({ children, className = '' }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const springConfig = { damping: 20, stiffness: 300 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        perspective: 2000,
        transformStyle: "preserve-3d"
      }}
      className={className}
    >
      <motion.div
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY
        }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="w-full h-full cursor-pointer"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}