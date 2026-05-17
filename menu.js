/* 
   MENU.JS - Fonctions communes à toutes les pages

   /*  ANTI-PLAGIAT */ // Dylan
document.addEventListener("copy", function () { // fonction anonyme
    console.warn("⚠️ ATTENTION - Règles sur le plagiat :");
    console.warn("Le contenu de ce site est la propriété exclusive de FitLook.");
    console.warn("Toute reproduction sans autorisation écrite est interdite.");
});

/* ERREURS DE SAISIE */
function verifierSaisie(champ) {
   const valeur = champ.value.trim();
   const nom = champ.name || champ.id || "champ inconnu";
    if (valeur === "" && champ.hasAttribute("required")) {
        console.error("❌ [index] Champ '" + nom + "' : obligatoire mais vide.");
        return false;
    }
    if (champ.type === "email" && valeur !== "") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeur)) {
            console.error("❌ [index] Champ '" + nom + "' : email invalide → " + valeur);
            return false;
        }
    }
    return true;
}

document.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
       const champs = this.querySelectorAll("input, textarea, select");
       const ok = true;
        champs.forEach(function (c) { if (!verifierSaisie(c)) ok = false; });
        if (!ok) {
            e.preventDefault();
            console.error("[index] Soumission bloquée - erreurs de saisie.");
        }
    });
});

/*  1. HORLOGE EN TEMPS REEL  */
function demarrerHorloge() {
   const horlogeEl = document.getElementById("horloge");
    if (!horlogeEl) return;

    function mettreAJour() {
       const maintenant = new Date();
       const h = String(maintenant.getHours()).padStart(2, "0");
       const m = String(maintenant.getMinutes()).padStart(2, "0");
       const s = String(maintenant.getSeconds()).padStart(2, "0");
        horlogeEl.textContent = h + ":" + m + ":" + s;
    }

    mettreAJour();
    setInterval(mettreAJour, 1000);
}


/*  2. CHRONOMETRE - temps passé sur la page  */
var secondesSurPage = 0;

function demarrerChrono() {
   const chronoEl = document.getElementById("chrono");
    if (!chronoEl) return;

    setInterval(function () {
        secondesSurPage++;
       const min = Math.floor(secondesSurPage / 60);
       const sec = secondesSurPage % 60;
       const affMin = String(min).padStart(2, "0");
       const affSec = String(sec).padStart(2, "0");
        chronoEl.textContent = "Sur la page : " + affMin + ":" + affSec;
    }, 1000);
}


/*  3. LOGO CLIQUABLE → ACCUEIL  */
function initLogo() {
   const logo = document.querySelector(".logo");
    if (!logo) return;

    logo.addEventListener("click", function () {
        naviguerVers("index.html");
    });
}


/*  4. LOADER CSS + NAVIGATION RETARDEE (2 secondes)  */
function naviguerVers(url) {
   const overlay = document.getElementById("loader-overlay");
    if (!overlay) {
        window.location.href = url;
        return;
    }
    overlay.classList.add("visible");
    setTimeout(function () {
        window.location.href = url;
    }, 2000);
}


/*  5. GESTION DES LIENS DE NAVIGATION  */
function initNavigation() {
   const liens = document.querySelectorAll("nav ul li a");

    liens.forEach(function (lien) {
        lien.addEventListener("click", function (e) {
            e.preventDefault();

           const url = this.getAttribute("href");
           const label = this.textContent.trim();

            /* Changement de couleur + log console  si lien cliquer */
           const ancienneCouleur = window.getComputedStyle(this).backgroundColor; /* je recupere tout les styles css et avec backgroundColor je prends uniquement la couleur du fond ( sert a trié ) */
           const nouvelleCouleur = "#e94560";
            this.style.backgroundColor = nouvelleCouleur; // je change donc la couleur si liens cliquer 
            console.log(
                "[Navigation] Lien cliqué : '" + label + "'" +
                " | Ancienne couleur : " + ancienneCouleur +
                " | Nouvelle couleur : " + nouvelleCouleur
            );

            /* Confirmation pour la page Équipe */
            if (url === "equipe.html") { // on confirme qu'on veut bien si rendre 
               const confirme = confirm("Voulez-vous accéder à la page Présentation de l'Équipe ?");
                if (confirme) {
                    console.log("[Navigation] Confirmation acceptée → navigation vers equipe.html");
                    naviguerVers(url);
                } else {
                    console.log("[Navigation] Confirmation refusée → navigation annulée.");
                    this.style.backgroundColor = ""; // sa remet l'ancienne couleur d'actualiter
                } /* le "" supprime le style qu'on avait appliqué donc reviens sur la couleur appliqué a l'origine dans le CSS */
                return;
            }

            /* Navigation normale avec délai 2s */
            naviguerVers(url);
        });
    });

    /* Même logique pour les liens du footer */
   const liensFooter = document.querySelectorAll(".footer-links a");
    liensFooter.forEach(function (lien) {
        lien.addEventListener("click", function (e) {
            e.preventDefault();
           const url = this.getAttribute("href");
            if (url === "equipe.html") {
               const confirme = confirm("Voulez-vous accéder à la page Présentation de l'Équipe ?");
                if (!confirme) {
                    console.log("[Footer] Navigation vers equipe.html annulée.");
                    return;
                }
            }
            naviguerVers(url);
        });
    });
}


/*  6. Numeros de telephones , Copie; Appel 
   Si l'utilisateur copie un numéro de téléphone des campus
   un prompt s'affiche pour confirmer l'appel
   Après validation  message console et sonnerie 5 secondes
*/

/*constiable pour la sonnerie */
var sonnerieURL = "son/Enregistrement 2026-05-16 232614.mp3";  /* ex: "son/sonnerie.mp3" */
var sonnerieAudio = null;

/* Liste des numeros des campus pour detecter si c'est bien un numero copie */
var numerosCampus = [
    "+33 (0)2 98 03 84 00",
    "+33 (0)2 30 31 03 20",
    "+33 (0)2 30 13 05 60",
    "+33 (0)2 30 13 02 50",
    "+33 (0)2 30 31 30 40"
];

function initTelephones() {
    /* On ecoute la copie sur TOUT le document - plus fiable que sur le span */
    document.addEventListener("copy", function (e) {

        /* On recupere le texte que l'utilisateur vient de copier */
       const texteCopie = "";
        if (window.getSelection) {
            texteCopie = window.getSelection().toString().trim();
        }

        if (texteCopie === "") {
            return;
        }

        /* On verifie si le texte copie correspond a un de nos numeros */
       const numeroTrouve = "";
        for (var i = 0; i < numerosCampus.length; i++) {
            if (texteCopie === numerosCampus[i]) {
                numeroTrouve = numerosCampus[i];
            }
        }

        /* Si c'est pas un numero de campus on ne fait rien */
        if (numeroTrouve === "") {
            return;
        }

        console.log("[Telephone] Numero copie : " + numeroTrouve);

        /* Petit delai pour laisser la copie se terminer avant d'ouvrir le prompt */
        setTimeout(function () {
           const saisi = prompt("Si vous voulez appeler ce numero : " + numeroTrouve + ", entrez le de nouveau dans le champ ci-dessous puis validez");

            if (saisi === null) {
                console.log("[Telephone] Appel annule.");
                return;
            }

            /* On verifie que le numero resaisi correspond */
            if (saisi.trim() === numeroTrouve) {
                console.log("vous appelez ce numero : " + numeroTrouve);
                declencherSonnerie();
            } else {
                console.error("[Telephone] Numero incorrect. Appel annule.");
            }
        }, 200);
    });
}

/* Joue la sonnerie pendant 5 secondes */
function declencherSonnerie() {
    if (sonnerieURL === "") {
        console.warn("[Sonnerie] Aucun fichier audio défini. Ajoutez l'URL dans laconstiable 'sonnerieURL'.");
        /* On simule quand même les 5 secondes */
        console.log("[Sonnerie] Sonnerie active (simulation 5 secondes)...");
        setTimeout(function () {
            console.log("[Sonnerie] Fin de la sonnerie.");
        }, 5000);
        return;
    }

    /* Si une URL est définie, on joue la vraie sonnerie */
    sonnerieAudio = new Audio(sonnerieURL);
    sonnerieAudio.play().catch(function(erreur) {
    console.error("[Sonnerie] Erreur lecture audio : " + erreur);
});
    console.log("[Sonnerie] Sonnerie démarrée.");

    /* On arrête après 5 secondes */
    setTimeout(function () {
        sonnerieAudio.pause();
        sonnerieAudio.currentTime = 0;
        console.log("[Sonnerie] Fin de la sonnerie (5 secondes écoulées).");
    }, 5000);
}


/*  INITIALISATION AU CHARGEMENT  */
window.addEventListener("DOMContentLoaded", function () {
    demarrerHorloge();
    demarrerChrono();
    initLogo();
    initNavigation();
    initTelephones();
    console.log("📄 menu.js chargé - page : " + document.title);
});


