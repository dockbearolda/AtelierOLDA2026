import React from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <style jsx global>{`
        /* Reset and base styles */
        * {
          -webkit-tap-highlight-color: transparent;
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Hide scrollbar for horizontal navigation */
        .badgeNav::-webkit-scrollbar,
        nav::-webkit-scrollbar {
          display: none;
        }

        /* Animations */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes progressSlide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }

        /* Smooth hover effects */
        button {
          transition: all 0.2s ease;
        }

        button:active {
          transform: scale(0.98);
        }

        /* Mobile optimizations */
        @media (max-width: 768px) {
          body {
            font-size: 16px !important;
          }

          input, textarea, select {
            font-size: 16px !important;
          }
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
