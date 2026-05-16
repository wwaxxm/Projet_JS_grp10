/* services.js - Page Services */



/* ============ 2. LISTE DES PRODUITS ============ */
var produits = [
    { id: 1, nom: "T-shirt Oversize",     theme: "Hauts",       prix: 29.99,  date: "2026-03-15", icone1: "👕", icone2: "🎽", desc: "T-shirt coton bio, coupe oversize." },
    { id: 2, nom: "Jean Slim Noir",       theme: "Bas",         prix: 59.90,  date: "2026-02-20", icone1: "👖", icone2: "🩳", desc: "Jean slim taille haute, denim premium." },
    { id: 3, nom: "Veste Kaki Cargo",     theme: "Vestes",      prix: 89.00,  date: "2026-04-01", icone1: "🧥", icone2: "🥼", desc: "Veste cargo style militaire, multipoches." },
    { id: 4, nom: "Sneakers Blanches",    theme: "Chaussures",  prix: 119.00, date: "2026-03-28", icone1: "👟", icone2: "🥾", desc: "Sneakers cuir blanc, semelle confort." },
    { id: 5, nom: "Robe d'été Fleurie",   theme: "Robes",       prix: 49.50,  date: "2026-04-10", icone1: "👗", icone2: "🥻", desc: "Robe légère imprimé floral, idéale été." },
    { id: 6, nom: "Casquette Logo",       theme: "Accessoires", prix: 19.90,  date: "2026-03-05", icone1: "🧢", icone2: "👒", desc: "Casquette ajustable brodée FitLook." },
    { id: 7, nom: "Pull en Laine",        theme: "Hauts",       prix: 75.00,  date: "2026-01-15", icone1: "🧶", icone2: "🧣", desc: "Pull en laine mérinos, chaud et doux." },
    { id: 8, nom: "Sac à Dos Urbain",     theme: "Accessoires", prix: 65.00,  date: "2026-04-05", icone1: "🎒", icone2: "👜", desc: "Sac à dos pratique pour la ville." }
];

/* ============ 3. AFFICHAGE DES PRODUITS ============ */
function afficherProduits(liste) {
    var grid = document.getElementById("produits-grid");
    if (!grid) return;
    grid.innerHTML = "";

    if (liste.length === 0) {
        grid.innerHTML = "<p class='no-result'>Aucun produit ne correspond à vos critères.</p>";
        return;
    }

    liste.forEach(function (p) {
        var card = document.createElement("div");
        card.className = "produit-card";
        card.innerHTML =
            '<div class="produit-image" data-id="' + p.id + '" data-state="1">' + p.icone1 + '</div>' +
            '<div class="produit-info">' +
                '<h3>' + p.nom + '</h3>' +
                '<span class="produit-theme">' + p.theme + '</span>' +
                '<p>' + p.desc + '</p>' +
                '<div class="produit-footer">' +
                    '<span class="produit-prix">' + p.prix.toFixed(2) + ' €</span>' +
                    '<span class="produit-date">' + p.date + '</span>' +
                '</div>' +
                '<button class="btn-acheter" data-nom="' + p.nom + '">Acheter</button>' +
            '</div>';
        grid.appendChild(card);
    });

    /* CLIC IMAGE → change image */
    document.querySelectorAll(".produit-image").forEach(function (img) {
        img.addEventListener("click", function () {
            var id = parseInt(this.getAttribute("data-id"));
            var state = this.getAttribute("data-state");
            var produit = produits.find(function (p) { return p.id === id; });
            if (state === "1") {
                this.textContent = produit.icone2;
                this.setAttribute("data-state", "2");
            } else {
                this.textContent = produit.icone1;
                this.setAttribute("data-state", "1");
            }
        });
    });

    /* CLIC ACHETER → bandeau canvas */
    document.querySelectorAll(".btn-acheter").forEach(function (btn) {
        btn.addEventListener("click", function () {
            afficherBandeauAchat(this.getAttribute("data-nom"));
        });
    });
}

/* ============ 4. BANDEAU CANVAS ============ */
function afficherBandeauAchat(nomProduit) {
    var bandeau = document.getElementById("achat-bandeau");
    var canvas = document.getElementById("canvas-achat");
    var ctx = canvas.getContext("2d");

    var w = canvas.width;
    var h = canvas.height;

    /* Fond bleu */
    ctx.fillStyle = "#16213e";
    ctx.fillRect(0, 0, w, h);

    /* Bordure */
    ctx.strokeStyle = "#e94560";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, w, h);

    /* Smiley */
    var cx = 40, cy = h / 2, r = 22;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = "#ffd93d";
    ctx.fill();
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.stroke();
    /* Yeux */
    ctx.fillStyle = "#333";
    ctx.beginPath();
    ctx.arc(cx - 7, cy - 5, 3, 0, Math.PI * 2);
    ctx.arc(cx + 7, cy - 5, 3, 0, Math.PI * 2);
    ctx.fill();
    /* Sourire */
    ctx.beginPath();
    ctx.arc(cx, cy + 2, 10, 0, Math.PI);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.stroke();

    /* Texte */
    ctx.fillStyle = "white";
    ctx.font = "bold 14px Segoe UI";
    ctx.textBaseline = "middle";
    ctx.fillText("Vous avez acheté ce produit !", 80, cy - 8);
    ctx.font = "12px Segoe UI";
    ctx.fillStyle = "#aaa";
    ctx.fillText(nomProduit, 80, cy + 12);

    bandeau.classList.add("visible");
    console.log("[Achat] Produit acheté : " + nomProduit);

    setTimeout(function () {
        bandeau.classList.remove("visible");
    }, 3000);
}

/* ============ 5. FILTRES ============ */
function appliquerFiltres(e) {
    if (e) e.preventDefault();

    var fNom = document.getElementById("f-nom").value.trim().toLowerCase();
    var fTheme = document.getElementById("f-theme").value;
    var fPrixMin = parseFloat(document.getElementById("f-prix-min").value);
    var fPrixMax = parseFloat(document.getElementById("f-prix-max").value);
    var fDate = document.getElementById("f-date").value;

    var resultats = produits.filter(function (p) {
        if (fNom !== "" && p.nom.toLowerCase().indexOf(fNom) === -1) return false;
        if (fTheme !== "" && p.theme !== fTheme) return false;
        if (!isNaN(fPrixMin) && p.prix < fPrixMin) return false;
        if (!isNaN(fPrixMax) && p.prix > fPrixMax) return false;
        if (fDate !== "" && p.date < fDate) return false;
        return true;
    });

    console.log("[Filtres] " + resultats.length + " produit(s) trouvé(s).");
    afficherProduits(resultats);
}

function reinitialiserFiltres() {
    document.getElementById("filtres-form").reset();
    afficherProduits(produits);
    console.log("[Filtres] Réinitialisés.");
}

/* ============ 6. RETOUR HAUT ============ */
function retourHaut() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ============ 7. INITIALISATION ============ */
window.addEventListener("DOMContentLoaded", function () {
    afficherProduits(produits);

    var form = document.getElementById("filtres-form");
    if (form) form.addEventListener("submit", appliquerFiltres);

    var btnReset = document.getElementById("btn-reset-filtres");
    if (btnReset) btnReset.addEventListener("click", reinitialiserFiltres);

    var btnHaut = document.getElementById("btn-retour-haut");
    if (btnHaut) btnHaut.addEventListener("click", retourHaut);

    /* Boutons abonnement */
    document.querySelectorAll(".abo-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            var offre = this.getAttribute("data-offre");
            console.log("[Abonnement] Choisi : " + offre);
            afficherBandeauAchat("Abonnement " + offre);
        });
    });
});
