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
        ul[style*="dropdownMenu"] li button:hover,
        ul[style*="dropdownMenuList"] li button:hover {
          background-color: #fafafa !important;
          color: #0071e3 !important;
          transform: translateX(2px);
        }

        /* Ensure nav dropdown has visible overflow for dropdown menu */
        nav {
          overflow-y: visible !important;
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

        /* Prevent any overflow */
        *, *::before, *::after {
          box-sizing: border-box;
        }

        /* Smooth transitions */
        * {
          -webkit-tap-highlight-color: transparent;
        }

        /* CRITICAL: Force grid layout - 2 columns */
        main {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 10px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          padding: 16px 10px !important;
          max-width: 900px !important;
          margin: 0 auto !important;
        }

        /* CRITICAL: Force cards to fit */
        main > div {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          box-sizing: border-box !important;
        }

        /* CRITICAL: Navigation slider */
        nav {
          display: flex !important;
          flex-wrap: nowrap !important;
          overflow-x: auto !important;
          overflow-y: visible !important;
          -webkit-overflow-scrolling: touch !important;
          padding: 16px 10px !important;
          padding-right: 50px !important;
        }

        nav > div,
        nav > button {
          flex: 0 0 auto !important;
        }

        /* Mobile responsive fixes */
        @media (max-width: 768px) {
          nav {
            padding-left: 4vw !important;
            padding-right: 15vw !important;
          }

          main {
            grid-template-columns: repeat(2, 1fr) !important;
            padding: 16px 3vw !important;
            gap: 10px !important;
          }

          div[style*="card"] {
            padding: 16px !important;
            border-radius: 14px !important;
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

          main {
            gap: 8px !important;
            padding: 12px 2.5vw !important;
          }

          div[style*="card"] {
            padding: 12px !important;
          }

          div[style*="imageContainer"] {
            height: 160px !important;
            margin-bottom: 12px !important;
          }
        }

        /* Ultra small screens - 1 column only */
        @media (max-width: 380px) {
          main {
            grid-template-columns: 1fr !important;
          }
        }

        /* Desktop - ensure dropdown menu portal is visible */
        @media (min-width: 769px) {
          div[style*="dropdownContainer"] {
            position: relative;
            z-index: 10000;
          }

          div[style*="dropdownMenuPortal"] {
            position: fixed !important;
            z-index: 999998 !important;
          }

          ul[style*="dropdownMenuList"] {
            z-index: 999999 !important;
          }
        }

        /* Mobile - hide dropdown on very small screens */
        @media (max-width: 768px) {
          div[style*="dropdownMenuPortal"] {
            display: block !important;
          }
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
