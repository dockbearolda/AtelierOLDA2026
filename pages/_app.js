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

        /* STABILITÉ PARFAITE : Zéro scroll horizontal */
        html, body {
          overflow-x: hidden !important;
          width: 100% !important;
          position: relative !important;
        }

        /* Menu slider : Seul élément avec scroll horizontal */
        nav[style*="flex"] {
          overflow-x: auto !important;
          overflow-y: hidden !important;
          -webkit-overflow-scrolling: touch !important;
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
          scroll-behavior: smooth !important;
          overscroll-behavior-x: contain !important;
        }

        nav[style*="flex"]::-webkit-scrollbar {
          display: none !important;
        }

        /* MENU STICKY : Support Safe Area iPhone */
        [style*="header"] {
          padding-top: calc(16px + env(safe-area-inset-top)) !important;
          margin-top: calc(-1 * env(safe-area-inset-top)) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          backdrop-filter: blur(10px) !important;
        }

        [style*="navContainer"] {
          top: calc(73px + env(safe-area-inset-top)) !important;
          -webkit-backdrop-filter: blur(10px) !important;
          backdrop-filter: blur(10px) !important;
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

        /* GRILLE ULTRA FLAT : Technique du trait 1px */
        main[style*="grid"] {
          gap: 1px !important;
          background-color: #d2d2d7 !important;
          border: none !important;
          overflow-x: hidden !important;
        }

        /* GRILLE RESPONSIVE : 5 colonnes PC, 4 colonnes tablette, 2 colonnes iPhone */
        @media screen and (min-width: 1200px) {
          main[style*="grid"] {
            grid-template-columns: repeat(5, 1fr) !important;
            padding: 40px 20px !important;
          }
        }

        @media screen and (min-width: 769px) and (max-width: 1199px) {
          main[style*="grid"] {
            grid-template-columns: repeat(4, 1fr) !important;
            padding: 32px 16px !important;
          }
        }

        @media screen and (max-width: 768px) {
          main[style*="grid"] {
            grid-template-columns: repeat(2, 1fr) !important;
            padding: 24px 12px !important;
          }
        }

        @media screen and (max-width: 480px) {
          main[style*="grid"] {
            grid-template-columns: repeat(2, 1fr) !important;
            padding: 16px 8px !important;
            max-width: 100vw !important;
            box-sizing: border-box !important;
          }
        }

        /* FIX CENTRAGE iPhone : Alignement parfait */
        @media screen and (max-width: 768px) {
          main[style*="grid"] {
            margin-left: auto !important;
            margin-right: auto !important;
            width: calc(100% - env(safe-area-inset-left) - env(safe-area-inset-right)) !important;
          }
        }

        /* FIX RETINA/IPHONE : Traits ultra-fins et nets */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          main[style*="grid"] {
            gap: 1px !important;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        }

        /* Cartes produits : Zero shadow, zero border */
        [style*="card"] {
          box-shadow: none !important;
          border-radius: 0 !important;
          border: none !important;
        }

        /* Select dropdown : Focus ultra-flat */
        select[style*="quantitySelect"]:focus {
          outline: none;
          border-color: #1d1d1f;
        }

        /* Media query mobile : Hauteur de touche optimisée */
        @media screen and (max-width: 768px) {
          select[style*="quantitySelect"] {
            min-height: 48px !important;
            font-size: 16px !important;
          }

          /* Optimisation mobile pour textarea et boutons */
          textarea[style*="commentaire"],
          button[style*="addButton"] {
            min-height: 48px !important;
            font-size: 14px !important;
          }

          /* Cartes produits : Padding mobile */
          [style*="card"] {
            padding: 20px !important;
          }
        }

        /* Hover ultra-flat sur bouton Ajouter */
        button[style*="addButton"]:hover:not([style*="addButtonAdded"]) {
          background-color: #000000 !important;
        }

        /* Focus ultra-flat sur textarea */
        textarea[style*="commentaire"]:focus {
          outline: none;
          border-color: #1d1d1f;
        }

        /* Style du texte dans le select (iOS fix) */
        select[style*="quantitySelect"] option {
          background-color: white;
          color: #1d1d1f;
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

        /* OPTIMISATION IPHONE : Stabilité et fluidité */
        @media screen and (max-width: 768px) {
          /* Bloquer le zoom sur double-tap */
          * {
            touch-action: manipulation !important;
          }

          /* Cartes produits : Padding optimisé iPhone */
          [style*="card"] {
            padding: 16px !important;
          }

          /* Images : Ratio stable */
          [style*="imageContainer"] {
            height: 160px !important;
          }

          /* Navigation : Smooth scrolling sur iOS */
          nav[style*="flex"] {
            -webkit-overflow-scrolling: touch !important;
            scroll-snap-type: x proximity !important;
            scroll-padding: 0 20px !important;
          }

          nav[style*="flex"] button {
            scroll-snap-align: center !important;
            flex-shrink: 0 !important;
          }

          /* Menu mobile : Padding pour Safe Area */
          nav[style*="flex"] {
            padding-left: max(40px, env(safe-area-inset-left)) !important;
            padding-right: max(40px, env(safe-area-inset-right)) !important;
          }
        }

        /* FIX IPHONE X et plus : Safe Area */
        @supports (padding: max(0px)) {
          body {
            padding-left: env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
          }
        }

        /* OPTIMISATIONS SAFARI iOS : Stabilité et performance */
        @supports (-webkit-touch-callout: none) {
          /* Détection Safari iOS */
          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          /* Fix du bounce vertical sur iOS */
          body {
            overscroll-behavior-y: none;
          }

          /* Grille : Performance GPU sur iOS */
          main[style*="grid"] {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            will-change: scroll-position;
          }

          /* Images : Optimisation chargement iOS */
          img {
            -webkit-user-select: none;
            user-select: none;
            -webkit-touch-callout: none;
          }

          /* Navigation sticky : Accélération GPU */
          [style*="sticky"] {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            will-change: transform;
          }
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
