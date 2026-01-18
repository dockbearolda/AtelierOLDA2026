import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        nav::-webkit-scrollbar {
          display: none;
        }

        /* Animations for swipe indicators */
        @keyframes slideLeft {
          0%, 100% {
            transform: translateX(0);
            opacity: 1;
          }
          50% {
            transform: translateX(-5px);
            opacity: 0.5;
          }
        }

        @keyframes slideRight {
          0%, 100% {
            transform: translateX(0);
            opacity: 1;
          }
          50% {
            transform: translateX(5px);
            opacity: 0.5;
          }
        }

        /* Hover effects for category cards */
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }

        /* Smooth transitions */
        * {
          -webkit-tap-highlight-color: transparent;
        }

        /* Responsive layout for products */
        @media (max-width: 767px) {
          /* Mobile: 1 column */
          main {
            padding: 20px 16px !important;
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }

          /* Reduce header padding on mobile */
          header {
            padding: 12px 16px !important;
          }

          /* Reduce navigation padding on mobile */
          nav {
            padding: 12px 16px !important;
          }

          /* Homepage adjustments */
          h1 {
            font-size: 36px !important;
          }

          .homepage-content {
            padding: 20px 16px !important;
          }

          /* Category grid on mobile */
          .homepage-content > div:last-child {
            grid-template-columns: 1fr !important;
          }

          /* Card image height on mobile */
          .card img {
            height: 180px !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          /* Tablet: 2 columns */
          main {
            padding: 30px !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }

        @media (min-width: 1025px) {
          /* Desktop: 2 columns centered */
          main {
            padding: 40px !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 24px !important;
            max-width: 900px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
