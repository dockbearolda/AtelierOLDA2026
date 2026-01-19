import React from 'react';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta charSet="UTF-8" />
      </Head>
      <style jsx global>{`
        /* Reset & Base */
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        html, body {
          width: 100%;
          overflow-x: hidden;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        nav::-webkit-scrollbar {
          display: none;
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

        /* Animation for scroll indicator */
        @keyframes scrollPulse {
          0%, 100% {
            opacity: 0.3;
            transform: translateX(-50%) translateY(0);
          }
          50% {
            opacity: 0.8;
            transform: translateX(-50%) translateY(4px);
          }
        }

        /* Hover effects */
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        }

        .product-card {
          transition: all 0.3s ease-in-out;
        }

        .product-card:hover {
          transform: scale(1.05) translateY(-4px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.08), 0 16px 48px rgba(0,0,0,0.12) !important;
        }

        /* Smooth transitions */
        * {
          -webkit-tap-highlight-color: transparent;
        }

        input, textarea, button {
          transition: all 0.3s ease-in-out;
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: #0071e3;
          box-shadow: 0 0 0 3px rgba(0, 113, 227, 0.1);
        }

        /* Responsive layout for products */
        @media (max-width: 767px) {
          /* Mobile: 2 columns compact */
          main {
            padding: 16px 12px !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
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
          .homepage-logo {
            width: 140px !important;
            height: auto !important;
            margin-bottom: 24px !important;
          }

          .homepage-title {
            font-size: 28px !important;
          }

          .homepage-subtitle {
            font-size: 16px !important;
            margin-bottom: 32px !important;
          }

          .homepage-content {
            padding: 20px 16px !important;
          }

          /* Category grid on mobile */
          .homepage-content > div:last-child {
            grid-template-columns: 1fr !important;
          }

          /* Product cards on mobile */
          .product-card {
            padding: 12px !important;
          }

          .product-card img {
            height: 140px !important;
          }

          .product-card h3 {
            font-size: 13px !important;
          }

          .product-card .product-color {
            font-size: 11px !important;
          }

          .product-card button {
            font-size: 12px !important;
            padding: 10px 16px !important;
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
