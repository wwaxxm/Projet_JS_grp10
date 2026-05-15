/* equipe.js - Page Équipe avec mode édition */

/* ============ 1. ANTI-PLAGIAT ============ */
document.addEventListener("copy", function () {
    console.warn("⚠️ ATTENTION - Règles sur le plagiat :");
    console.warn("Le contenu de ce site est la propriété exclusive de FitLook.");
    console.warn("Toute reproduction sans autorisation écrite est interdite.");
    console.warn("Article L122-4 du Code de la Propriété Intellectuelle.");
});

/* ============ 2. VARIABLES DU MODE EDITION ============ */
var modeEdition = false;
var compteurNouveauxMembres = 0;

/* ============ 3. BOUTON MODE EDITION ============ */
function gererClicEdition() {
    var btn = document.getElementById("btn-mode-edition");

    if (!modeEdition) {
        /* ----- ENTRER EN MODE EDITION ----- */
        var nomAdmin = prompt("Veuillez entrer le nom du profil administrateur :");
        if (nomAdmin === null) {
            console.log("[Édition] Annulé par l'utilisateur.");
            return;
        }
        if (nomAdmin !== "admin") {
            alert("❌ Nom administrateur incorrect !");
            console.error("[Édition] Nom admin incorrect : '" + nomAdmin + "'");
            return;
        }
        console.log("[Édition] Nom admin validé.");

        var mdp = prompt("Veuillez entrer le mot de passe administrateur :");
        if (mdp === null) {
            console.log("[Édition] Annulé par l'utilisateur.");
            return;
        }
        if (mdp !== "admin_pwd") {
            alert("❌ Mot de passe incorrect !");
            console.error("[Édition] Mot de passe incorrect.");
            return;
        }
        console.log("[Édition] Mot de passe validé.");

        modeEdition = true;
        document.body.classList.add("mode-edition");
        btn.classList.add("actif");
        btn.textContent = "✓ Mode édition actif";
        console.log("✅ [Édition] Mode édition ACTIVÉ.");

    } else {
        /* ----- SORTIR DU MODE EDITION ----- */
        var confirmer = confirm("Voulez-vous vraiment quitter le mode édition ?");
        if (!confirmer) {
            console.log("[Édition] Sortie annulée.");
            return;
        }

        sauvegarderNoms();

        modeEdition = false;
        document.body.classList.remove("mode-edition");
        btn.classList.remove("actif");
        btn.textContent = "✏️ Mode édition";
        console.log("✅ [Édition] Mode édition DÉSACTIVÉ. Retour au mode normal.");
    }
}

/* ============ 4. SAUVEGARDER LES NOMS ============ */
function sauvegarderNoms() {
    var cartes = document.querySelectorAll(".team-card");
    cartes.forEach(function (carte) {
        var inputNom = carte.querySelector(".nom-edit");
        var titreNom = carte.querySelector("h3");
        if (inputNom && titreNom) {
            var nouveauNom = inputNom.value.trim();
            if (nouveauNom !== "") {
                titreNom.textContent = nouveauNom;
                console.log("[Édition] Nom mis à jour : " + nouveauNom);
            }
        }
    });
}

/* ============ 5. AJOUTER UN MEMBRE ============ */
function ajouterMembre() {
    compteurNouveauxMembres++;
    var container = document.getElementById("equipe-container");

    var carte = document.createElement("div");
    carte.className = "team-card";
    carte.innerHTML =
        '<button class="btn-supprimer" title="Supprimer ce membre">🗑️</button>' +
        '<div class="team-photo">' +
            '<div class="photo-reelle">??</div>' +
            '<div class="grattage">Survolez<br>pour révéler</div>' +
        '</div>' +
        '<h3>Nouveau membre</h3>' +
        '<input type="text" class="nom-edit" value="Nouveau membre">' +
        '<div class="role">Nouveau rôle</div>' +
        '<p>Description à compléter.</p>';

    container.appendChild(carte);

    carte.querySelector(".btn-supprimer").addEventListener("click", function () {
        var nom = carte.querySelector("h3").textContent;
        if (confirm("Supprimer le membre '" + nom + "' ?")) {
            carte.remove();
            console.log("[Édition] Membre supprimé : " + nom);
        }
    });

    var input = carte.querySelector(".nom-edit");
    input.addEventListener("input", function () {
        carte.querySelector("h3").textContent = this.value;
    });

    console.log("[Édition] Nouveau membre ajouté.");
}

/* ============ 6. INITIALISATION ============ */
window.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("btn-mode-edition");
    if (btn) btn.addEventListener("click", gererClicEdition);

    var btnAjouter = document.getElementById("btn-ajouter-membre");
    if (btnAjouter) btnAjouter.addEventListener("click", ajouterMembre);

    /* Synchroniser inputs et h3 sur les cartes existantes */
    document.querySelectorAll(".team-card").forEach(function (carte) {
        var input = carte.querySelector(".nom-edit");
        var titre = carte.querySelector("h3");
        if (input && titre) {
            input.addEventListener("input", function () {
                titre.textContent = this.value;
            });
        }

        var btnSup = carte.querySelector(".btn-supprimer");
        if (btnSup) {
            btnSup.addEventListener("click", function () {
                var nom = carte.querySelector("h3").textContent;
                if (confirm("Supprimer le membre '" + nom + "' ?")) {
                    carte.remove();
                    console.log("[Édition] Membre supprimé : " + nom);
                }
            });
        }
    });
});


/* ============ 7. MODALES - fiche membre au clic ============ */

/* Données complètes de chaque membre pour la modale */
var donneesMembers = [
    { nom: "Prénom Nom", role: "CEO / Chef de projet",   desc: "Coordonne l'équipe, définit la stratégie et la vision globale du projet FitLook." },
    { nom: "Prénom Nom", role: "CTO / Développeur",      desc: "Conçoit l'architecture de l'application et développe toutes les fonctionnalités." },
    { nom: "Prénom Nom", role: "CMO / Marketing",         desc: "Stratégie marketing, gestion des réseaux sociaux et partenariats avec les marques." },
    { nom: "Prénom Nom", role: "UX/UI Designer",          desc: "Crée le design de l'application pour une expérience utilisateur fluide et esthétique." }
];

function ouvrirModale(index) {
    var overlay = document.getElementById("modal-overlay");
    var mNom    = document.getElementById("modal-nom");
    var mRole   = document.getElementById("modal-role");
    var mDesc   = document.getElementById("modal-desc");

    if (!overlay) return;

    /* Trouver le nom réel depuis la carte (peut avoir été modifié en mode édition) */
    var cartes = document.querySelectorAll(".team-card");
    var nomReel = donneesMembers[index].nom;
    if (cartes[index]) {
        nomReel = cartes[index].querySelector("h3").textContent;
    }

    mNom.textContent  = nomReel;
    mRole.textContent = donneesMembers[index].role;
    mDesc.textContent = donneesMembers[index].desc;
    overlay.classList.add("visible");
}

function fermerModale() {
    var overlay = document.getElementById("modal-overlay");
    if (overlay) overlay.classList.remove("visible");
}

function initModales() {
    /* Clic sur les cartes existantes */
    var cartes = document.querySelectorAll(".team-card");
    cartes.forEach(function (carte, i) {
        carte.addEventListener("click", function (e) {
            /* Ne pas ouvrir la modale si on clique sur le bouton supprimer ou l'input */
            if (e.target.classList.contains("btn-supprimer") || e.target.tagName === "INPUT") return;
            ouvrirModale(i);
        });
    });

    /* Fermer la modale au clic sur le fond ou le bouton X */
    var overlay = document.getElementById("modal-overlay");
    if (overlay) {
        overlay.addEventListener("click", function (e) {
            if (e.target === overlay) fermerModale();
        });
    }

    var btnClose = document.getElementById("modal-close");
    if (btnClose) btnClose.addEventListener("click", fermerModale);

    /* Fermer avec Échap */
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") fermerModale();
    });
}

/* On relance initModales au chargement (s'ajoute à l'init déjà existante) */
window.addEventListener("DOMContentLoaded", function () {
    initModales();
});
