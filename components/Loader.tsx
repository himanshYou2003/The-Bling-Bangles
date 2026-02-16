'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Dynamically load the Tenor embed script
    const script = document.createElement('script');
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Hide loader after 1.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => {
      document.body.removeChild(script);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-bg"
        >
          <div className="w-64 h-64 md:w-96 md:h-96 relative">
            <div 
              className="tenor-gif-embed" 
              data-postid="14463166" 
              data-share-method="host" 
              data-aspect-ratio="1" 
              data-width="100%"
            ></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
