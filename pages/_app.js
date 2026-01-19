import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        /* Prevent horizontal scroll on entire page */
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }

        body {
          margin: 0;
          padding: 0;
        }

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
          color: #0071e3 !important;
          transform: translateX(2px);
        }

        /* Ensure nav has visible overflow */
        nav {
          overflow: visible !important;
        }

        /* Navigation slider for mobile - hide scrollbar */
        nav::-webkit-scrollbar {
          width: 0;
          height: 0;
          display: none;
        }

        /* Add button active state - micro press animation */
        button[style*="addButton"]:active:not([disabled]) {
          transform: scale(0.95) !important;
          transition: transform 0.1s ease !important;
        }

        /* Submit button hover */
        button[style*="submitButton"]:not([disabled]):hover {
          background-color: #0077ed !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 113, 227, 0.3) !important;
        }

        /* Back button hover */
        button[style*="backButton"]:hover {
          background-color: #f5f5f7 !important;
          border-color: #1d1d1f !important;
        }

        /* Quantity stepper buttons hover */
        button[style*="qtyButton"]:hover {
          background-color: #1d1d1f !important;
          color: white !important;
          border-color: #1d1d1f !important;
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12) !important;
        }

        button[style*="qtyButton"]:active {
          transform: scale(0.95) !important;
        }

        /* Smooth transitions */
        * {
          -webkit-tap-highlight-color: transparent;
        }

        /* Mobile responsive fixes */
        @media (max-width: 768px) {
          nav {
            padding-left: 4vw !important;
            padding-right: 15vw !important;
          }

          main {
            grid-template-columns: 1fr !important;
            padding: 20px 4vw !important;
          }

          header {
            padding: 12px 4vw !important;
          }
        }

        @media (max-width: 480px) {
          nav {
            gap: 8px !important;
          }

          button[style*="tab"] {
            font-size: 13px !important;
            padding: 8px 16px !important;
          }
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
