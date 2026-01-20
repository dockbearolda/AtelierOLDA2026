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
          color: #0071e3 !important;
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

        /* SOLUTION DROPDOWN : Pont invisible entre bouton et menu */
        .dropdown-button-bridge {
          position: relative;
        }

        .dropdown-button-bridge::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 100%;
          height: 12px;
          background: transparent;
          pointer-events: auto;
          z-index: 99998;
        }

        /* FIX GRILLE PRODUITS IPHONE : 2 colonnes sans coupure */
        @media screen and (max-width: 768px) {
          main[style*="grid"] {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
            width: 100% !important;
            box-sizing: border-box !important;
            padding: 20px !important;
          }
        }

        /* Media query spécifique iPhone */
        @media screen and (max-width: 430px) {
          main[style*="grid"] {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 10px !important;
            padding: 16px !important;
          }
        }

        /* STEPPER HAUT DE GAMME : États actif et complété */
        [style*="stepActive"] [style*="stepNumber"] {
          background-color: #1d1d1f !important;
          color: white !important;
          border-color: #1d1d1f !important;
        }

        [style*="stepCompleted"] [style*="stepNumber"] {
          background-color: #f5f5f7 !important;
          border-color: #86868b !important;
          color: #86868b !important;
        }

        /* Hover sur bouton Précédent */
        [style*="backButton"]:hover {
          background-color: #f5f5f7 !important;
          transform: translateY(0) !important;
        }

        /* Responsive stepper pour mobile */
        @media screen and (max-width: 500px) {
          [style*="stepLabel"] {
            font-size: 9px !important;
          }

          [style*="stepNumber"] {
            width: 28px !important;
            height: 28px !important;
            font-size: 12px !important;
          }

          [style*="stepLine"] {
            margin: 0 8px !important;
          }

          [style*="stepperContainer"] {
            padding-right: 20px !important;
          }
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
