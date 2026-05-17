// fichier js pour gerer la page de l equipe
// TODO: demander au prof pourquoi des fois le click marche pas du 1er coup sur les tel

var modeEditOuvert = false; // variable pour savoir si on est en train d'editer ou pas
var cmptNewGars = 0; // compteur pour les nouveaux
console.log("fichier js chargé !"); // pour verifier dans la console que ca marche

// fonction quand on clique sur le bouton edition
function clikSurEdit() {
    var leBouton = document.getElementById("btn-mode-edition"); // on recupere le bouton html par son ID

    if (modeEditOuvert == false) {
        // --- DEBUT DU MODE EDITION ---
        // prompt affiche une petite boite de dialogue pour taper du texte
        var nomAdmin = prompt("Entrez le nom du profil administrateur svp :");
        
        if (nomAdmin == null) {
            console.log("il a annulé");
            return; // le return tout seul permet d'arreter immediatement la fonction ici
        }
        if (nomAdmin != "admin") {
            alert("Nom administrateur incorrect !");
            console.error("Erreur, faux nom admin : " + nomAdmin);
            return;
        }
        console.log("ok admin");

        var mdp = prompt("Entrez le mot de passe administrateur svp :");
        if (mdp == null) {
            console.log("annulé au mdp");
            return;
        }
        if (mdp != "admin_pwd") {
            alert("Mot de passe incorrect !");
            console.error("Le mot de passe est pas bon.");
            return;
        }
        console.log("mdp ok.");

        modeEditOuvert = true;
        // classList.add rajoute une classe CSS sur tout le corps de la page 
        // ca permet de changer l'apparence de plein de trucs d'un coup via le CSS
        document.body.classList.add("mode-edition"); 
        leBouton.classList.add("actif");
        leBouton.textContent = "Mode edition actif"; // change le texte ecrit dans le bouton
        console.log("MODE EDITION ALLUMÉ.");

    } else {
        // --- FIN DU MODE EDITION ---
        // confirm est comme prompt mais avec juste OK ou Annuler (renvoie true ou false)
        var reponse = confirm("Voulez-vous vraiment quitter le mode edition ?");
        if (reponse == false) {
            console.log("finalement non");
            return;
        }

        saveLesNoms(); // appel de la fct de sauvegarde avant de fermer

        modeEditOuvert = false;
        document.body.classList.remove("mode-edition"); // on enleve la classe CSS
        leBouton.classList.remove("actif");
        leBouton.textContent = "Mode edition";
        console.log("Mode edition etaint. On est revenu normal.");
    }
}

// fonction pour garder les noms modifiés en memoire
function saveLesNoms() {
    // querySelectorAll recupere une liste de tous les elements qui ont cette classe
    var toutesLesCartes = document.querySelectorAll(".team-card");
    
    // forEach permet de faire une boucle facilement sur tous les elements de la liste
    toutesLesCartes.forEach(function (carteHtml) {
        // on cherche l'input et le titre specifiques a CETTE carte
        var champTexte = carteHtml.querySelector(".nom-edit");
        var titreDuGars = carteHtml.querySelector("h3");
        
        // verif securité pour pas faire planter le script si un des elements n'existe pas
        if (champTexte != null && titreDuGars != null) {
            // .trim() c'est une fonction qui nettoie le texte en enlevant les espaces vides au debut et a la fin
            var leNouveauNom = champTexte.value.trim(); 
            
            if (leNouveauNom != "") {
                titreDuGars.textContent = leNouveauNom; // on remplace le texte du h3 par ce qu'on a tapé
                console.log("nom updaté -> " + leNouveauNom);
            }
        }
    });
}

// ajoute une personne a la fin
function rajoutPersonne() {
    cmptNewGars = cmptNewGars + 1;
    var divContainer = document.getElementById("equipe-container");

    var nouvelleDiv = document.createElement("div"); // on cree un nouvel element HTML vide
    nouvelleDiv.className = "team-card"; // on lui donne la classe css pour qu'il ait le bon style
    
    // innerHTML permet d'injecter directement un gros bloc de code HTML sous forme de texte 
    // au lieu de devoir creer chaque petit element un par un avec createElement, c'est plus rapide
    nouvelleDiv.innerHTML =
        "<button class='btn-supprimer' title='Supprimer ce membre'>Supprimer</button>" +
        "<div class='team-photo'>" +
            "<div class='photo-reelle'>??</div>" +
            "<div class='grattage'>Survolez<br>pour reveler</div>" +
        "</div>" +
        "<h3>Nouveau membre</h3>" +
        "<input type='text' class='nom-edit' value='Nouveau membre'>" +
        "<div class='role'>Nouveau role</div>" +
        "<p>Description a completer.</p>";

    // appendChild ajoute notre nouvelleDiv a la fin du conteneur sur la page web
    divContainer.appendChild(nouvelleDiv);

    // systeme pour le bouton supprimer de la NOUVELLE div
    nouvelleDiv.querySelector(".btn-supprimer").addEventListener("click", function () {
        var sonNom = nouvelleDiv.querySelector("h3").textContent;
        if (confirm("Supprimer le membre " + sonNom + " ?")) {
            nouvelleDiv.remove(); // .remove() efface completement l'element de la page
            console.log("le membre " + sonNom + " a eté effacé");
        }
    });

    // on ecoute l'evenement "input" : ca se declenche a CHAQUE fois qu'on tape une lettre
    var champInput = nouvelleDiv.querySelector(".nom-edit");
    champInput.addEventListener("input", function () {
        // this.value correspond au texte actuellement dans l'input
        nouvelleDiv.querySelector("h3").textContent = this.value;
    });

    console.log("un nouveau gars a ete rajouté");
}

// INITIALISATION DU DEBUT
// DOMContentLoaded veut dire qu'on attend que tout le HTML de la page soit chargé avant de lancer le script
window.addEventListener("DOMContentLoaded", function () {
    var leBoutonEdit = document.getElementById("btn-mode-edition");
    if (leBoutonEdit != null) leBoutonEdit.addEventListener("click", clikSurEdit);

    var btnAjout = document.getElementById("btn-ajouter-membre");
    if (btnAjout) btnAjout.addEventListener("click", rajoutPersonne);

    // relier les inputs et les h3 sur les cartes qui sont deja dans le HTML de base
    var mesCartes = document.querySelectorAll(".team-card");
    for (var i = 0; i < mesCartes.length; i++) {
        var uneCarte = mesCartes[i]; 
        var linput = uneCarte.querySelector(".nom-edit");
        var letitre = uneCarte.querySelector("h3");
        
        if (linput && letitre) {
            linput.addEventListener("input", function () {
                // this c'est l'input ou on ecrit. parentElement permet de remonter d'un cran dans le HTML 
                // pour trouver la div globale (la carte) et ensuite chercher le h3 a l'interieur
                var h3Proche = this.parentElement.querySelector("h3");
                h3Proche.textContent = this.value;
            });
        }

        var btnSup = uneCarte.querySelector(".btn-supprimer");
        if (btnSup != null) {
            // le "e" dans function(e) c'est l'Evenement du clic
            btnSup.addEventListener("click", function (e) {
                // e.target c'est l'element precis qui a ete cliqué (le bouton)
                // en faisant parentElement, on recupere toute la carte pour pouvoir la supprimer
                var carteParent = e.target.parentElement;
                var lenom = carteParent.querySelector("h3").textContent;
                
                if (confirm("Supprimer le membre '" + lenom + "' ?")) {
                    carteParent.remove();
                    console.log("membre suprrimé: " + lenom);
                }
            });
        }
    }
});


// ---------------------------------------------------------
// PARTIE SUR LES MODALES (les trucs qui s ouvrent au clic)
// ---------------------------------------------------------

// tableau avec toutes les données (objets JSON) qu'on va afficher dans la popup
var baseDeDonneesMembres = [
    { nom: "Prénom Nom", role: "CEO / Chef de projet",   desc: "Coordonne l'equipe, definit la strategie et la vision globale du projet FitLook." },
    { nom: "Prénom Nom", role: "CTO / Developpeur",      desc: "Concoit l'architecture de l'application et developpe toutes les fonctionnalites." },
    { nom: "Prénom Nom", role: "CMO / Marketing",         desc: "Strategie marketing, gestion des reseaux sociaux et partenariats avec les marques." },
    { nom: "Prénom Nom", role: "UX/UI Designer",          desc: "Cree le design de l'application pour une experience utilisateur fluide et esthetique." }
];

// indexDuTab correspond au numero du membre (0, 1, 2 ou 3)
function ouvrirFenetreModale(indexDuTab) {
    var leFondGris = document.getElementById("modal-overlay");
    var titreM = document.getElementById("modal-nom");
    var roleM = document.getElementById("modal-role");
    var descM = document.getElementById("modal-desc");

    if (leFondGris == null) {
        return; // securité au cas ou la modale n'existe pas dans le html
    }

    // on essaie de trouver le nom dans la carte parce qu'il a ptet ete modifié avec le mode edition
    var toutesCartes = document.querySelectorAll(".team-card");
    var leVraiNom = baseDeDonneesMembres[indexDuTab].nom; // nom par defaut du tableau
    
    // si la carte existe bien sur la page, on prend le nom ecrit dans le h3 a la place
    if (toutesCartes[indexDuTab] != null) {
        leVraiNom = toutesCartes[indexDuTab].querySelector("h3").textContent;
    }

    // on met a jour les textes a l'interieur de la modale en piochant dans notre tableau
    titreM.textContent = leVraiNom;
    roleM.textContent = baseDeDonneesMembres[indexDuTab].role;
    descM.textContent = baseDeDonneesMembres[indexDuTab].desc;
    
    leFondGris.classList.add("visible"); // affiche la popup (le css gere l'opacité et l'affichage)
}

function fermerPopup() {
    var fondO = document.getElementById("modal-overlay");
    if (fondO != null) {
        fondO.classList.remove("visible"); // on retire la classe pour cacher
    }
}

function demarrerModales() {
    // pour le clic sur les cartes
    var lesCards = document.querySelectorAll(".team-card");
    // "c" c'est la carte actuelle de la boucle, "numero" c'est son index (0, 1, 2...)
    lesCards.forEach(function (c, numero) {
        c.addEventListener("click", function (evt) {
            // evt.target c'est l'endroit exact ou la souris a cliqué
            // on verifie si on n'a pas cliqué sur le bouton supprimer ou sur le champ de texte
            // si oui, on fait un "return" pour arreter la fonction et NE PAS ouvrir la modale
            if (evt.target.className == "btn-supprimer" || evt.target.tagName == "INPUT") {
                return; 
            }
            ouvrirFenetreModale(numero); // sinon on ouvre avec le bon numero
        });
    });

    // on ferme si on clic dans le vide (sur le fond gris)
    var overlayBg = document.getElementById("modal-overlay");
    if (overlayBg) {
        overlayBg.addEventListener("click", function (event) {
            // on s'assure qu'on a bien cliqué sur le fond et pas sur la boite blanche au milieu
            if (event.target == overlayBg) {
                fermerPopup();
            }
        });
    }

    var boutonCroix = document.getElementById("modal-close");
    if (boutonCroix) {
        boutonCroix.addEventListener("click", fermerPopup);
    }

    // pour fermer avec la touche echap du clavier
    // keydown ecoute toutes les touches pressées sur le clavier entier (document)
    document.addEventListener("keydown", function (e) {
        if (e.key == "Escape") { // on verifie si la touche est bien la touche Echap
            fermerPopup();
        }
    });
}

// on lance les modales au chargement de la page
window.addEventListener("DOMContentLoaded", function () {
    demarrerModales();
});