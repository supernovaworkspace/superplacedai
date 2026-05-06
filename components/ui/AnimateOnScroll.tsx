'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

import { animations, type AnimationVariantKey } from '@/lib/animations';

type AnimateOnScrollProps = {
  children: ReactNode;
  variant: AnimationVariantKey;
  delay?: number;
  className?: string;
};

export default function AnimateOnScroll({
  children,
  variant,
  delay,
  className,
}: AnimateOnScrollProps) {
  const selectedVariant = animations[variant];
  const visibleState =
    selectedVariant && 'visible' in selectedVariant ? selectedVariant.visible : undefined;

  const variantsWithDelay =
    typeof delay === 'number' && visibleState
      ? {
          ...selectedVariant,
          visible: {
            ...(visibleState as any),
            transition: {
              ...((visibleState as any).transition ?? {}),
              delay,
            },
          },
        }
      : selectedVariant;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variantsWithDelay}
    >
      {children}
    </motion.div>
  );
}
