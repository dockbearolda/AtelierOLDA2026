import React from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta charSet="UTF-8" />
        <title>Atelier OLDA - Boutique Premium</title>
      </Head>
      <style jsx global>{`
        /* Reset & Base */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          -webkit-tap-highlight-color: transparent;
        }

        html, body {
          width: 100%;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
        }

        body {
          overscroll-behavior: none;
        }

        /* Hide scrollbar for navigation */
        nav::-webkit-scrollbar {
          display: none;
        }

        nav {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Progress Bar Animation */
        @keyframes progress {
          0% {
            transform: scaleX(0);
            transform-origin: left;
          }
          100% {
            transform: scaleX(1);
            transform-origin: left;
          }
        }

        /* Skeleton Loading Animation */
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .skeleton {
          background: linear-gradient(
            90deg,
            #f0f0f0 0%,
            #e0e0e0 20%,
            #f0f0f0 40%,
            #f0f0f0 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        /* Fade In Animation */
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Slide In From Right Animation */
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        /* REMOVE ALL HOVER/FOCUS EFFECTS ON CARDS */
        /* Cards remain static and stable */
        .product-card {
          transition: none !important;
          transform: none !important;
        }

        .product-card:hover {
          transform: none !important;
          box-shadow: 0 1px 3px rgba(0,0,0,0.04) !important;
          z-index: auto !important;
        }

        .product-card:active {
          transform: none !important;
        }

        /* Smooth transitions for inputs only */
        input, textarea, button {
          transition: all 0.2s ease-in-out;
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: #0071e3;
          box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1);
        }

        button:active {
          transform: scale(0.98);
        }

        /* Dropdown hover effects */
        button[style*="dropdownItem"]:hover {
          background-color: #f5f5f7;
        }

        /* Mobile Optimization - iPhone Portrait */
        @media (max-width: 767px) {
          html {
            -webkit-text-size-adjust: 100%;
          }

          body {
            min-width: 320px;
            padding-top: 0 !important;
          }

          /* Ensure no horizontal scroll */
          main {
            padding: 130px 12px 80px 12px !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
            max-width: 100% !important;
            margin: 0 auto !important;
          }

          /* Cards fit perfectly without overflow */
          .product-card {
            padding: 16px 12px !important;
            width: 100%;
          }

          /* Header compact on mobile */
          header {
            padding: 12px 16px !important;
          }

          /* Navigation compact on mobile */
          nav {
            padding: 10px 16px !important;
          }

          /* Homepage adjustments */
          .homepage-logo {
            width: 160px !important;
            margin-bottom: 40px !important;
          }

          .homepage-content {
            padding: 32px 16px !important;
          }

          /* Side cart full width on mobile */
          .side-cart {
            max-width: 100% !important;
          }
        }

        /* Tablet Optimization */
        @media (min-width: 768px) and (max-width: 1024px) {
          main {
            padding: 32px 20px 80px 20px !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 16px !important;
            max-width: 750px !important;
            margin: 0 auto !important;
          }
        }

        /* Desktop Optimization */
        @media (min-width: 1025px) {
          main {
            padding: 40px 24px 100px 24px !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
            max-width: 900px !important;
            margin: 0 auto !important;
          }

          .side-cart {
            max-width: 420px !important;
          }
        }

        /* Prevent zoom on input focus (iOS) */
        @media screen and (max-width: 767px) {
          input[type="text"],
          input[type="email"],
          textarea {
            font-size: 16px !important;
          }
        }

        /* Backdrop support */
        @supports (backdrop-filter: blur(20px)) or (-webkit-backdrop-filter: blur(20px)) {
          header, nav {
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }
        }

        /* Critical Z-Index Hierarchy */
        header {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          z-index: 1000 !important;
        }

        nav, .nav-container {
          position: fixed !important;
          z-index: 999 !important;
        }

        /* Dropdowns MUST be on top */
        [style*="dropdown"] {
          z-index: 10000 !important;
        }

        /* Ensure navigation doesn't move vertically */
        header, nav {
          position: fixed !important;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
