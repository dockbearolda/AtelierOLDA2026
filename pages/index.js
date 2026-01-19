import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

// Générateur automatique de produits
var generateProducts = function(prefix, count, startId, baseNom) {
var colors = [
["Rose", "Blanc"], ["Rouge", "Blanc"], ["Orange", "Blanc"], ["Vert", "Blanc"], ["Noir", "Blanc"],
["Bleu", "Blanc"], ["Jaune", "Blanc"], ["Violet", "Blanc"], ["Turquoise", "Blanc"], ["Corail", "Blanc"],
["Noir", "Rose"], ["Noir", "Rouge"], ["Noir", "Orange"], ["Noir", "Vert"], ["Noir", "Bleu"],
["Noir", "Jaune"], ["Gris", "Blanc"]
];
var products = [];
for (var i = 0; i < count; i++) {
var num = (i + 1).toString().padStart(2, "0");
var colorPair = colors[i % colors.length];
products.push({
id: startId + i,
reference: prefix + " " + num,
image: "/images/mugs/" + prefix + "_" + num + ".jpg",
nom: baseNom,
couleur: colorPair[0] + " - " + colorPair[1]
});
}
return products;
};

const MUGS_DATA = {
nouveautes: [
{ id: 101, reference: "SM 01", image: "/images/mugs/nouveaute1.jpg", nom: "Support Mobile Acrylique", couleur: "" }
],
fuck: generateProducts("TCF", 17, 1000, "Tasse Ceramique Fuck"),
olda: generateProducts("TC", 13, 2000, "Tasse Ceramique OLDA"),
metal: [
{ id: 31, reference: "TM 01", image: "/images/mugs/noirrose.JPG", nom: "Tasse Metal OLDA", couleur: "Noir & Rose" },
{ id: 32, reference: "TM 02", image: "/images/mugs/noirrouge.JPG", nom: "Tasse Metal OLDA", couleur: "Noir & Rouge" },
{ id: 33, reference: "TM 03", image: "/images/mugs/noirorange.JPG", nom: "Tasse Metal OLDA", couleur: "Noir & Orange" },
{ id: 34, reference: "TM 04", image: "/images/mugs/noirjaune.JPG", nom: "Tasse Metal OLDA", couleur: "Noir & Jaune" },
{ id: 35, reference: "TM 05", image: "/images/mugs/noirvert.JPG", nom: "Tasse Metal OLDA", couleur: "Noir & Vert" }
],
tshirt: [
{ id: 21, reference: "H - 001", image: "/images/mugs/tshirtns300bleu.jpeg", nom: "T-shirt unisexe Olda", couleur: "Blue Sapphire", description: "155 g/m² 100% coton biologique" }
],
offres: [
{ id: 201, reference: "DB-001", image: "/images/mugs/decapsuleur.jpg", nom: "Decapsuleur Bois", couleur: "" }
]
};

const tabs = [
{ key: "nouveautes", label: "Nouveautés", subtitle: "Dernières créations" },
{ key: "fuck", label: "Céramique Fuck", subtitle: "Collection signature" },
{ key: "olda", label: "Céramique OLDA", subtitle: "Collection classique" },
{ key: "metal", label: "Métal & Bois", subtitle: "Édition premium" },
{ key: "tshirt", label: "Textile", subtitle: "Vêtements" },
{ key: "offres", label: "Sélection", subtitle: "Offres exclusives" }
];

export default function OLDAStore() {
const [showHomepage, setShowHomepage] = useState(true);
const [activeTab, setActiveTab] = useState("nouveautes");
const [quantites, setQuantites] = useState({});
const [commentaires, setCommentaires] = useState({});
const [tailles, setTailles] = useState({});
const [panier, setPanier] = useState([]);
const [cartOpen, setCartOpen] = useState(false);
const [clientInfo, setClientInfo] = useState({ nom: "", email: "" });
const [orderSent, setOrderSent] = useState(false);
const [sending, setSending] = useState(false);
const [addedItems, setAddedItems] = useState({});
const [isChanging, setIsChanging] = useState(false);
const [hoveredCard, setHoveredCard] = useState(null);

var navigateToCategory = function(category) {
setIsChanging(true);
setTimeout(function() { setIsChanging(false); }, 300);
setActiveTab(category);
setShowHomepage(false);
};

useEffect(function() {
emailjs.init("Y9NKwhNvCNtb_SRry");
}, []);

var getQte = function(id) { return quantites[id] || 3; };
var getCommentaire = function(id) { return commentaires[id] || ""; };
var getTaille = function(id) { return tailles[id] || "M"; };

var selectTaille = function(id, taille) {
setTailles(Object.assign({}, tailles, { [id]: taille }));
};

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
var taille = getTaille(p.id);
var itemData = Object.assign({}, p, { quantite: qte, commentaire: commentaire });
if (p.description) {
itemData.taille = taille;
}
setPanier(function(prev) {
var existant = prev.find(function(i) { return i.id === p.id; });
if (existant) {
return prev.map(function(i) {
if (i.id === p.id) {
var updated = Object.assign({}, i, { quantite: i.quantite + qte, commentaire: commentaire });
if (p.description) updated.taille = taille;
return updated;
}
return i;
});
}
return prev.concat([itemData]);
});

setAddedItems(Object.assign({}, addedItems, { [p.id]: true }));
setTimeout(function() {
setAddedItems(Object.assign({}, addedItems, { [p.id]: false }));
}, 1500);

if (navigator.vibrate) {
navigator.vibrate(50);
}
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
alert("Votre panier est vide");
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

var getTabStyle = function(tabKey) {
var baseStyle = Object.assign({}, styles.tab);
if (activeTab === tabKey) {
if (tabKey === "nouveautes") {
return Object.assign({}, baseStyle, styles.tabActive, { backgroundColor: "#0071e3", color: "white" });
} else if (tabKey === "offres") {
return Object.assign({}, baseStyle, styles.tabActive, { backgroundColor: "#ff3b30", color: "white" });
}
return Object.assign({}, baseStyle, styles.tabActive);
} else {
if (tabKey === "nouveautes") {
return Object.assign({}, baseStyle, { backgroundColor: "#e8f2ff", color: "#0071e3" });
} else if (tabKey === "offres") {
return Object.assign({}, baseStyle, { backgroundColor: "#ffe5e5", color: "#ff3b30" });
}
return baseStyle;
}
};

return React.createElement("div", { style: styles.container },
isChanging && React.createElement("div", { style: styles.progressBar }),
React.createElement("header", { style: styles.header },
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
React.createElement("h1", { style: styles.homepageTitle }, "Atelier OLDA"),
React.createElement("p", { style: styles.homepageSubtitle }, "Cr\u00e9ations uniques et personnalis\u00e9es"),
React.createElement("div", { style: styles.categoryGrid },
tabs.map(function(tab) {
return React.createElement("button", {
key: tab.key,
onClick: function() { navigateToCategory(tab.key); },
style: tab.key === "nouveautes" ? Object.assign({}, styles.categoryCard, styles.categoryCardNew) :
tab.key === "offres" ? Object.assign({}, styles.categoryCard, styles.categoryCardPromo) :
styles.categoryCard
},
tab.key === "nouveautes" && React.createElement("span", { style: styles.categoryBadge }, "Nouveau"),
tab.key === "offres" && React.createElement("span", { style: styles.categoryBadgePromo }, "Promo"),
React.createElement("span", { style: styles.categoryLabel }, tab.label)
);
})
)
)
) : React.createElement(React.Fragment, null,

React.createElement("div", { style: styles.badgeNavContainer },
  React.createElement("div", { style: styles.badgeNav },
    tabs.map(function(tab) {
      var isActive = activeTab === tab.key;
      return React.createElement("button", {
        key: tab.key,
        onClick: function() { navigateToCategory(tab.key); },
        style: isActive ? Object.assign({}, styles.badge_nav, styles.badge_nav_active) : styles.badge_nav
      }, tab.label);
    })
  )
),

React.createElement("div", { style: styles.collectionHeader },
  React.createElement("h2", { style: styles.collectionTitle },
    tabs.find(function(t) { return t.key === activeTab; }).label
  ),
  React.createElement("p", { style: styles.collectionSubtitle },
    tabs.find(function(t) { return t.key === activeTab; }).subtitle
  )
),

React.createElement("main", { style: styles.main },
  MUGS_DATA[activeTab] && MUGS_DATA[activeTab].map(function(product) {
    var isAdded = addedItems[product.id];
    var isHovered = hoveredCard === product.id;
    var cardStyle = isHovered ? Object.assign({}, styles.card, styles.cardHover) : styles.card;

    return React.createElement("div", {
      key: product.id,
      style: cardStyle,
      onMouseEnter: function() { setHoveredCard(product.id); },
      onMouseLeave: function() { setHoveredCard(null); }
    },
      React.createElement("div", { style: styles.imageContainer },
        React.createElement("img", {
          src: product.image,
          alt: product.nom,
          style: styles.image,
          onError: function(e) { e.target.style.display = "none"; }
        }),
        isHovered && React.createElement("div", { style: styles.hoverOverlay },
          React.createElement("button", {
            onClick: function() { ajouterAuPanier(product); },
            style: isAdded ? Object.assign({}, styles.quickAddButton, styles.quickAddButtonAdded) : styles.quickAddButton
          }, isAdded ? "Ajouté ✓" : "Ajouter à la Collection")
        )
      ),

      React.createElement("div", { style: styles.productInfo },
        React.createElement("h3", { style: styles.productName }, product.nom),
        product.couleur && React.createElement("p", { style: styles.productColor }, product.couleur),
        React.createElement("p", { style: styles.productRef }, product.reference)
      ),

      isHovered && React.createElement("div", { style: styles.expandedControls },
        product.description && React.createElement("div", { style: styles.sizeSelector },
          React.createElement("span", { style: styles.sizeLabel }, "Taille"),
          ["S", "M", "L", "XL"].map(function(size) {
            var selected = getTaille(product.id) === size;
            return React.createElement("button", {
              key: size,
              onClick: function() { selectTaille(product.id, size); },
              style: selected ? Object.assign({}, styles.sizeButton, styles.sizeButtonActive) : styles.sizeButton
            }, size);
          })
        ),

        React.createElement("div", { style: styles.quantityControl },
          React.createElement("span", { style: styles.quantityLabel }, "Quantité"),
          React.createElement("div", { style: styles.quantityButtons },
            React.createElement("button", { onClick: function() { ajuster(product.id, -1); }, style: styles.qtyButton }, "-"),
            React.createElement("span", { style: styles.quantity }, getQte(product.id)),
            React.createElement("button", { onClick: function() { ajuster(product.id, 1); }, style: styles.qtyButton }, "+")
          )
        ),

        React.createElement("textarea", {
          placeholder: "Note personnalisée (optionnel)",
          value: getCommentaire(product.id),
          onChange: function(e) { updateCommentaire(product.id, e.target.value); },
          style: styles.commentaire,
          rows: "2"
        })
      )
    );
  })
),

React.createElement("footer", { style: styles.footer },
  React.createElement("p", { style: styles.footerText }, "\u00a9 2026 Atelier OLDA. Tous droits r\u00e9serv\u00e9s.")
)
),

cartOpen && React.createElement("div", { style: styles.sideCartOverlay, onClick: function() { setCartOpen(false); } },
  React.createElement("div", { style: styles.sideCart, onClick: function(e) { e.stopPropagation(); } },
    orderSent ? React.createElement("div", { style: styles.successContainer },
      React.createElement("div", { style: styles.successIcon }, "\u2713"),
      React.createElement("h2", { style: styles.successTitle }, "Commande envoyee"),
      React.createElement("p", { style: styles.successText }, "Merci " + clientInfo.nom),
      React.createElement("p", { style: styles.successEmail }, "Nous vous contacterons a " + clientInfo.email),
      React.createElement("button", { onClick: fermerEtReset, style: styles.closeButton }, "Fermer")
    ) : React.createElement(React.Fragment, null,
      React.createElement("div", { style: styles.modalHeader },
        React.createElement("h2", { style: styles.modalTitle }, "Selection"),
        React.createElement("button", { onClick: function() { setCartOpen(false); }, style: styles.closeIcon }, "\u00d7")
      ),

      panier.length === 0 ? React.createElement("p", { style: styles.emptyCart }, "Votre selection est vide") : React.createElement(React.Fragment, null,
        React.createElement("div", { style: styles.cartItems },
          panier.map(function(item) {
            return React.createElement("div", { key: item.id, style: styles.cartItem },
              React.createElement("img", { src: item.image, alt: item.nom, style: styles.cartItemImage }),
              React.createElement("div", { style: { flex: 1 } },
                React.createElement("p", { style: styles.cartItemName }, item.nom),
                React.createElement("p", { style: styles.cartItemDetails },
                  (item.couleur ? item.couleur : "") +
                  (item.taille ? " | Taille: " + item.taille : "") +
                  " x " + item.quantite
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
fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
minHeight: "100vh",
backgroundColor: "#ffffff"
},
progressBar: {
position: "fixed",
top: 0,
left: 0,
right: 0,
height: "2px",
backgroundColor: "#0071e3",
zIndex: 9999,
animation: "progressSlide 0.3s ease-in-out"
},
homepage: {
minHeight: "calc(100vh - 73px)",
display: "flex",
alignItems: "center",
justifyContent: "center",
backgroundColor: "#ffffff"
},
homepageContent: {
textAlign: "center",
padding: "40px",
maxWidth: "900px",
margin: "0 auto"
},
homepageTitle: {
fontSize: "56px",
fontWeight: "600",
color: "#1d1d1f",
margin: "0 0 16px 0",
letterSpacing: "-0.5px"
},
homepageSubtitle: {
fontSize: "21px",
color: "#6e6e73",
margin: "0 0 60px 0",
fontWeight: "400"
},
categoryGrid: {
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
gap: "20px",
marginTop: "40px"
},
categoryCard: {
backgroundColor: "#f5f5f7",
border: "none",
borderRadius: "18px",
padding: "32px 20px",
cursor: "pointer",
transition: "all 0.3s",
position: "relative",
minHeight: "120px",
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
top: "12px",
right: "12px",
backgroundColor: "#0071e3",
color: "white",
padding: "4px 10px",
borderRadius: "12px",
fontSize: "11px",
fontWeight: "600"
},
categoryBadgePromo: {
position: "absolute",
top: "12px",
right: "12px",
backgroundColor: "#ff3b30",
color: "white",
padding: "4px 10px",
borderRadius: "12px",
fontSize: "11px",
fontWeight: "600"
},
categoryLabel: {
fontSize: "17px",
fontWeight: "500",
color: "#1d1d1f"
},
header: {
backgroundColor: "rgba(255, 255, 255, 0.8)",
backdropFilter: "blur(20px)",
WebkitBackdropFilter: "blur(20px)",
padding: "16px 40px",
display: "flex",
justifyContent: "space-between",
alignItems: "center",
borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
position: "sticky",
top: 0,
zIndex: 100
},
logo: {
height: "40px",
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
fontSize: "12px",
fontWeight: "600",
minWidth: "20px",
textAlign: "center"
},
badgeNavContainer: {
backgroundColor: "rgba(255, 255, 255, 0.95)",
backdropFilter: "blur(10px)",
WebkitBackdropFilter: "blur(10px)",
borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
padding: "12px 20px"
},
badgeNav: {
display: "flex",
gap: "10px",
overflowX: "auto",
scrollBehavior: "smooth",
scrollbarWidth: "none",
msOverflowStyle: "none",
WebkitOverflowScrolling: "touch",
paddingBottom: "4px"
},
badge_nav: {
padding: "8px 18px",
border: "none",
borderRadius: "20px",
cursor: "pointer",
backgroundColor: "#f5f5f7",
color: "#1d1d1f",
fontSize: "13px",
fontWeight: "500",
transition: "all 0.2s ease",
whiteSpace: "nowrap",
letterSpacing: "0.2px"
},
badge_nav_active: {
backgroundColor: "#1d1d1f",
color: "white",
fontWeight: "600"
},
collectionHeader: {
textAlign: "center",
padding: "60px 40px 40px",
backgroundColor: "#ffffff"
},
collectionTitle: {
fontSize: "42px",
fontWeight: "300",
color: "#1d1d1f",
margin: "0 0 12px 0",
letterSpacing: "-0.5px"
},
collectionSubtitle: {
fontSize: "17px",
fontWeight: "300",
color: "#86868b",
margin: 0,
letterSpacing: "0.3px"
},
main: {
padding: "20px 40px 80px",
display: "grid",
gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
gap: "40px",
maxWidth: "1400px",
margin: "0 auto"
},
card: {
backgroundColor: "white",
borderRadius: "24px",
padding: "0",
boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
display: "flex",
flexDirection: "column",
overflow: "hidden",
cursor: "pointer"
},
cardHover: {
transform: "translateY(-8px)",
boxShadow: "0 12px 40px rgba(0,0,0,0.12)"
},
imageContainer: {
height: "360px",
backgroundColor: "#fafafa",
position: "relative",
display: "flex",
alignItems: "center",
justifyContent: "center",
overflow: "hidden"
},
image: {
maxHeight: "85%",
maxWidth: "85%",
objectFit: "contain",
mixBlendMode: "multiply",
transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
},
hoverOverlay: {
position: "absolute",
top: 0,
left: 0,
right: 0,
bottom: 0,
background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)",
display: "flex",
alignItems: "flex-end",
justifyContent: "center",
padding: "32px",
animation: "fadeIn 0.3s ease"
},
quickAddButton: {
padding: "14px 32px",
backgroundColor: "white",
color: "#1d1d1f",
border: "none",
borderRadius: "12px",
fontSize: "15px",
fontWeight: "600",
cursor: "pointer",
transition: "all 0.2s ease",
boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
},
quickAddButtonAdded: {
backgroundColor: "#34c759",
color: "white"
},
productInfo: {
padding: "24px",
textAlign: "center",
backgroundColor: "white"
},
productName: {
margin: "0 0 8px 0",
fontSize: "19px",
fontWeight: "500",
color: "#1d1d1f",
letterSpacing: "-0.2px"
},
productColor: {
margin: "0 0 6px 0",
fontSize: "15px",
color: "#6e6e73",
fontWeight: "300"
},
productDescription: {
margin: "0 0 4px 0",
fontSize: "13px",
color: "#86868b",
fontWeight: "300"
},
productRef: {
margin: 0,
fontSize: "13px",
color: "#86868b",
fontWeight: "300",
letterSpacing: "0.5px"
},
expandedControls: {
padding: "0 24px 24px",
backgroundColor: "white",
animation: "fadeIn 0.3s ease",
borderTop: "1px solid #f5f5f7"
},
sizeLabel: {
fontSize: "13px",
fontWeight: "500",
color: "#1d1d1f",
marginBottom: "8px",
display: "block",
textAlign: "center"
},
quantityLabel: {
fontSize: "13px",
fontWeight: "500",
color: "#1d1d1f",
marginBottom: "8px",
display: "block",
textAlign: "center"
},
sizeSelector: {
display: "flex",
gap: "10px",
justifyContent: "center",
marginBottom: "20px",
paddingTop: "20px"
},
sizeButton: {
width: "44px",
height: "44px",
border: "1px solid #d2d2d7",
borderRadius: "10px",
cursor: "pointer",
backgroundColor: "white",
fontSize: "14px",
fontWeight: "500",
color: "#1d1d1f",
transition: "all 0.2s ease"
},
sizeButtonActive: {
backgroundColor: "#1d1d1f",
color: "white",
borderColor: "#1d1d1f"
},
quantityControl: {
marginBottom: "16px"
},
quantityButtons: {
display: "flex",
alignItems: "center",
justifyContent: "center",
gap: "16px"
},
qtyButton: {
width: "36px",
height: "36px",
border: "1px solid #d2d2d7",
borderRadius: "50%",
cursor: "pointer",
backgroundColor: "white",
fontSize: "18px",
color: "#1d1d1f",
display: "flex",
alignItems: "center",
justifyContent: "center"
},
quantity: {
fontSize: "17px",
fontWeight: "600",
minWidth: "30px",
textAlign: "center"
},
commentaire: {
width: "100%",
padding: "12px",
border: "1px solid #e5e5e7",
borderRadius: "10px",
fontSize: "13px",
fontFamily: "inherit",
resize: "none",
boxSizing: "border-box",
color: "#1d1d1f",
transition: "border-color 0.2s ease"
},
footer: {
backgroundColor: "white",
padding: "40px 20px",
textAlign: "center",
borderTop: "1px solid rgba(0, 0, 0, 0.06)"
},
footerText: {
margin: 0,
fontSize: "13px",
color: "#86868b",
fontWeight: "300"
},
sideCartOverlay: {
position: "fixed",
top: 0,
left: 0,
right: 0,
bottom: 0,
backgroundColor: "rgba(0,0,0,0.4)",
zIndex: 1000,
animation: "fadeIn 0.3s ease"
},
sideCart: {
position: "fixed",
top: 0,
right: 0,
bottom: 0,
width: "100%",
maxWidth: "450px",
backgroundColor: "white",
boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
overflowY: "auto",
padding: "32px",
animation: "slideInRight 0.3s ease",
display: "flex",
flexDirection: "column"
},
modalHeader: {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
marginBottom: "24px"
},
modalTitle: {
margin: 0,
fontSize: "24px",
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
padding: "40px 0"
},
cartItems: {
marginBottom: "24px"
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
backgroundColor: "#f5f5f7"
},
cartItemName: {
margin: "0 0 4px 0",
fontSize: "15px",
fontWeight: "500",
color: "#1d1d1f"
},
cartItemDetails: {
margin: "0 0 4px 0",
fontSize: "14px",
color: "#6e6e73"
},
cartItemComment: {
margin: "4px 0 0 0",
fontSize: "13px",
color: "#86868b",
fontStyle: "italic"
},
deleteButton: {
background: "none",
border: "none",
fontSize: "28px",
cursor: "pointer",
color: "#86868b",
padding: "0 8px"
},
form: {
display: "flex",
flexDirection: "column",
gap: "12px"
},
input: {
width: "100%",
padding: "14px",
border: "1px solid #d2d2d7",
borderRadius: "10px",
fontSize: "15px",
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
padding: "20px"
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
fontSize: "24px",
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
