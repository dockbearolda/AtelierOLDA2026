import React, { useState, useEffect } from “react”;
import emailjs from “@emailjs/browser”;

const MUGS_DATA = {
nouveautes: [
{ id: 101, reference: “SM 01”, image: “/images/mugs/nouveaute1.jpg”, nom: “Support Mobile Acrylique”, couleur: “” }
],
olda: [
{ id: 1, reference: “TC 01”, image: “/images/mugs/roseblanc.jpg”, nom: “Tasse Ceramique”, couleur: “Rose & Blanc” },
{ id: 2, reference: “TC 02”, image: “/images/mugs/rougeblanc.jpg”, nom: “Tasse Ceramique”, couleur: “Rouge & Blanc” },
{ id: 3, reference: “TC 03”, image: “/images/mugs/orangeblanc.jpg”, nom: “Tasse Ceramique”, couleur: “Orange & Blanc” },
{ id: 4, reference: “TC 04”, image: “/images/mugs/vertblanc.jpg”, nom: “Tasse Ceramique”, couleur: “Vert & Blanc” },
{ id: 5, reference: “TC 05”, image: “/images/mugs/noirblanc.jpg”, nom: “Tasse Ceramique”, couleur: “Noir & Blanc” }
],
fuck: [
{ id: 11, reference: “TF 01”, image: “/images/mugs/Fuckblancnoir.JPG”, nom: “Tasse Ceramique Fuck”, couleur: “Blanc & Noir” }
],
tshirt: [
{ id: 21, reference: “H-001”, image: “/images/mugs/tshirt.jpg”, nom: “T-shirt Homme Oversize”, couleur: “Noir” }
],
offres: [
{ id: 201, reference: “DB-001”, image: “/images/mugs/decapsuleur.jpg”, nom: “Decapsuleur Bois”, couleur: “” }
]
};

const tabs = [
{ key: “nouveautes”, label: “Nouveautes” },
{ key: “olda”, label: “Tasse Ceramique OLDA” },
{ key: “fuck”, label: “Tasse Ceramique Fuck” },
{ key: “tshirt”, label: “T-Shirt” },
{ key: “offres”, label: “Offres Promotionnelles” }
];

export default function OLDAStore() {
const [activeTab, setActiveTab] = useState(“olda”);
const [quantites, setQuantites] = useState({});
const [commentaires, setCommentaires] = useState({});
const [panier, setPanier] = useState([]);
const [cartOpen, setCartOpen] = useState(false);
const [clientInfo, setClientInfo] = useState({ nom: “”, email: “” });
const [orderSent, setOrderSent] = useState(false);
const [sending, setSending] = useState(false);

useEffect(function() {
emailjs.init(“Y9NKwhNvCNtb_SRry”);
}, []);

var getQte = function(id) { return quantites[id] || 3; };
var getCommentaire = function(id) { return commentaires[id] || “”; };

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
};

var supprimerDuPanier = function(id) {
setPanier(function(prev) { return prev.filter(function(item) { return item.id !== id; }); });
};

var envoyerCommande = async function() {
if (!clientInfo.nom || !clientInfo.email) {
alert(“Merci de remplir tous les champs”);
return;
}

```
if (panier.length === 0) {
  alert("Votre panier est vide");
  return;
}

setSending(true);

var commandeHTML = "";
panier.forEach(function(item) {
  var productName = item.couleur ? item.nom + " " + item.couleur : item.nom;
  commandeHTML += "<div class=\"product-row\"><div class=\"product-name\">" + productName + "</div><div class=\"product-qty\">" + item.quantite + "</div><div class=\"product-check\"><div class=\"checkbox\"></div></div></div>";
});

var now = new Date();
var dateStr = now.toLocaleDateString("fr-FR", { 
  weekday: "long", 
  year: "numeric", 
  month: "long", 
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit"
});

var templateParams = {
  client_nom: clientInfo.nom,
  client_email: clientInfo.email,
  order_date: dateStr,
  commande: commandeHTML
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
```

};

var fermerEtReset = function() {
setCartOpen(false);
setOrderSent(false);
setPanier([]);
setClientInfo({ nom: “”, email: “” });
};

var totalArticles = panier.reduce(function(sum, item) { return sum + item.quantite; }, 0);

var getTabStyle = function(tabKey) {
var baseStyle = Object.assign({}, styles.tab);
if (activeTab === tabKey) {
if (tabKey === “nouveautes”) {
return Object.assign({}, baseStyle, styles.tabActive, { backgroundColor: “#0071e3”, color: “white” });
} else if (tabKey === “offres”) {
return Object.assign({}, baseStyle, styles.tabActive, { backgroundColor: “#ff3b30”, color: “white” });
}
return Object.assign({}, baseStyle, styles.tabActive);
} else {
if (tabKey === “nouveautes”) {
return Object.assign({}, baseStyle, { backgroundColor: “#e8f2ff”, color: “#0071e3” });
} else if (tabKey === “offres”) {
return Object.assign({}, baseStyle, { backgroundColor: “#ffe5e5”, color: “#ff3b30” });
}
return baseStyle;
}
};

return React.createElement(“div”, { style: styles.container },
React.createElement(“header”, { style: styles.header },
React.createElement(“img”, { src: “/images/mugs/logo.jpeg”, alt: “OLDA”, style: styles.logo }),
React.createElement(“button”, { onClick: function() { setCartOpen(true); }, style: styles.cartButton },
React.createElement(“svg”, { width: “22”, height: “26”, viewBox: “0 0 22 26”, fill: “none”, stroke: “#86868b”, strokeWidth: “1.5” },
React.createElement(“path”, { d: “M4 7h14a2 2 0 012 2v12a3 3 0 01-3 3H5a3 3 0 01-3-3V9a2 2 0 012-2z” }),
React.createElement(“path”, { d: “M7 7V5a4 4 0 118 0v2” })
),
totalArticles > 0 && React.createElement(“span”, { style: styles.badge }, totalArticles)
)
),

```
React.createElement("nav", { style: styles.nav },
  tabs.map(function(tab) {
    return React.createElement("button", {
      key: tab.key,
      onClick: function() { setActiveTab(tab.key); },
      style: getTabStyle(tab.key)
    }, tab.label);
  })
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
        React.createElement("button", { onClick: function() { ajuster(product.id, -1); }, style: styles.qtyButton }, "-"),
        React.createElement("span", { style: styles.quantity }, getQte(product.id)),
        React.createElement("button", { onClick: function() { ajuster(product.id, 1); }, style: styles.qtyButton }, "+")
      ),

      React.createElement("textarea", {
        placeholder: "Note (optionnel)",
        value: getCommentaire(product.id),
        onChange: function(e) { updateCommentaire(product.id, e.target.value); },
        style: styles.commentaire,
        rows: "2"
      }),

      React.createElement("button", { onClick: function() { ajouterAuPanier(product); }, style: styles.addButton }, "Ajouter au panier")
    );
  })
),

cartOpen && React.createElement("div", { style: styles.modalOverlay, onClick: function() { setCartOpen(false); } },
  React.createElement("div", { style: styles.modal, onClick: function(e) { e.stopPropagation(); } },
    orderSent ? React.createElement("div", { style: styles.successContainer },
      React.createElement("div", { style: styles.successIcon }, "\u2713"),
      React.createElement("h2", { style: styles.successTitle }, "Commande envoyee"),
      React.createElement("p", { style: styles.successText }, "Merci " + clientInfo.nom),
      React.createElement("p", { style: styles.successEmail }, "Nous vous contacterons a " + clientInfo.email),
      React.createElement("button", { onClick: fermerEtReset, style: styles.closeButton }, "Fermer")
    ) : React.createElement(React.Fragment, null,
      React.createElement("div", { style: styles.modalHeader },
        React.createElement("h2", { style: styles.modalTitle }, "Panier"),
        React.createElement("button", { onClick: function() { setCartOpen(false); }, style: styles.closeIcon }, "\u00d7")
      ),

      panier.length === 0 ? React.createElement("p", { style: styles.emptyCart }, "Votre panier est vide") : React.createElement(React.Fragment, null,
        React.createElement("div", { style: styles.cartItems },
          panier.map(function(item) {
            return React.createElement("div", { key: item.id, style: styles.cartItem },
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
)
```

);
}

var styles = {
container: {
fontFamily: “-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif”,
minHeight: “100vh”,
backgroundColor: “#f5f5f7”
},
header: {
backgroundColor: “white”,
padding: “16px 40px”,
display: “flex”,
justifyContent: “space-between”,
alignItems: “center”,
borderBottom: “1px solid #d2d2d7”,
position: “sticky”,
top: 0,
zIndex: 100
},
logo: {
height: “40px”,
width: “auto”,
objectFit: “contain”
},
cartButton: {
backgroundColor: “transparent”,
border: “none”,
cursor: “pointer”,
position: “relative”,
padding: “8px”
},
badge: {
position: “absolute”,
top: “0”,
right: “0”,
backgroundColor: “#0071e3”,
color: “white”,
borderRadius: “10px”,
padding: “2px 6px”,
fontSize: “12px”,
fontWeight: “600”,
minWidth: “20px”,
textAlign: “center”
},
nav: {
backgroundColor: “white”,
padding: “16px 40px”,
display: “flex”,
gap: “12px”,
overflowX: “auto”,
borderBottom: “1px solid #d2d2d7”
},
tab: {
padding: “10px 20px”,
border: “none”,
borderRadius: “20px”,
cursor: “pointer”,
backgroundColor: “#f5f5f7”,
color: “#1d1d1f”,
fontSize: “14px”,
fontWeight: “400”,
transition: “all 0.2s”,
whiteSpace: “nowrap”
},
tabActive: {
backgroundColor: “#1d1d1f”,
color: “white”
},
main: {
padding: “40px”,
display: “grid”,
gridTemplateColumns: “repeat(auto-fill, minmax(280px, 1fr))”,
gap: “24px”,
maxWidth: “1400px”,
margin: “0 auto”
},
card: {
backgroundColor: “white”,
borderRadius: “18px”,
padding: “24px”,
boxShadow: “0 4px 6px rgba(0,0,0,0.07)”,
transition: “transform 0.2s, box-shadow 0.2s”
},
imageContainer: {
height: “200px”,
backgroundColor: “white”,
borderRadius: “12px”,
marginBottom: “16px”,
display: “flex”,
alignItems: “center”,
justifyContent: “center”,
overflow: “hidden”
},
image: {
maxHeight: “100%”,
maxWidth: “100%”,
objectFit: “contain”
},
productName: {
margin: “0 0 4px 0”,
fontSize: “17px”,
fontWeight: “600”,
color: “#1d1d1f”
},
productColor: {
margin: “0 0 4px 0”,
fontSize: “14px”,
color: “#6e6e73”
},
productRef: {
margin: “0 0 16px 0”,
fontSize: “12px”,
color: “#86868b”
},
quantityControl: {
display: “flex”,
alignItems: “center”,
justifyContent: “center”,
gap: “16px”,
marginBottom: “12px”
},
qtyButton: {
width: “36px”,
height: “36px”,
border: “1px solid #d2d2d7”,
borderRadius: “50%”,
cursor: “pointer”,
backgroundColor: “white”,
fontSize: “18px”,
color: “#1d1d1f”,
display: “flex”,
alignItems: “center”,
justifyContent: “center”
},
quantity: {
fontSize: “17px”,
fontWeight: “600”,
minWidth: “30px”,
textAlign: “center”
},
commentaire: {
width: “100%”,
padding: “10px”,
border: “1px solid #e5e5e7”,
borderRadius: “8px”,
fontSize: “13px”,
fontFamily: “inherit”,
resize: “none”,
marginBottom: “12px”,
boxSizing: “border-box”,
color: “#1d1d1f”
},
addButton: {
width: “100%”,
padding: “12px”,
backgroundColor: “#0071e3”,
color: “white”,
border: “none”,
borderRadius: “10px”,
cursor: “pointer”,
fontSize: “15px”,
fontWeight: “500”,
transition: “background-color 0.2s”
},
modalOverlay: {
position: “fixed”,
top: 0,
left: 0,
right: 0,
bottom: 0,
backgroundColor: “rgba(0,0,0,0.4)”,
display: “flex”,
justifyContent: “center”,
alignItems: “center”,
zIndex: 1000,
padding: “20px”
},
modal: {
backgroundColor: “white”,
borderRadius: “20px”,
padding: “32px”,
maxWidth: “500px”,
width: “100%”,
maxHeight: “80vh”,
overflow: “auto”
},
modalHeader: {
display: “flex”,
justifyContent: “space-between”,
alignItems: “center”,
marginBottom: “24px”
},
modalTitle: {
margin: 0,
fontSize: “24px”,
fontWeight: “600”,
color: “#1d1d1f”
},
closeIcon: {
background: “none”,
border: “none”,
fontSize: “32px”,
cursor: “pointer”,
color: “#86868b”,
padding: 0,
lineHeight: 1
},
emptyCart: {
textAlign: “center”,
color: “#86868b”,
padding: “40px 0”
},
cartItems: {
marginBottom: “24px”
},
cartItem: {
display: “flex”,
justifyContent: “space-between”,
alignItems: “flex-start”,
padding: “16px 0”,
borderBottom: “1px solid #f5f5f7”
},
cartItemName: {
margin: “0 0 4px 0”,
fontSize: “15px”,
fontWeight: “500”,
color: “#1d1d1f”
},
cartItemDetails: {
margin: “0 0 4px 0”,
fontSize: “14px”,
color: “#6e6e73”
},
cartItemComment: {
margin: “4px 0 0 0”,
fontSize: “13px”,
color: “#86868b”,
fontStyle: “italic”
},
deleteButton: {
background: “none”,
border: “none”,
fontSize: “28px”,
cursor: “pointer”,
color: “#86868b”,
padding: “0 8px”
},
form: {
display: “flex”,
flexDirection: “column”,
gap: “12px”
},
input: {
width: “100%”,
padding: “14px”,
border: “1px solid #d2d2d7”,
borderRadius: “10px”,
fontSize: “15px”,
boxSizing: “border-box”,
fontFamily: “inherit”
},
submitButton: {
width: “100%”,
padding: “14px”,
backgroundColor: “#0071e3”,
color: “white”,
border: “none”,
borderRadius: “10px”,
cursor: “pointer”,
fontSize: “15px”,
fontWeight: “600”,
marginTop: “8px”
},
submitButtonDisabled: {
backgroundColor: “#86868b”,
cursor: “not-allowed”
},
successContainer: {
textAlign: “center”,
padding: “20px”
},
successIcon: {
width: “64px”,
height: “64px”,
backgroundColor: “#34c759”,
color: “white”,
borderRadius: “50%”,
display: “flex”,
alignItems: “center”,
justifyContent: “center”,
fontSize: “32px”,
margin: “0 auto 20px”
},
successTitle: {
fontSize: “24px”,
fontWeight: “600”,
color: “#1d1d1f”,
margin: “0 0 8px 0”
},
successText: {
fontSize: “15px”,
color: “#6e6e73”,
margin: “0 0 4px 0”
},
successEmail: {
fontSize: “15px”,
color: “#6e6e73”,
margin: “0 0 24px 0”
},
closeButton: {
padding: “14px 32px”,
backgroundColor: “#0071e3”,
color: “white”,
border: “none”,
borderRadius: “10px”,
cursor: “pointer”,
fontSize: “15px”,
fontWeight: “600”
}
};
