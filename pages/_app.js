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

        /* Hover effects for navigation tabs */
        nav button:hover {
          transform: scale(1.03);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }

        /* Active tab hover - slight enhancement */
        nav button:active {
          transform: scale(0.98);
        }

        /* Dropdown animation */
        @keyframes dropdownFadeIn {
          0% {
            opacity: 0;
            transform: translateY(-8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Modal animations */
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Dropdown item hover - Upscale design */
        ul[style*="dropdownMenu"] li button:hover {
          background-color: #fafafa !important;
          color: #7B9C9C !important;
          transform: translateX(2px);
        }

        /* Ensure nav has visible overflow */
        nav {
          overflow: visible !important;
        }

        /* Add button active state - micro press animation */
        button[style*="addButton"]:active:not([disabled]) {
          transform: scale(0.95) !important;
          transition: transform 0.1s ease !important;
        }

        /* Smooth transitions */
        * {
          -webkit-tap-highlight-color: transparent;
        }

        /* RESPONSIVE MOBILE FIRST - Media Queries */

        /* iPhone & Mobile (max-width: 768px) */
        @media (max-width: 768px) {
          /* Header responsive */
          header {
            padding: 12px 20px !important;
          }

          /* Navigation responsive */
          nav {
            padding: 12px 20px !important;
          }

          /* Main grid - 1 colonne sur mobile */
          main {
            grid-template-columns: 1fr !important;
            padding: 24px 16px !important;
            gap: 20px !important;
          }

          /* Homepage responsive */
          .homepageContent {
            padding: 20px !important;
          }

          .homepageTitle {
            font-size: 36px !important;
          }

          .homepageSubtitle {
            font-size: 18px !important;
          }

          /* Modal responsive */
          div[style*="maxWidth: 500px"] {
            padding: 24px 20px !important;
            max-width: 100% !important;
          }

          /* Footer responsive */
          footer {
            padding: 24px 20px !important;
          }
        }

        /* Très petits écrans - iPhone SE, etc. (max-width: 375px) */
        @media (max-width: 375px) {
          header {
            padding: 10px 16px !important;
          }

          nav {
            padding: 10px 16px !important;
          }

          main {
            padding: 20px 12px !important;
            gap: 16px !important;
          }

          .homepageTitle {
            font-size: 28px !important;
          }

          .homepageSubtitle {
            font-size: 16px !important;
          }
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
