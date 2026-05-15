/* ============================================================
   MENU.JS - Fonctions communes à toutes les pages
   ============================================================ */


/* ====== 1. HORLOGE EN TEMPS REEL ====== */
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


/* ====== 2. CHRONOMETRE - temps passé sur la page ====== */
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


/* ====== 3. LOGO CLIQUABLE → ACCUEIL ====== */
function initLogo() {
    var logo = document.querySelector(".logo");
    if (!logo) return;

    logo.addEventListener("click", function () {
        naviguerVers("index.html");
    });
}


/* ====== 4. LOADER CSS + NAVIGATION RETARDEE (2 secondes) ====== */
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


/* ====== 5. GESTION DES LIENS DE NAVIGATION ====== */
function initNavigation() {
    var liens = document.querySelectorAll("nav ul li a");

    liens.forEach(function (lien) {
        lien.addEventListener("click", function (e) {
            e.preventDefault();

            var url = this.getAttribute("href");
            var label = this.textContent.trim();

            /* Changement de couleur + log console */
            var ancienneCouleur = window.getComputedStyle(this).backgroundColor;
            var nouvelleCouleur = "#e94560";
            this.style.backgroundColor = nouvelleCouleur;
            console.log(
                "[Navigation] Lien cliqué : '" + label + "'" +
                " | Ancienne couleur : " + ancienneCouleur +
                " | Nouvelle couleur : " + nouvelleCouleur
            );

            /* Confirmation pour la page Équipe */
            if (url === "equipe.html") {
                var confirme = confirm("Voulez-vous accéder à la page Présentation de l'Équipe ?");
                if (confirme) {
                    console.log("[Navigation] Confirmation acceptée → navigation vers equipe.html");
                    naviguerVers(url);
                } else {
                    console.log("[Navigation] Confirmation refusée → navigation annulée.");
                    this.style.backgroundColor = "";
                }
                return;
            }

            /* Navigation normale avec délai 2s */
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


/* ====== 6. NUMEROS DE TELEPHONE - COPIE + APPEL ======
   Si l'utilisateur copie un numéro de téléphone des campus,
   un prompt s'affiche pour confirmer l'appel.
   Après validation : message console + sonnerie 5 secondes.
*/

/* Variable pour la sonnerie - mettre l'URL du fichier audio plus tard */
var sonnerieURL = "";  /* Exemple : "sonnerie.mp3" */
var sonnerieAudio = null;

function initTelephones() {
    var telLinks = document.querySelectorAll(".tel-link");

    telLinks.forEach(function (tel) {
        /* On écoute l'événement 'copy' sur chaque numéro */
        tel.addEventListener("copy", function (e) {
            var numero = this.textContent.trim();
            console.log("[Téléphone] Numéro copié : " + numero);

            /* On utilise un setTimeout pour laisser la copie se faire avant le prompt */
            setTimeout(function () {
                var saisi = prompt("Si vous voulez appeler ce numéro : " + numero + ", entrez le de nouveau dans le champ ci-dessous puis validez");

                if (saisi === null) {
                    console.log("[Téléphone] Appel annulé.");
                    return;
                }

                /* On vérifie que le numéro saisi correspond */
                if (saisi.trim() === numero) {
                    console.log("vous appelez ce numéro : " + numero);
                    declencherSonnerie();
                } else {
                    console.error("[Téléphone] Numéro incorrect. Appel annulé.");
                }
            }, 100);
        });
    });
}

/* Joue la sonnerie pendant 5 secondes */
function declencherSonnerie() {
    if (sonnerieURL === "") {
        console.warn("[Sonnerie] Aucun fichier audio défini. Ajoutez l'URL dans la variable 'sonnerieURL'.");
        /* On simule quand même les 5 secondes */
        console.log("[Sonnerie] Sonnerie active (simulation 5 secondes)...");
        setTimeout(function () {
            console.log("[Sonnerie] Fin de la sonnerie.");
        }, 5000);
        return;
    }

    /* Si une URL est définie, on joue la vraie sonnerie */
    sonnerieAudio = new Audio(sonnerieURL);
    sonnerieAudio.play();
    console.log("[Sonnerie] Sonnerie démarrée.");

    /* On arrête après 5 secondes */
    setTimeout(function () {
        sonnerieAudio.pause();
        sonnerieAudio.currentTime = 0;
        console.log("[Sonnerie] Fin de la sonnerie (5 secondes écoulées).");
    }, 5000);
}


/* ====== INITIALISATION AU CHARGEMENT ====== */
window.addEventListener("DOMContentLoaded", function () {
    demarrerHorloge();
    demarrerChrono();
    initLogo();
    initNavigation();
    initTelephones();
    console.log("📄 menu.js chargé - page : " + document.title);
});
