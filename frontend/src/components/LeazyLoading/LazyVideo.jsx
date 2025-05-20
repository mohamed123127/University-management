import React from 'react';
import { useInView } from 'react-intersection-observer';

export default function LazyVideo({ src, className = '', poster }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div ref={ref} className={className}>
      {inView ? (
        <video controls className="w-full rounded-md" preload="none" poster={poster}>
          <source src={src} type="video/mp4" />
          المتصفح لا يدعم عرض الفيديو.
        </video>
      ) : (
        <div className="w-full h-64 bg-gray-200 rounded-md animate-pulse"></div>
      )}
    </div>
  );
}
