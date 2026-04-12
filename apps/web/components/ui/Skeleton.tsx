import React from 'react';

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div 
      className={`bg-muted rounded-2xl animate-pulse ${className}`}
    />
  );
}
