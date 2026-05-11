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
