import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const PRODUCTS_DATA = {
  nouveautes: [
    { id: 101, reference: "SM 01", image: "/images/mugs/nouveaute1.jpg", nom: "Support Mobile Acrylique", couleur: "" }
  ],
  textile: {
    tshirt: [
      { id: 21, reference: "H-001", image: "/images/mugs/tshirtns300bleu.jpeg", nom: "T-shirt unisexe Olda", couleur: "Blue Sapphire", description: "155 g/m² 100% coton biologique", hasSizes: true },
      { id: 22, reference: "H-002", image: "/images/mugs/tshirt.jpg", nom: "T-shirt Homme Oversize", couleur: "Noir", hasSizes: true }
    ],
    pochette: [],
    casquette: [],
    serviette: []
  },
  tassesCeramiques: {
    olda: [
      { id: 1, reference: "TC 01", image: "/images/mugs/roseblanc.jpg", nom: "Tasse Ceramique", couleur: "Rose & Blanc" },
      { id: 2, reference: "TC 02", image: "/images/mugs/rougeblanc.jpg", nom: "Tasse Ceramique", couleur: "Rouge & Blanc" },
      { id: 3, reference: "TC 03", image: "/images/mugs/orangeblanc.jpg", nom: "Tasse Ceramique", couleur: "Orange & Blanc" },
      { id: 4, reference: "TC 04", image: "/images/mugs/vertblanc.jpg", nom: "Tasse Ceramique", couleur: "Vert & Blanc" },
      { id: 5, reference: "TC 05", image: "/images/mugs/noirblanc.jpg", nom: "Tasse Ceramique", couleur: "Noir & Blanc" }
    ],
    fuck: [
      { id: 11, reference: "TF 01", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" }
    ],
    bois: []
  },
  artTable: {
    dessousPlat: [],
    dessousVerre: []
  },
  porteclefs: [],
  magnets: [],
  offres: [
    { id: 201, reference: "DB-001", image: "/images/mugs/decapsuleur.jpg", nom: "Decapsuleur Bois", couleur: "" }
  ]
};

const CATEGORIES = [
  { key: "nouveautes", label: "Nouveautés", isNew: true },
  {
    key: "textile",
    label: "Textile",
    subcategories: [
      { key: "tshirt", label: "T-Shirts" },
      { key: "pochette", label: "Pochette" },
      { key: "casquette", label: "Casquette" },
      { key: "serviette", label: "Serviette rafraîchissante" }
    ]
  },
  {
    key: "tassesCeramiques",
    label: "Tasses Céramiques",
    subcategories: [
      { key: "olda", label: "Tasses Olda" },
      { key: "fuck", label: "Tasses Fuck" },
      { key: "bois", label: "Tasse en bois" }
    ]
  },
  {
    key: "artTable",
    label: "Art de la table",
    subcategories: [
      { key: "dessousPlat", label: "Dessous de plat en liège" },
      { key: "dessousVerre", label: "Dessous de verre en liège" }
    ]
  },
  { key: "porteclefs", label: "Porte-clefs" },
  { key: "magnets", label: "Magnets" },
  { key: "offres", label: "Offres Spéciales", isPromo: true }
];

export default function OLDAStore() {
  const [showHomepage, setShowHomepage] = useState(true);
  const [activeCategory, setActiveCategory] = useState("nouveautes");
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [quantites, setQuantites] = useState({});
  const [tailles, setTailles] = useState({});
  const [commentaires, setCommentaires] = useState({});
  const [panier, setPanier] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [clientInfo, setClientInfo] = useState({ nom: "", email: "" });
  const [orderSent, setOrderSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [addedToCart, setAddedToCart] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  var navigateToCategory = function(categoryKey, subcategoryKey) {
    setIsLoading(true);
    setActiveCategory(categoryKey);
    setActiveSubcategory(subcategoryKey || null);
    setShowHomepage(false);
    setOpenDropdown(null);

    setTimeout(function() {
      setIsLoading(false);
    }, 600);
  };

  var handleImageLoad = function(id) {
    setImagesLoaded(function(prev) {
      var newState = Object.assign({}, prev);
      newState[id] = true;
      return newState;
    });
  };

  var getTaille = function(id) { return tailles[id] || "M"; };

  var setTaille = function(id, taille) {
    setTailles(Object.assign({}, tailles, { [id]: taille }));
  };

  useEffect(function() {
    emailjs.init("Y9NKwhNvCNtb_SRry");
  }, []);

  var getQte = function(id) { return quantites[id] || 3; };
  var getCommentaire = function(id) { return commentaires[id] || ""; };

  var ajuster = function(id, delta) {
    var v = getQte(id) + delta;
    if (v >= 3 && v <= 99) setQuantites(Object.assign({}, quantites, { [id]: v }));
  };

  var updateCommentaire = function(id, value) {
    setCommentaires(Object.assign({}, commentaires, { [id]: value }));
  };

  var ajouterAuPanier = function(p) {
    var qte = getQte(p.id);
    var commentaire = getCommentaire(p.id);
    var taille = p.hasSizes ? getTaille(p.id) : null;

    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    setAddedToCart(Object.assign({}, addedToCart, { [p.id]: true }));
    setTimeout(function() {
      setAddedToCart(Object.assign({}, addedToCart, { [p.id]: false }));
    }, 2000);

    setPanier(function(prev) {
      var item = Object.assign({}, p, { quantite: qte, commentaire: commentaire });
      if (taille) item.taille = taille;

      var existant = prev.find(function(i) { return i.id === p.id && i.taille === taille; });
      if (existant) {
        return prev.map(function(i) {
          return (i.id === p.id && i.taille === taille) ? Object.assign({}, i, { quantite: i.quantite + qte, commentaire: commentaire }) : i;
        });
      }
      return prev.concat([item]);
    });
  };

  var supprimerDuPanier = function(id) {
    setPanier(function(prev) { return prev.filter(function(item) { return item.id !== id; }); });
  };

  var envoyerCommande = async function() {
    if (!clientInfo.nom || !clientInfo.email) {
      alert("Merci de remplir tous les champs");
      return;
    }

    if (panier.length === 0) {
      alert("Votre sélection est vide");
      return;
    }

    setSending(true);

    var now = new Date();
    var orderNumber = "OLDA-" + now.getFullYear() + ("0" + (now.getMonth() + 1)).slice(-2) + ("0" + now.getDate()).slice(-2) + "-" + ("0" + now.getHours()).slice(-2) + ("0" + now.getMinutes()).slice(-2) + ("0" + now.getSeconds()).slice(-2);

    var productsHTML = "";
    panier.forEach(function(item, index) {
      var productLine = "<tr style='border-bottom: 1px solid #f5f5f7;'>";
      productLine += "<td style='padding: 20px 0; font-size: 15px; color: #1d1d1f;'>";
      productLine += "<div style='font-weight: 500;'>" + item.nom + (item.couleur ? " - " + item.couleur : "") + "</div>";
      if (item.taille) {
        productLine += "<div style='margin-top: 4px; font-size: 13px; color: #86868b;'>Taille: " + item.taille + "</div>";
      }
      if (item.commentaire) {
        productLine += "<div style='margin-top: 8px; font-size: 13px; color: #86868b; font-style: italic;'>Note: " + item.commentaire + "</div>";
      }
      productLine += "</td>";
      productLine += "<td style='padding: 20px 0; text-align: right; font-size: 18px; font-weight: 600; color: #ff3b30;'>" + item.quantite + "</td>";
      productLine += "</tr>";
      productsHTML += productLine;
    });

    var dateStr = now.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    var emailHTML = "<!DOCTYPE html><html><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'></head>";
    emailHTML += "<body style='margin: 0; padding: 40px 20px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif;'>";
    emailHTML += "<div style='max-width: 600px; margin: 0 auto; background-color: #ffffff;'>";
    emailHTML += "<div style='text-align: left; margin-bottom: 40px;'><img src='https://raw.githubusercontent.com/yourusername/AtelierOLDA2026/main/public/images/mugs/logo.jpeg' alt='OLDA' style='height: 60px; width: auto;' /></div>";
    emailHTML += "<div style='margin-bottom: 30px;'><h1 style='margin: 0; font-size: 28px; font-weight: 600; color: #1d1d1f;'>" + clientInfo.nom + "</h1></div>";
    emailHTML += "<div style='margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #1d1d1f;'><div style='font-size: 16px; color: #86868b; margin-bottom: 4px;'>Commande</div><div style='font-size: 20px; font-weight: 600; color: #1d1d1f;'>" + orderNumber + "</div><div style='font-size: 13px; color: #86868b; margin-top: 8px;'>" + dateStr + "</div></div>";
    emailHTML += "<table style='width: 100%; border-collapse: collapse; margin-bottom: 40px;'>";
    emailHTML += productsHTML;
    emailHTML += "</table>";
    emailHTML += "<div style='text-align: center; padding-top: 40px; border-top: 1px solid #f5f5f7; color: #86868b; font-size: 12px;'>Atelier OLDA &copy; " + now.getFullYear() + "</div>";
    emailHTML += "</div></body></html>";

    var templateParams = {
      client_nom: clientInfo.nom,
      client_email: clientInfo.email,
      order_number: orderNumber,
      order_date: dateStr,
      commande_html: emailHTML,
      to_email: "contact@atelierolda.com"
    };

    try {
      await emailjs.send(
        "service_vbspize",
        "template_kvrjlfu",
        templateParams
      );

      setSending(false);
      setOrderSent(true);
    } catch (err) {
      console.error("Erreur EmailJS:", err);
      alert("Erreur d envoi: " + (err.text || "Verifiez votre template EmailJS et vos identifiants"));
      setSending(false);
    }
  };

  var fermerEtReset = function() {
    setCartOpen(false);
    setOrderSent(false);
    setPanier([]);
    setClientInfo({ nom: "", email: "" });
  };

  var totalArticles = panier.reduce(function(sum, item) { return sum + item.quantite; }, 0);

  var getCurrentProducts = function() {
    if (activeCategory === "nouveautes") {
      return PRODUCTS_DATA.nouveautes;
    }

    var category = PRODUCTS_DATA[activeCategory];
    if (category && typeof category === "object" && !Array.isArray(category)) {
      return activeSubcategory ? category[activeSubcategory] || [] : [];
    }

    return Array.isArray(category) ? category : [];
  };

  var isCupCategory = function() {
    return activeCategory === "tassesCeramiques";
  };

  var currentProducts = getCurrentProducts();

  return React.createElement("div", { style: styles.container },

    isLoading && React.createElement("div", { style: styles.progressBar }),

    !showHomepage && React.createElement("header", { style: styles.header },
      React.createElement("img", {
        src: "/images/mugs/logo.jpeg",
        alt: "OLDA",
        style: styles.logo,
        onClick: function() { setShowHomepage(true); }
      }),
      React.createElement("button", { onClick: function() { setCartOpen(true); }, style: styles.cartButton },
        React.createElement("svg", { width: "22", height: "26", viewBox: "0 0 22 26", fill: "none", stroke: "#1d1d1f", strokeWidth: "1.5" },
          React.createElement("path", { d: "M4 7h14a2 2 0 012 2v12a3 3 0 01-3 3H5a3 3 0 01-3-3V9a2 2 0 012-2z" }),
          React.createElement("path", { d: "M7 7V5a4 4 0 118 0v2" })
        ),
        totalArticles > 0 && React.createElement("span", { style: styles.badge }, totalArticles)
      )
    ),

    showHomepage ? React.createElement("div", { style: styles.homepage },
      React.createElement("div", { style: styles.homepageContent },
        React.createElement("img", {
          src: "/images/mugs/logo.jpeg",
          alt: "Atelier OLDA",
          style: styles.homepageLogo
        }),
        React.createElement("div", { style: styles.categoryGrid },
          CATEGORIES.map(function(cat) {
            return React.createElement("button", {
              key: cat.key,
              onClick: function() {
                if (cat.subcategories && cat.subcategories.length > 0) {
                  navigateToCategory(cat.key, cat.subcategories[0].key);
                } else {
                  navigateToCategory(cat.key);
                }
              },
              style: cat.isNew ? Object.assign({}, styles.categoryCard, styles.categoryCardNew) :
                     cat.isPromo ? Object.assign({}, styles.categoryCard, styles.categoryCardPromo) :
                     styles.categoryCard
            },
              cat.isNew && React.createElement("span", { style: styles.categoryBadge }, "Nouveau"),
              cat.isPromo && React.createElement("span", { style: styles.categoryBadgePromo }, "Promo"),
              React.createElement("span", { style: styles.categoryLabel }, cat.label)
            );
          })
        )
      )
    ) : React.createElement(React.Fragment, null,

      React.createElement("div", { style: styles.navContainer, className: "nav-container" },
        React.createElement("nav", { style: styles.nav },
          CATEGORIES.map(function(cat) {
            var isActive = activeCategory === cat.key;
            var hasSubcategories = cat.subcategories && cat.subcategories.length > 0;
            var isOpen = openDropdown === cat.key;

            return React.createElement("div", {
              key: cat.key,
              style: styles.navItem,
              className: "nav-item"
            },
              React.createElement("button", {
                onClick: function() {
                  if (hasSubcategories) {
                    setOpenDropdown(isOpen ? null : cat.key);
                  } else {
                    navigateToCategory(cat.key);
                  }
                },
                style: isActive ? Object.assign({}, styles.navButton, styles.navButtonActive, cat.isPromo ? styles.navButtonPromo : {}) : Object.assign({}, styles.navButton, cat.isPromo ? styles.navButtonPromoInactive : {})
              },
                cat.label,
                hasSubcategories && React.createElement("span", { style: styles.dropdownArrow }, isOpen ? "▴" : "▾")
              ),

              hasSubcategories && isOpen && React.createElement("div", { style: styles.dropdown, className: "dropdown" },
                cat.subcategories.map(function(sub) {
                  var isSubActive = activeSubcategory === sub.key;
                  return React.createElement("button", {
                    key: sub.key,
                    onClick: function() { navigateToCategory(cat.key, sub.key); },
                    style: isSubActive ? Object.assign({}, styles.dropdownItem, styles.dropdownItemActive) : styles.dropdownItem
                  }, sub.label);
                })
              )
            );
          })
        )
      ),

      React.createElement("main", { style: styles.main },
        currentProducts.length > 0 ? currentProducts.map(function(product) {
          var isLoaded = imagesLoaded[product.id];
          return React.createElement("div", { key: product.id, style: styles.card },
            React.createElement("div", { style: styles.imageContainer },
              !isLoaded && React.createElement("div", { style: styles.skeleton }),
              React.createElement("img", {
                src: product.image,
                alt: product.nom,
                style: Object.assign({}, styles.image, !isLoaded ? { opacity: 0 } : { opacity: 1 }, isCupCategory() ? { mixBlendMode: "multiply" } : {}),
                onLoad: function() { handleImageLoad(product.id); },
                onError: function(e) { handleImageLoad(product.id); e.target.style.display = "none"; }
              })
            ),

            React.createElement("div", { style: styles.productInfo },
              React.createElement("h3", { style: styles.productName }, product.nom),
              product.couleur && React.createElement("p", { style: styles.productColor }, product.couleur),
              product.description && React.createElement("p", { style: styles.productDescription }, product.description),
              React.createElement("p", { style: styles.productRef }, product.reference)
            ),

            product.hasSizes && React.createElement("div", { style: styles.sizeSelector },
              ["XS", "S", "M", "L", "XL"].map(function(size) {
                var isSelected = getTaille(product.id) === size;
                return React.createElement("button", {
                  key: size,
                  onClick: function() { setTaille(product.id, size); },
                  style: isSelected ? Object.assign({}, styles.sizeButton, styles.sizeButtonActive) : styles.sizeButton
                }, size);
              })
            ),

            React.createElement("div", { style: styles.quantityControl },
              React.createElement("button", { onClick: function() { ajuster(product.id, -1); }, style: styles.qtyButton }, "-"),
              React.createElement("span", { style: styles.quantity }, getQte(product.id)),
              React.createElement("button", { onClick: function() { ajuster(product.id, 1); }, style: styles.qtyButton }, "+")
            ),

            React.createElement("textarea", {
              placeholder: "Note",
              value: getCommentaire(product.id),
              onChange: function(e) { updateCommentaire(product.id, e.target.value); },
              style: styles.commentaire,
              rows: "1"
            }),

            React.createElement("button", {
              onClick: function() { ajouterAuPanier(product); },
              style: addedToCart[product.id] ? Object.assign({}, styles.addButton, styles.addButtonAdded) : styles.addButton
            }, addedToCart[product.id] ? "Ajouté ✓" : "Ajouter")
          );
        }) : React.createElement("div", { style: styles.emptyState }, "Aucun produit disponible dans cette catégorie")
      ),

      React.createElement("footer", { style: styles.footer },
        "© 2026 Atelier OLDA. Tous droits réservés."
      )
    ),

    cartOpen && React.createElement("div", { style: styles.sideCartOverlay, onClick: function() { setCartOpen(false); } },
      React.createElement("div", {
        style: styles.sideCart,
        onClick: function(e) { e.stopPropagation(); },
        className: "side-cart"
      },
        orderSent ? React.createElement("div", { style: styles.successContainer },
          React.createElement("div", { style: styles.successIcon }, "\u2713"),
          React.createElement("h2", { style: styles.successTitle }, "L'Atelier OLDA vous remercie pour votre confiance."),
          React.createElement("p", { style: styles.successEmail }, "Nous vous contacterons a " + clientInfo.email),
          React.createElement("button", { onClick: fermerEtReset, style: styles.closeButton }, "Fermer")
        ) : React.createElement(React.Fragment, null,
          React.createElement("div", { style: styles.sideCartHeader },
            React.createElement("h2", { style: styles.sideCartTitle }, "Sélection"),
            React.createElement("button", { onClick: function() { setCartOpen(false); }, style: styles.closeIcon }, "\u00d7")
          ),

          panier.length === 0 ? React.createElement("p", { style: styles.emptyCart }, "Votre sélection est vide") : React.createElement(React.Fragment, null,
            React.createElement("div", { style: styles.cartItems },
              panier.map(function(item) {
                return React.createElement("div", { key: item.id + "-" + (item.taille || ""), style: styles.cartItem },
                  React.createElement("img", { src: item.image, alt: item.nom, style: styles.cartItemImage }),
                  React.createElement("div", { style: { flex: 1 } },
                    React.createElement("p", { style: styles.cartItemName }, item.nom),
                    React.createElement("p", { style: styles.cartItemDetails },
                      (item.couleur || "") +
                      (item.taille ? " | Taille: " + item.taille : "") +
                      " | Qté: " + item.quantite
                    ),
                    item.commentaire && React.createElement("p", { style: styles.cartItemComment }, "Note: " + item.commentaire)
                  ),
                  React.createElement("button", { onClick: function() { supprimerDuPanier(item.id); }, style: styles.deleteButton }, "\u00d7")
                );
              })
            ),

            React.createElement("div", { style: styles.form },
              React.createElement("input", {
                type: "text",
                placeholder: "Votre nom",
                value: clientInfo.nom,
                onChange: function(e) { setClientInfo(Object.assign({}, clientInfo, { nom: e.target.value })); },
                style: styles.input
              }),
              React.createElement("input", {
                type: "email",
                placeholder: "Votre email",
                value: clientInfo.email,
                onChange: function(e) { setClientInfo(Object.assign({}, clientInfo, { email: e.target.value })); },
                style: styles.input
              }),

              React.createElement("button", {
                onClick: envoyerCommande,
                disabled: sending,
                style: Object.assign({}, styles.submitButton, sending ? styles.submitButtonDisabled : {})
              }, sending ? "Envoi en cours..." : "Commander")
            )
          )
        )
      )
    )

  );
}

var styles = {
  container: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', Segoe UI, Roboto, sans-serif",
    minHeight: "100vh",
    backgroundColor: "#fafafa"
  },
  progressBar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    backgroundColor: "#0071e3",
    zIndex: 9999,
    animation: "progress 0.6s ease-in-out"
  },
  homepage: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff"
  },
  homepageContent: {
    textAlign: "center",
    padding: "40px 20px",
    maxWidth: "900px",
    margin: "0 auto"
  },
  homepageLogo: {
    width: "200px",
    height: "auto",
    objectFit: "contain",
    marginBottom: "60px"
  },
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "16px",
    marginTop: "40px"
  },
  categoryCard: {
    backgroundColor: "#f5f5f7",
    border: "none",
    borderRadius: "18px",
    padding: "28px 16px",
    cursor: "pointer",
    transition: "all 0.3s",
    position: "relative",
    minHeight: "100px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  categoryCardNew: {
    backgroundColor: "#e8f2ff"
  },
  categoryCardPromo: {
    backgroundColor: "#ffe5e5"
  },
  categoryBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#0071e3",
    color: "white",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "600"
  },
  categoryBadgePromo: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#ff3b30",
    color: "white",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: "600"
  },
  categoryLabel: {
    fontSize: "15px",
    fontWeight: "500",
    color: "#1d1d1f",
    textAlign: "center"
  },
  header: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    padding: "14px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999999
  },
  logo: {
    height: "36px",
    width: "auto",
    objectFit: "contain",
    cursor: "pointer"
  },
  cartButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    position: "relative",
    padding: "8px"
  },
  badge: {
    position: "absolute",
    top: "0",
    right: "0",
    backgroundColor: "#0071e3",
    color: "white",
    borderRadius: "10px",
    padding: "2px 6px",
    fontSize: "11px",
    fontWeight: "600",
    minWidth: "18px",
    textAlign: "center"
  },
  navContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(0,0,0,0.08)",
    position: "fixed",
    top: "66px",
    left: 0,
    right: 0,
    zIndex: 999998,
    overflowY: "visible"
  },
  nav: {
    padding: "12px 20px",
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    overflowY: "visible",
    scrollBehavior: "smooth",
    scrollbarWidth: "none",
    msOverflowStyle: "none"
  },
  navItem: {
    position: "relative",
    overflow: "visible",
    zIndex: 1
  },
  navButton: {
    padding: "8px 16px",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    backgroundColor: "transparent",
    color: "#1d1d1f",
    fontSize: "13px",
    fontWeight: "400",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  navButtonActive: {
    backgroundColor: "#0071e3",
    color: "white"
  },
  navButtonPromo: {
    backgroundColor: "#ff3b30",
    color: "white"
  },
  navButtonPromoInactive: {
    backgroundColor: "#ffe5e5",
    color: "#ff3b30"
  },
  dropdownArrow: {
    fontSize: "10px",
    marginLeft: "2px"
  },
  dropdown: {
    position: "absolute",
    top: "100%",
    left: "0",
    marginTop: "4px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
    minWidth: "180px",
    overflow: "visible",
    zIndex: 9999999
  },
  dropdownItem: {
    display: "block",
    width: "100%",
    padding: "12px 16px",
    border: "none",
    backgroundColor: "transparent",
    color: "#1d1d1f",
    fontSize: "13px",
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  dropdownItemActive: {
    backgroundColor: "#f5f5f7",
    color: "#0071e3",
    fontWeight: "500"
  },
  main: {
    padding: "16px 16px 80px 16px",
    marginTop: "140px",
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    maxWidth: "900px",
    margin: "140px auto 0 auto",
    position: "relative",
    zIndex: 1
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "20px 16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(0,0,0,0.04)",
    position: "relative",
    zIndex: 1
  },
  imageContainer: {
    width: "100%",
    aspectRatio: "1 / 1",
    backgroundColor: "#fafafa",
    borderRadius: "16px",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    padding: "16px",
    position: "relative"
  },
  skeleton: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: "16px"
  },
  image: {
    maxHeight: "100%",
    maxWidth: "100%",
    objectFit: "contain",
    transition: "opacity 0.3s ease-in-out"
  },
  productInfo: {
    marginBottom: "12px",
    textAlign: "left"
  },
  productName: {
    margin: "0 0 4px 0",
    fontSize: "14px",
    fontWeight: "500",
    color: "#1d1d1f",
    lineHeight: "1.3"
  },
  productColor: {
    margin: "0 0 4px 0",
    fontSize: "12px",
    color: "#6e6e73",
    fontWeight: "400"
  },
  productDescription: {
    margin: "0 0 4px 0",
    fontSize: "10px",
    color: "#86868b",
    fontWeight: "400",
    fontStyle: "italic"
  },
  productRef: {
    margin: "0",
    fontSize: "10px",
    color: "#86868b",
    fontWeight: "400"
  },
  sizeSelector: {
    display: "flex",
    gap: "6px",
    justifyContent: "center",
    marginBottom: "10px"
  },
  sizeButton: {
    minWidth: "36px",
    height: "30px",
    padding: "0 10px",
    border: "1px solid #d2d2d7",
    borderRadius: "8px",
    backgroundColor: "white",
    color: "#1d1d1f",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s"
  },
  sizeButtonActive: {
    backgroundColor: "#0071e3",
    borderColor: "#0071e3",
    color: "white"
  },
  quantityControl: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "8px"
  },
  qtyButton: {
    width: "30px",
    height: "30px",
    border: "1px solid #d2d2d7",
    borderRadius: "50%",
    cursor: "pointer",
    backgroundColor: "white",
    fontSize: "14px",
    color: "#1d1d1f",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s"
  },
  quantity: {
    fontSize: "14px",
    fontWeight: "600",
    minWidth: "24px",
    textAlign: "center"
  },
  commentaire: {
    width: "100%",
    padding: "8px 10px",
    border: "1px solid #e5e5e7",
    borderRadius: "8px",
    fontSize: "11px",
    fontFamily: "inherit",
    resize: "none",
    marginBottom: "8px",
    boxSizing: "border-box",
    color: "#1d1d1f",
    backgroundColor: "#fafafa"
  },
  addButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#0071e3",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "all 0.3s ease-in-out",
    transform: "scale(1)"
  },
  addButtonAdded: {
    backgroundColor: "#34c759",
    transform: "scale(0.95)"
  },
  emptyState: {
    gridColumn: "1 / -1",
    textAlign: "center",
    padding: "60px 20px",
    color: "#86868b",
    fontSize: "15px"
  },
  footer: {
    padding: "32px 20px",
    textAlign: "center",
    color: "#86868b",
    fontSize: "12px",
    fontWeight: "400",
    borderTop: "1px solid rgba(0,0,0,0.06)"
  },
  sideCartOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    zIndex: 1000,
    animation: "fadeIn 0.3s ease-out"
  },
  sideCart: {
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "white",
    boxShadow: "-4px 0 24px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    animation: "slideInRight 0.3s ease-out",
    overflowY: "auto"
  },
  sideCartHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "24px 24px 16px 24px",
    borderBottom: "1px solid #f5f5f7"
  },
  sideCartTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "600",
    color: "#1d1d1f"
  },
  closeIcon: {
    background: "none",
    border: "none",
    fontSize: "32px",
    cursor: "pointer",
    color: "#86868b",
    padding: 0,
    lineHeight: 1
  },
  emptyCart: {
    textAlign: "center",
    color: "#86868b",
    padding: "60px 20px",
    fontSize: "15px"
  },
  cartItems: {
    flex: 1,
    padding: "16px 24px",
    overflowY: "auto"
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "16px 0",
    borderBottom: "1px solid #f5f5f7",
    gap: "12px"
  },
  cartItemImage: {
    width: "60px",
    height: "60px",
    objectFit: "contain",
    borderRadius: "8px",
    backgroundColor: "#f5f5f7",
    flexShrink: 0
  },
  cartItemName: {
    margin: "0 0 4px 0",
    fontSize: "14px",
    fontWeight: "500",
    color: "#1d1d1f"
  },
  cartItemDetails: {
    margin: "0 0 4px 0",
    fontSize: "12px",
    color: "#6e6e73"
  },
  cartItemComment: {
    margin: "4px 0 0 0",
    fontSize: "12px",
    color: "#86868b",
    fontStyle: "italic"
  },
  deleteButton: {
    background: "none",
    border: "none",
    fontSize: "24px",
    cursor: "pointer",
    color: "#86868b",
    padding: "0 4px",
    flexShrink: 0
  },
  form: {
    padding: "16px 24px 24px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    borderTop: "1px solid #f5f5f7"
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #d2d2d7",
    borderRadius: "10px",
    fontSize: "14px",
    boxSizing: "border-box",
    fontFamily: "inherit"
  },
  submitButton: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#0071e3",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600",
    marginTop: "8px"
  },
  submitButtonDisabled: {
    backgroundColor: "#86868b",
    cursor: "not-allowed"
  },
  successContainer: {
    textAlign: "center",
    padding: "60px 24px"
  },
  successIcon: {
    width: "64px",
    height: "64px",
    backgroundColor: "#34c759",
    color: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
    margin: "0 auto 20px"
  },
  successTitle: {
    fontSize: "22px",
    fontWeight: "600",
    color: "#1d1d1f",
    margin: "0 0 8px 0"
  },
  successText: {
    fontSize: "15px",
    color: "#6e6e73",
    margin: "0 0 4px 0"
  },
  successEmail: {
    fontSize: "15px",
    color: "#6e6e73",
    margin: "0 0 24px 0"
  },
  closeButton: {
    padding: "14px 32px",
    backgroundColor: "#0071e3",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "600"
  }
};
