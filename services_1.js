// antiplagiat
document.addEventListener("copy", function () {
    alert("Hé, la copie est interdite sur FitLook !");
    console.log("Tentative de copie détectée.");
});

// products list
let produits = [
    { id: 1, nom: "T-shirt Oversize", theme: "Hauts", prix: 29.99, date: "2026-03-15", img:"banks/images/tshirt.webp", desc: "longsleeve, coupe boxy" },
    { id: 2, nom: "Jean Slim Noir", theme: "Bas", prix: 59.90, date: "2026-02-20", img: "banks/images/jean.webp", desc: "Jean baggy, denim premium." },
    { id: 3, nom: "Veste Kaki Cargo", theme: "Vestes", prix: 89.00, date: "2026-04-01", img:"banks/images/veste.webp", desc: "Veste cargo style militaire, multipoches." },
    { id: 4, nom: "Sneakers Blanches", theme: "Chaussures", prix: 119.00, date: "2026-03-28", img:"banks/images/sneaker.webp", desc: "Sneakers cuir blanc, semelle confort." },
    { id: 5, nom: "Robe d'été Fleurie", theme: "Robes", prix: 49.50, date: "2026-04-10", img:"banks/images/robe.webp", desc: "Robe légère imprimé floral, idéale été." },
    { id: 6, nom: "Casquette Logo", theme: "Accessoires", prix: 19.90, date: "2026-03-05", img:"banks/images/cap.webp", desc: "Casquette ajustable brodée FitLook." },
    { id: 7, nom: "Pull en Laine", theme: "Hauts", prix: 75.00, date: "2026-01-15", img:"banks/images/pull.webp", desc: "Pull en laine mérinos, chaud et doux." },
    { id: 8, nom: "Sac à Dos Urbain", theme: "Accessoires", prix: 65.00, date: "2026-04-05", img:"banks/images/bag.webp", desc: "Sac à dos pratique pour la ville." }
];
     
// affichage des produits et gestion des clics
function afficherProduits(liste) {
    let grid = document.getElementById("produits-grid");
    if (!grid) return;
    
    grid.innerHTML = "";

    if (liste.length === 0) {
        grid.innerHTML = "<p class='no-result'>Aucun produit trouvé.</p>";
        return;
    }

    liste.forEach(function (p) {
        let card = document.createElement("div");
        card.className = "produit-card";
        card.innerHTML =
            '<div class="produit-image">' +
                '<img src="' + p.img + '" alt="' + p.nom + '">' +
            '</div>' +
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

    document.querySelectorAll(".btn-acheter").forEach(function (btn) {
        btn.addEventListener("click", function () {
            afficherBandeauAchat(this.getAttribute("data-nom"));
        });
    });
}
// bandeau d'achat
function afficherBandeauAchat(nomProduit) {
    let bandeau = document.getElementById("achat-bandeau");
    let canvas = document.getElementById("canvas-achat");
    let ctx = canvas.getContext("2d");

    let w = canvas.width;
    let h = canvas.height;

    ctx.fillStyle = "#16213e";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "#e94560";
    ctx.lineWidth = 3;
    ctx.strokeRect(0, 0, w, h);

    let cx = 40, cy = h / 2, r = 22;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = "#ffd93d";
    ctx.fill();
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.stroke();
    
    ctx.fillStyle = "#333";
    ctx.beginPath();
    ctx.arc(cx - 7, cy - 5, 3, 0, Math.PI * 2);
    ctx.arc(cx + 7, cy - 5, 3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.beginPath();
    ctx.arc(cx, cy + 2, 10, 0, Math.PI);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = "white";
    ctx.font = "bold 14px Segoe UI";
    ctx.textBaseline = "middle";
    ctx.fillText("Vous avez acheté ce produit !", 80, cy - 8);
    ctx.font = "12px Segoe UI";
    ctx.fillStyle = "#aaa";
    ctx.fillText(nomProduit, 80, cy + 12);

    bandeau.classList.add("visible");
    console.log("Produit acheté : " + nomProduit);

    setTimeout(function () {
        bandeau.classList.remove("visible");
    }, 3000);
}

// filter
function appliquerFiltres(e) {
    if (e) e.preventDefault();

    let fNom = document.getElementById("f-nom").value.trim().toLowerCase();
    let fTheme = document.getElementById("f-theme").value;
    let fPrixMin = parseFloat(document.getElementById("f-prix-min").value);
    let fPrixMax = parseFloat(document.getElementById("f-prix-max").value);
    let fDate = document.getElementById("f-date").value;

    let resultats = produits.filter(function (p) {
        if (fNom !== "" && p.nom.toLowerCase().indexOf(fNom) === -1) return false;
        if (fTheme !== "" && p.theme !== fTheme) return false;
        if (!isNaN(fPrixMin) && p.prix < fPrixMin) return false;
        if (!isNaN(fPrixMax) && p.prix > fPrixMax) return false;
        if (fDate !== "" && p.date < fDate) return false;
        return true;
    });

    console.log(resultats.length + " produit(s) trouvé(s) avec les filtres.");
    afficherProduits(resultats);
}

function reinitialiserFiltres() {
    document.getElementById("filtres-form").reset();
    afficherProduits(produits);
    console.log("Filtres remis à zéro.");
}

// btn comeback
function retourHaut() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// init de la page et des events
window.addEventListener("DOMContentLoaded", function () {
    afficherProduits(produits);

    let form = document.getElementById("filtres-form");
    if (form) form.addEventListener("submit", appliquerFiltres);

    let btnReset = document.getElementById("btn-reset-filtres");
    if (btnReset) btnReset.addEventListener("click", reinitialiserFiltres);

    let btnHaut = document.getElementById("btn-retour-haut");
    if (btnHaut) btnHaut.addEventListener("click", retourHaut);

    document.querySelectorAll(".abo-btn").forEach(function (btn) {
        btn.addEventListener("click", function () {
            let offre = this.getAttribute("data-offre");
            console.log("Abonnement choisi : " + offre);
            afficherBandeauAchat("Abonnement " + offre);
        });
    });
});





