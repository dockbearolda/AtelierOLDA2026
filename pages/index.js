import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import emailjs from "@emailjs/browser";

const MUGS_DATA = {
nouveautes: [
{ id: 101, reference: "SM 01", image: "/images/mugs/nouveaute1.jpg", nom: "Support Mobile Acrylique", couleur: "" }
],
"tasse-ceramique-fuck": [
{ id: 11, reference: "TCF 01", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
{ id: 12, reference: "TCF 02", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
{ id: 13, reference: "TCF 03", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
{ id: 14, reference: "TCF 04", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
{ id: 15, reference: "TCF 05", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
{ id: 16, reference: "TCF 06", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
{ id: 17, reference: "TCF 07", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
{ id: 18, reference: "TCF 08", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
{ id: 19, reference: "TCF 09", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
{ id: 20, reference: "TCF 10", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
{ id: 21, reference: "TCF 11", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
{ id: 22, reference: "TCF 12", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
{ id: 23, reference: "TCF 13", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
{ id: 24, reference: "TCF 14", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
{ id: 25, reference: "TCF 15", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
{ id: 26, reference: "TCF 16", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" },
{ id: 27, reference: "TCF 17", image: "/images/mugs/Fuckblancnoir.JPG", nom: "Tasse Ceramique Fuck", couleur: "Blanc & Noir" }
],
"tasse-ceramique": [
{ id: 1, reference: "TC 01", image: "/images/mugs/roseblanc.jpg", nom: "Tasse Ceramique OLDA", couleur: "Rose & Blanc" },
{ id: 2, reference: "TC 02", image: "/images/mugs/rougeblanc.jpg", nom: "Tasse Ceramique OLDA", couleur: "Rouge & Blanc" },
{ id: 3, reference: "TC 03", image: "/images/mugs/orangeblanc.jpg", nom: "Tasse Ceramique OLDA", couleur: "Orange & Blanc" },
{ id: 4, reference: "TC 04", image: "/images/mugs/vertblanc.jpg", nom: "Tasse Ceramique OLDA", couleur: "Vert & Blanc" },
{ id: 5, reference: "TC 05", image: "/images/mugs/noirblanc.jpg", nom: "Tasse Ceramique OLDA", couleur: "Noir & Blanc" },
{ id: 6, reference: "TC 06", image: "/images/mugs/roseblanc.jpg", nom: "Tasse Ceramique OLDA", couleur: "Rose & Blanc" },
{ id: 7, reference: "TC 07", image: "/images/mugs/rougeblanc.jpg", nom: "Tasse Ceramique OLDA", couleur: "Rouge & Blanc" },
{ id: 8, reference: "TC 08", image: "/images/mugs/orangeblanc.jpg", nom: "Tasse Ceramique OLDA", couleur: "Orange & Blanc" },
{ id: 9, reference: "TC 09", image: "/images/mugs/vertblanc.jpg", nom: "Tasse Ceramique OLDA", couleur: "Vert & Blanc" },
{ id: 10, reference: "TC 10", image: "/images/mugs/noirblanc.jpg", nom: "Tasse Ceramique OLDA", couleur: "Noir & Blanc" },
{ id: 31, reference: "TC 11", image: "/images/mugs/roseblanc.jpg", nom: "Tasse Ceramique OLDA", couleur: "Rose & Blanc" },
{ id: 32, reference: "TC 12", image: "/images/mugs/rougeblanc.jpg", nom: "Tasse Ceramique OLDA", couleur: "Rouge & Blanc" },
{ id: 33, reference: "TC 13", image: "/images/mugs/orangeblanc.jpg", nom: "Tasse Ceramique OLDA", couleur: "Orange & Blanc" }
],
"tasse-metal": [],
tshirt: [
{ id: 41, reference: "TS-001", image: "/images/mugs/tshirtns300bleu.jpg", nom: "T-shirt Unisexe OLDA", couleur: "Bleu Saphir" },
{ id: 42, reference: "TS-002", image: "/images/tshirt/ts-noir.jpg", nom: "T-shirt Unisexe OLDA", couleur: "Noir" },
{ id: 43, reference: "TS-003", image: "/images/tshirt/ts-blanc.jpg", nom: "T-shirt Unisexe OLDA", couleur: "Blanc" },
{ id: 44, reference: "TS-004", image: "/images/tshirt/ts-rose.jpg", nom: "T-shirt Unisexe OLDA", couleur: "Rose Pâle" },
{ id: 45, reference: "TS-005", image: "/images/tshirt/ts-vert.jpg", nom: "T-shirt Unisexe OLDA", couleur: "Vert Sauge" },
{ id: 46, reference: "TS-006", image: "/images/tshirt/ts-beige.jpg", nom: "T-shirt Unisexe OLDA", couleur: "Beige" }
],
"art-de-la-table": [
{ id: 301, reference: "ADT-001", image: "/images/table/assiette-ceramique-blanche.jpg", nom: "Assiette Céramique", couleur: "Blanc Crème" },
{ id: 302, reference: "ADT-002", image: "/images/table/assiette-ceramique-rose.jpg", nom: "Assiette Céramique", couleur: "Rose Pâle" },
{ id: 303, reference: "ADT-003", image: "/images/table/assiette-ceramique-vert.jpg", nom: "Assiette Céramique", couleur: "Vert Sauge" },
{ id: 304, reference: "ADT-004", image: "/images/table/bol-ceramique-blanc.jpg", nom: "Bol Céramique", couleur: "Blanc Crème" },
{ id: 305, reference: "ADT-005", image: "/images/table/bol-ceramique-bleu.jpg", nom: "Bol Céramique", couleur: "Bleu Pastel" },
{ id: 306, reference: "ADT-006", image: "/images/table/plateau-bois.jpg", nom: "Plateau Bois Artisanal", couleur: "Bois Naturel" },
{ id: 307, reference: "ADT-007", image: "/images/table/set-table-lin.jpg", nom: "Set de Table Lin", couleur: "Lin Naturel" },
{ id: 308, reference: "ADT-008", image: "/images/table/serviettes-tissu.jpg", nom: "Serviettes en Tissu (x4)", couleur: "Beige & Blanc" }
],
"accessoires-goodies": [
{ id: 401, reference: "AG-001", image: "/images/mugs/decapsuleur.jpg", nom: "Décapsuleur Bois", couleur: "" },
{ id: 402, reference: "AG-002", image: "/images/goodies/porte-cles-cuir.jpg", nom: "Porte-clés Cuir", couleur: "Camel" },
{ id: 403, reference: "AG-003", image: "/images/goodies/porte-cles-cuir-noir.jpg", nom: "Porte-clés Cuir", couleur: "Noir" },
{ id: 404, reference: "AG-004", image: "/images/goodies/tote-bag-toile.jpg", nom: "Tote Bag Toile OLDA", couleur: "Écru" },
{ id: 405, reference: "AG-005", image: "/images/goodies/carnet-notes.jpg", nom: "Carnet de Notes", couleur: "Kraft" },
{ id: 406, reference: "AG-006", image: "/images/mugs/nouveaute1.jpg", nom: "Support Mobile Acrylique", couleur: "" },
{ id: 407, reference: "AG-007", image: "/images/goodies/bougie-artisanale.jpg", nom: "Bougie Artisanale", couleur: "Vanille & Bois" },
{ id: 408, reference: "AG-008", image: "/images/goodies/dessous-verre.jpg", nom: "Dessous de Verre (x4)", couleur: "Bois & Liège" }
],
offres: [
{ id: 201, reference: "PROMO-001", image: "/images/mugs/decapsuleur.jpg", nom: "Décapsuleur Bois", couleur: "" },
{ id: 202, reference: "PROMO-002", image: "/images/mugs/roseblanc.jpg", nom: "Tasse Céramique OLDA", couleur: "Rose & Blanc" }
]
};

const tabs = [
{ key: "nouveautes", label: "Nouveautés" },
{
  key: "tasses",
  label: "Tasses",
  hasDropdown: true,
  subcategories: [
    { key: "tasse-ceramique-fuck", label: "Tasse Céramique Fuck" },
    { key: "tasse-ceramique", label: "Tasse Céramique" },
    { key: "tasse-metal", label: "Tasse Métal & Bois" }
  ]
},
{ key: "tshirt", label: "T-Shirt" },
{ key: "art-de-la-table", label: "Art de la Table" },
{ key: "accessoires-goodies", label: "Accessoires & Goodies" },
{ key: "offres", label: "Offres Promotionnelles" }
];

export default function OLDAStore() {
const [showHomepage, setShowHomepage] = useState(true);
const [activeTab, setActiveTab] = useState("tasse-ceramique");
const [openDropdown, setOpenDropdown] = useState(null);
const [quantites, setQuantites] = useState({});
const [commentaires, setCommentaires] = useState({});
const [panier, setPanier] = useState([]);
const [cartOpen, setCartOpen] = useState(false);
const [clientInfo, setClientInfo] = useState({ nom: "", email: "" });
const [orderSent, setOrderSent] = useState(false);
const [sending, setSending] = useState(false);
const [recentlyAdded, setRecentlyAdded] = useState({});
const [isMounted, setIsMounted] = useState(false);

var navigateToCategory = function(category) {
setActiveTab(category);
setShowHomepage(false);
};

useEffect(function() {
emailjs.init("Y9NKwhNvCNtb_SRry");
setIsMounted(true);
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
setPanier(function(prev) {
var existant = prev.find(function(i) { return i.id === p.id; });
if (existant) {
return prev.map(function(i) { return i.id === p.id ? Object.assign({}, i, { quantite: i.quantite + qte, commentaire: commentaire }) : i; });
}
return prev.concat([Object.assign({}, p, { quantite: qte, commentaire: commentaire })]);
});

// Animation "Ajouté ✓"
setRecentlyAdded(Object.assign({}, recentlyAdded, { [p.id]: true }));
setTimeout(function() {
setRecentlyAdded(function(prev) {
var newState = Object.assign({}, prev);
delete newState[p.id];
return newState;
});
}, 2000);
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
var isActive = activeTab === tabKey;

// Pour l'onglet Tasses, vérifier si une sous-catégorie est active
if (tabKey === "tasses") {
  var tasseSubcats = ["tasse-ceramique-fuck", "tasse-ceramique", "tasse-metal"];
  isActive = tasseSubcats.indexOf(activeTab) !== -1;
}

if (isActive) {
  if (tabKey === "nouveautes") {
    return Object.assign({}, baseStyle, styles.tabActive, { backgroundColor: "#8B9D83", borderColor: "#8B9D83", color: "white" });
  } else if (tabKey === "offres") {
    return Object.assign({}, baseStyle, styles.tabActive, { backgroundColor: "#C4A68A", borderColor: "#C4A68A", color: "white" });
  } else if (tabKey === "tshirt") {
    return Object.assign({}, baseStyle, styles.tabActive, { backgroundColor: "#9B8BAA", borderColor: "#9B8BAA", color: "white" });
  } else if (tabKey === "art-de-la-table") {
    return Object.assign({}, baseStyle, styles.tabActive, { backgroundColor: "#B8A892", borderColor: "#B8A892", color: "white" });
  } else if (tabKey === "accessoires-goodies") {
    return Object.assign({}, baseStyle, styles.tabActive, { backgroundColor: "#D4A895", borderColor: "#D4A895", color: "white" });
  }
  return Object.assign({}, baseStyle, styles.tabActive);
} else {
  if (tabKey === "nouveautes") {
    return Object.assign({}, baseStyle, { backgroundColor: "#D4E3D0", borderColor: "#D4E3D0", color: "#1d1d1f" });
  } else if (tabKey === "offres") {
    return Object.assign({}, baseStyle, { backgroundColor: "#F5E8E0", borderColor: "#F5E8E0", color: "#1d1d1f" });
  } else if (tabKey === "tshirt") {
    return Object.assign({}, baseStyle, { backgroundColor: "#E8E3F0", borderColor: "#E8E3F0", color: "#1d1d1f" });
  } else if (tabKey === "art-de-la-table") {
    return Object.assign({}, baseStyle, { backgroundColor: "#F0EBE3", borderColor: "#F0EBE3", color: "#1d1d1f" });
  } else if (tabKey === "accessoires-goodies") {
    return Object.assign({}, baseStyle, { backgroundColor: "#FFE8DC", borderColor: "#FFE8DC", color: "#1d1d1f" });
  }
  return baseStyle;
}
};

return React.createElement("div", { style: styles.container },
React.createElement("header", { style: styles.header },
React.createElement("img", {
src: "/images/mugs/logo.jpeg",
alt: "OLDA",
style: styles.logo,
onClick: function() { setShowHomepage(true); }
}),
React.createElement("button", { onClick: function() { setCartOpen(true); }, style: styles.cartButton },
React.createElement("svg", { width: "22", height: "26", viewBox: "0 0 22 26", fill: "none", stroke: "#86868b", strokeWidth: "1.5" },
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
var categoryStyle = styles.categoryCard;
if (tab.key === "nouveautes") categoryStyle = Object.assign({}, styles.categoryCard, styles.categoryCardNew);
else if (tab.key === "offres") categoryStyle = Object.assign({}, styles.categoryCard, styles.categoryCardPromo);
else if (tab.key === "tshirt") categoryStyle = Object.assign({}, styles.categoryCard, styles.categoryCardTshirt);
else if (tab.key === "art-de-la-table") categoryStyle = Object.assign({}, styles.categoryCard, styles.categoryCardTable);
else if (tab.key === "accessoires-goodies") categoryStyle = Object.assign({}, styles.categoryCard, styles.categoryCardAccessoires);

return React.createElement("button", {
key: tab.key,
onClick: function() { navigateToCategory(tab.key); },
style: categoryStyle
},
tab.key === "nouveautes" && React.createElement("span", { style: styles.categoryBadge }, "Nouveau"),
tab.key === "offres" && React.createElement("span", { style: styles.categoryBadgePromo }, "Promo"),
React.createElement("span", { style: styles.categoryLabel }, tab.label)
);
})
)
)
) : React.createElement(React.Fragment, null,

React.createElement("div", { style: styles.navContainer },
  React.createElement("nav", { style: styles.nav },
    tabs.map(function(tab) {
      if (tab.hasDropdown) {
        return React.createElement("div", {
          key: tab.key,
          style: styles.dropdownContainer,
          onMouseEnter: function() { setOpenDropdown(tab.key); },
          onMouseLeave: function() { setOpenDropdown(null); }
        },
          React.createElement("button", {
            onClick: function() {
              if (openDropdown === tab.key) {
                setOpenDropdown(null);
              } else {
                setOpenDropdown(tab.key);
              }
            },
            style: getTabStyle(tab.key)
          },
            tab.label,
            React.createElement("span", { style: styles.dropdownArrow }, " ▼")
          ),
          openDropdown === tab.key && React.createElement("ul", { style: styles.dropdownMenu },
            tab.subcategories.map(function(subcat) {
              return React.createElement("li", {
                key: subcat.key,
                style: styles.dropdownItemWrapper
              },
                React.createElement("button", {
                  onClick: function() {
                    setActiveTab(subcat.key);
                    setShowHomepage(false);
                    setOpenDropdown(null);
                  },
                  style: activeTab === subcat.key ?
                    Object.assign({}, styles.dropdownItem, styles.dropdownItemActive) :
                    styles.dropdownItem
                }, subcat.label)
              );
            })
          )
        );
      } else {
        return React.createElement("button", {
          key: tab.key,
          onClick: function() {
            setActiveTab(tab.key);
            setShowHomepage(false);
          },
          style: getTabStyle(tab.key)
        }, tab.label);
      }
    })
  )
),

React.createElement("main", { style: styles.main },
  MUGS_DATA[activeTab] && MUGS_DATA[activeTab].map(function(product) {
    return React.createElement("div", { key: product.id, style: styles.card },
      React.createElement("div", { style: styles.imageContainer },
        React.createElement("img", {
          src: product.image,
          alt: product.nom,
          style: styles.image,
          onError: function(e) { e.target.style.display = "none"; }
        })
      ),
      React.createElement("h3", { style: styles.productName }, product.nom),
      product.couleur && React.createElement("p", { style: styles.productColor }, product.couleur),
      React.createElement("p", { style: styles.productRef }, "Ref: " + product.reference),

      React.createElement("div", { style: styles.quantityControl },
        React.createElement("label", { style: styles.quantityLabel }, "Quantité"),
        React.createElement("select", {
          value: getQte(product.id),
          onChange: function(e) { setQuantites(Object.assign({}, quantites, { [product.id]: parseInt(e.target.value) })); },
          style: styles.quantitySelect
        }, Array.from({ length: 98 }, function(_, i) { return i + 3; }).map(function(num) {
          return React.createElement("option", { key: num, value: num }, num);
        }))
      ),

      React.createElement("textarea", {
        placeholder: "Note (optionnel)",
        value: getCommentaire(product.id),
        onChange: function(e) { updateCommentaire(product.id, e.target.value); },
        style: styles.commentaire,
        rows: "2"
      }),

      React.createElement("button", {
        onClick: function() { ajouterAuPanier(product); },
        style: recentlyAdded[product.id] ?
          Object.assign({}, styles.addButton, styles.addButtonAdded) :
          styles.addButton
      }, recentlyAdded[product.id] ? "Ajouté ✓" : "Ajouter")
    );
  })
)
),

cartOpen && isMounted && ReactDOM.createPortal(
  React.createElement("div", { style: styles.modalOverlay, onClick: function() { setCartOpen(false); } },
    React.createElement("div", { style: styles.modal, onClick: function(e) { e.stopPropagation(); } },
    orderSent ? React.createElement("div", { style: styles.successContainer },
      React.createElement("div", { style: styles.successIcon }, "\u2713"),
      React.createElement("h2", { style: styles.successTitle }, "Commande envoyée"),
      React.createElement("p", { style: styles.successText }, "L'Atelier OLDA vous remercie pour votre confiance."),
      React.createElement("button", { onClick: fermerEtReset, style: styles.closeButton }, "Fermer")
    ) : React.createElement(React.Fragment, null,
      React.createElement("div", { style: styles.modalHeader },
        React.createElement("h2", { style: styles.modalTitle }, "Sélection"),
        React.createElement("button", { onClick: function() { setCartOpen(false); }, style: styles.closeIcon }, "\u00d7")
      ),

      panier.length === 0 ? React.createElement("p", { style: styles.emptyCart }, "Votre sélection est vide") : React.createElement(React.Fragment, null,
        React.createElement("div", { style: styles.cartItems },
          panier.map(function(item) {
            return React.createElement("div", { key: item.id, style: styles.cartItem },
              React.createElement("img", { src: item.image, alt: item.nom, style: styles.cartItemImage }),
              React.createElement("div", { style: { flex: 1 } },
                React.createElement("p", { style: styles.cartItemName }, item.nom),
                React.createElement("p", { style: styles.cartItemDetails }, item.couleur ? item.couleur + " x " + item.quantite : "x " + item.quantite),
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
  ),
  document.body
),

React.createElement("footer", { style: styles.footer },
  React.createElement("p", { style: styles.footerText }, "Atelier OLDA — 1 rue Opale, Route de l'Espérance, Grand-Case, Saint-Martin"),
  React.createElement("p", { style: styles.footerContact }, "+590 690 47 97 88 | atelierolda@gmail.com")
)

);
}

var styles = {
container: {
fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
minHeight: "100vh",
backgroundColor: "#FAF7F2",
overflow: "visible",
position: "relative",
WebkitTapHighlightColor: "transparent"
},
homepage: {
minHeight: "calc(100vh - 73px)",
display: "flex",
alignItems: "center",
justifyContent: "center",
backgroundColor: "#FAF7F2"
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
backgroundColor: "#F5F0E8",
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
backgroundColor: "#D4E3D0"
},
categoryCardPromo: {
backgroundColor: "#F5E8E0"
},
categoryCardTshirt: {
backgroundColor: "#E8E3F0"
},
categoryCardTable: {
backgroundColor: "#F0EBE3"
},
categoryCardAccessoires: {
backgroundColor: "#FFE8DC"
},
categoryBadge: {
position: "absolute",
top: "12px",
right: "12px",
backgroundColor: "#8B9D83",
color: "white",
padding: "4px 10px",
borderRadius: "12px",
fontSize: "11px",
fontWeight: "500",
letterSpacing: "0.05em"
},
categoryBadgePromo: {
position: "absolute",
top: "12px",
right: "12px",
backgroundColor: "#C4A68A",
color: "white",
padding: "4px 10px",
borderRadius: "12px",
fontSize: "11px",
fontWeight: "500",
letterSpacing: "0.05em"
},
categoryLabel: {
fontSize: "17px",
fontWeight: "500",
color: "#1d1d1f"
},
header: {
backgroundColor: "white",
padding: "20px 40px",
display: "flex",
justifyContent: "space-between",
alignItems: "center",
borderBottom: "1px solid #E5DDD0",
position: "sticky",
top: 0,
zIndex: 9999,
overflow: "visible",
backdropFilter: "blur(10px)"
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
backgroundColor: "#8B9D83",
color: "white",
borderRadius: "10px",
padding: "3px 7px",
fontSize: "11px",
fontWeight: "500",
minWidth: "20px",
textAlign: "center",
letterSpacing: "0.01em"
},
navContainer: {
position: "sticky",
top: "80px",
backgroundColor: "white",
borderBottom: "1px solid #E5DDD0",
zIndex: 9998,
boxShadow: "0 1px 6px rgba(0, 0, 0, 0.03)",
transition: "box-shadow 0.3s ease",
overflow: "visible"
},
nav: {
backgroundColor: "white",
padding: "18px 40px",
display: "flex",
gap: "14px",
overflowX: "auto",
overflowY: "visible",
scrollBehavior: "smooth",
scrollbarWidth: "none",
msOverflowStyle: "none",
position: "relative",
zIndex: 9997,
overflow: "visible"
},
tab: {
padding: "11px 22px",
border: "1px solid #E5DDD0",
borderRadius: "20px",
cursor: "pointer",
backgroundColor: "transparent",
color: "#1d1d1f",
fontSize: "13px",
fontWeight: "400",
transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
whiteSpace: "nowrap",
transform: "scale(1)",
boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
letterSpacing: "0.02em"
},
tabActive: {
backgroundColor: "#8B9D83",
color: "white",
borderColor: "#8B9D83",
transform: "scale(1.02)",
boxShadow: "0 2px 8px rgba(139, 157, 131, 0.2)",
fontWeight: "500"
},
dropdownContainer: {
position: "relative",
display: "inline-block",
overflow: "visible",
pointerEvents: "auto"
},
dropdownArrow: {
fontSize: "10px",
marginLeft: "4px",
opacity: 0.7,
transition: "transform 0.3s ease"
},
dropdownMenu: {
position: "absolute",
top: "calc(100% + 12px)",
left: 0,
backgroundColor: "#ffffff",
borderRadius: "16px",
boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0, 0, 0, 0.04)",
padding: "12px 0",
minWidth: "240px",
zIndex: 99999,
animation: "dropdownFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
border: "1px solid #f0f0f0",
pointerEvents: "auto",
listStyle: "none",
margin: 0
},
dropdownItemWrapper: {
listStyle: "none",
margin: 0,
padding: 0
},
dropdownItem: {
width: "100%",
padding: "14px 24px",
border: "none",
backgroundColor: "transparent",
color: "#1d1d1f",
fontSize: "15px",
fontWeight: "400",
cursor: "pointer",
transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
textAlign: "left",
whiteSpace: "nowrap",
display: "block",
pointerEvents: "auto",
letterSpacing: "0.01em",
lineHeight: "1.4"
},
dropdownItemActive: {
backgroundColor: "#fafafa",
color: "#0071e3",
fontWeight: "500"
},
main: {
padding: "48px 40px",
display: "grid",
gridTemplateColumns: "repeat(2, 1fr)",
gap: "32px",
maxWidth: "1000px",
margin: "0 auto"
},
card: {
backgroundColor: "white",
borderRadius: "12px",
padding: "28px",
boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
transition: "transform 0.3s ease, box-shadow 0.3s ease",
position: "relative",
zIndex: 1,
display: "flex",
flexDirection: "column",
minHeight: "100%"
},
imageContainer: {
height: "220px",
backgroundColor: "#FDFCFA",
borderRadius: "8px",
marginBottom: "20px",
display: "flex",
alignItems: "center",
justifyContent: "center",
overflow: "hidden",
border: "1px solid #F5F0E8"
},
image: {
maxHeight: "100%",
maxWidth: "100%",
objectFit: "contain",
mixBlendMode: "multiply"
},
productName: {
margin: "0 0 6px 0",
fontSize: "16px",
fontWeight: "500",
color: "#1d1d1f",
letterSpacing: "0.01em"
},
productColor: {
margin: "0 0 6px 0",
fontSize: "13px",
color: "#6e6e73",
fontWeight: "300"
},
productRef: {
margin: "0 0 20px 0",
fontSize: "11px",
color: "#86868b",
letterSpacing: "0.05em",
textTransform: "uppercase"
},
quantityControl: {
display: "flex",
flexDirection: "column",
alignItems: "flex-start",
gap: "8px",
marginBottom: "16px"
},
quantityLabel: {
fontSize: "12px",
color: "#6e6e73",
fontWeight: "400",
letterSpacing: "0.05em",
textTransform: "uppercase"
},
quantitySelect: {
width: "100%",
padding: "12px 14px",
border: "1px solid #D4C4B0",
borderRadius: "8px",
fontSize: "15px",
fontFamily: "inherit",
backgroundColor: "white",
color: "#1d1d1f",
cursor: "pointer",
appearance: "none",
backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236e6e73' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
backgroundRepeat: "no-repeat",
backgroundPosition: "right 14px center",
paddingRight: "40px",
transition: "all 0.2s ease",
WebkitAppearance: "none",
MozAppearance: "none"
},
commentaire: {
width: "100%",
padding: "12px 14px",
border: "1px solid #D4C4B0",
borderRadius: "8px",
fontSize: "13px",
fontFamily: "inherit",
resize: "none",
marginBottom: "16px",
boxSizing: "border-box",
color: "#1d1d1f",
backgroundColor: "white",
transition: "border-color 0.2s ease"
},
addButton: {
width: "100%",
padding: "14px 16px",
backgroundColor: "transparent",
color: "#1d1d1f",
border: "1px solid #D4C4B0",
borderRadius: "8px",
cursor: "pointer",
fontSize: "13px",
fontWeight: "400",
letterSpacing: "0.08em",
textTransform: "uppercase",
transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
boxShadow: "none",
transform: "scale(1)"
},
addButtonAdded: {
backgroundColor: "#8B9D83",
color: "white",
borderColor: "#8B9D83",
transform: "scale(1)",
boxShadow: "none"
},
modalOverlay: {
position: "fixed",
top: 0,
left: 0,
right: 0,
bottom: 0,
backgroundColor: "rgba(0,0,0,0.4)",
display: "flex",
justifyContent: "center",
alignItems: "center",
zIndex: 999999,
padding: "20px",
animation: "fadeIn 0.3s ease-in-out"
},
modal: {
backgroundColor: "white",
borderRadius: "16px",
padding: "36px",
maxWidth: "500px",
width: "100%",
maxHeight: "80vh",
overflow: "auto",
animation: "slideDown 0.3s ease-in-out",
boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)"
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
border: "1px solid #D4C4B0",
borderRadius: "8px",
fontSize: "15px",
boxSizing: "border-box",
fontFamily: "inherit",
backgroundColor: "white",
transition: "border-color 0.2s ease"
},
submitButton: {
width: "100%",
padding: "16px",
backgroundColor: "#8B9D83",
color: "white",
border: "none",
borderRadius: "8px",
cursor: "pointer",
fontSize: "14px",
fontWeight: "500",
marginTop: "8px",
letterSpacing: "0.05em",
textTransform: "uppercase",
transition: "all 0.3s ease"
},
submitButtonDisabled: {
backgroundColor: "#C4C4C4",
cursor: "not-allowed",
opacity: 0.6
},
successContainer: {
textAlign: "center",
padding: "20px"
},
successIcon: {
width: "64px",
height: "64px",
backgroundColor: "#8B9D83",
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
fontWeight: "500",
color: "#1d1d1f",
margin: "0 0 8px 0",
letterSpacing: "0.01em"
},
successText: {
fontSize: "15px",
color: "#6e6e73",
margin: "0 0 4px 0",
fontWeight: "300"
},
successEmail: {
fontSize: "15px",
color: "#6e6e73",
margin: "0 0 24px 0"
},
closeButton: {
padding: "16px 40px",
backgroundColor: "#8B9D83",
color: "white",
border: "none",
borderRadius: "8px",
cursor: "pointer",
fontSize: "14px",
fontWeight: "500",
letterSpacing: "0.05em",
textTransform: "uppercase",
transition: "all 0.3s ease"
},
footer: {
backgroundColor: "#FAF7F2",
padding: "48px 40px",
textAlign: "center",
borderTop: "1px solid #E5DDD0",
marginTop: "80px"
},
footerText: {
margin: "0 0 8px 0",
fontSize: "12px",
color: "#6e6e73",
fontWeight: "300",
letterSpacing: "0.08em",
lineHeight: "1.8"
},
footerContact: {
margin: 0,
fontSize: "12px",
color: "#86868b",
fontWeight: "300",
letterSpacing: "0.08em"
}
};
