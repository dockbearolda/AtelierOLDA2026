import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        nav::-webkit-scrollbar {
          display: none;
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

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.06), 0 12px 32px rgba(0,0,0,0.1) !important;
        }

        /* Smooth transitions */
        * {
          -webkit-tap-highlight-color: transparent;
          transition: all 0.3s ease-in-out;
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
