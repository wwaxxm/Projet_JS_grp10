/* ============================================================
   MENU.JS - Fonctions communes à toutes les pages
   Ce fichier est chargé sur chaque page via <script src="menu.js">
   ============================================================ */


/* ====== 1. HORLOGE EN TEMPS REEL ======
   Affiche l'heure actuelle et se met à jour chaque seconde */
function demarrerHorloge() {
    var horlogeEl = document.getElementById("horloge");
    if (!horlogeEl) return;

    function mettreAJour() {
        var maintenant = new Date();
        var h = String(maintenant.getHours()).padStart(2, "0");
        var m = String(maintenant.getMinutes()).padStart(2, "0");
        var s = String(maintenant.getSeconds()).padStart(2, "0");
        horlogeEl.textContent = h + ":" + m + ":" + s;
    }

    mettreAJour();
    setInterval(mettreAJour, 1000);
}


/* ====== 2. CHRONOMETRE - temps passé sur la page ======
   Démarre au chargement, s'incrémente chaque seconde */
var secondesSurPage = 0;

function demarrerChrono() {
    var chronoEl = document.getElementById("chrono");
    if (!chronoEl) return;

    setInterval(function () {
        secondesSurPage++;
        var min = Math.floor(secondesSurPage / 60);
        var sec = secondesSurPage % 60;
        var affMin = String(min).padStart(2, "0");
        var affSec = String(sec).padStart(2, "0");
        chronoEl.textContent = "Sur la page : " + affMin + ":" + affSec;
    }, 1000);
}


/* ====== 3. LOGO CLIQUABLE → ACCUEIL ======
   Un clic sur le logo redirige vers index.html */
function initLogo() {
    var logo = document.querySelector(".logo");
    if (!logo) return;

    logo.addEventListener("click", function () {
        naviguerVers("index.html");
    });
}


/* ====== 4. LOADER CSS + NAVIGATION RETARDEE (2 secondes) ======
   Affiche un spinner pendant 2 secondes avant de changer de page */
function naviguerVers(url) {
    var overlay = document.getElementById("loader-overlay");
    if (!overlay) {
        window.location.href = url;
        return;
    }
    overlay.classList.add("visible");
    setTimeout(function () {
        window.location.href = url;
    }, 2000);
}


/* ====== 5. GESTION DES LIENS DE NAVIGATION ======
   - Délai de 2s sur tous les liens
   - Confirmation pour la page Équipe
   - Log console des changements de couleur */
function initNavigation() {
    var liens = document.querySelectorAll("nav ul li a");

    liens.forEach(function (lien) {
        lien.addEventListener("click", function (e) {
            e.preventDefault();

            var url = this.getAttribute("href");
            var label = this.textContent.trim();

            /* -- Changement de couleur de l'item cliqué + log console -- */
            var ancienneCouleur = window.getComputedStyle(this).backgroundColor;
            var nouvelleCouleur = "#e94560"; // rouge FitLook
            this.style.backgroundColor = nouvelleCouleur;
            console.log(
                "[Navigation] Lien cliqué : '" + label + "'" +
                " | Ancienne couleur : " + ancienneCouleur +
                " | Nouvelle couleur : " + nouvelleCouleur
            );

            /* -- Confirmation pour la page Équipe -- */
            if (url === "equipe.html") {
                var confirme = confirm("Voulez-vous accéder à la page Présentation de l'Équipe ?");
                if (confirme) {
                    console.log("[Navigation] Confirmation acceptée → navigation vers equipe.html");
                    naviguerVers(url);
                } else {
                    console.log("[Navigation] Confirmation refusée → navigation annulée.");
                    /* remet la couleur d'origine si on annule */
                    this.style.backgroundColor = "";
                }
                return;
            }

            /* -- Navigation normale avec délai 2s -- */
            naviguerVers(url);
        });
    });

    /* Même logique pour les liens du footer */
    var liensFooter = document.querySelectorAll(".footer-links a");
    liensFooter.forEach(function (lien) {
        lien.addEventListener("click", function (e) {
            e.preventDefault();
            var url = this.getAttribute("href");
            if (url === "equipe.html") {
                var confirme = confirm("Voulez-vous accéder à la page Présentation de l'Équipe ?");
                if (!confirme) {
                    console.log("[Footer] Navigation vers equipe.html annulée.");
                    return;
                }
            }
            naviguerVers(url);
        });
    });
}


/* ====== INITIALISATION AU CHARGEMENT ====== */
window.addEventListener("DOMContentLoaded", function () {
    demarrerHorloge();
    demarrerChrono();
    initLogo();
    initNavigation();
    console.log("📄 menu.js chargé - page : " + document.title);
});
