// fichier js pour gerer la page de l equipe
// TODO: demander au prof pourquoi des fois le click marche pas du 1er coup sur les tel

let modeEditOuvert = false; // letiable pour savoir si on est en train d'editer ou pas
let cmptNewGars = 0; // compteur pour les nouveaux
console.log("fichier js chargé !"); // pour verifier dans la console que ca marche

// fonction quand on clique sur le bouton edition
function clikSurEdit() {
    let leBouton = document.getElementById("btn-mode-edition"); // on recupere le bouton html par son ID

    if (modeEditOuvert == false) {
        // DEBUT DU MODE EDITION
        // prompt affiche une petite boite de dialogue pour taper du texte
        let nomAdmin = prompt("Entrez le nom du profil administrateur svp :");
        
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

        let mdp = prompt("Entrez le mot de passe administrateur svp :");
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
        // FIN DU MODE EDITION
        // confirm est comme prompt mais avec juste OK ou Annuler (renvoie true ou false)
        let reponse = confirm("Voulez-vous vraiment quitter le mode edition ?");
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
    let toutesLesCartes = document.querySelectorAll(".team-card");
    
    // forEach permet de faire une boucle facilement sur tous les elements de la liste
    toutesLesCartes.forEach(function (carteHtml) {
        // on cherche l'input et le titre specifiques a CETTE carte
        let champTexte = carteHtml.querySelector(".nom-edit");
        let titreDuGars = carteHtml.querySelector("h3");
        
        // verif securité pour pas faire planter le script si un des elements n'existe pas
        if (champTexte != null && titreDuGars != null) {
            // .trim() c'est une fonction qui nettoie le texte en enlevant les espaces vides au debut et a la fin
            let leNouveauNom = champTexte.value.trim(); 
            
            if (leNouveauNom != "") {
                titreDuGars.textContent = leNouveauNom; // on remplace le texte du h3 par ce qu'on a tapé
                console.log("nom updaté -> " + leNouveauNom);
            }
        }
    });
}

// ajoute une personne
function rajoutPersonne() {
    cmptNewGars = cmptNewGars + 1;
    let divContainer = document.getElementById("equipe-container");

    let nouvelleDiv = document.createElement("div"); // on cree un nouvel element HTML vide
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
        let sonNom = nouvelleDiv.querySelector("h3").textContent;
        if (confirm("Supprimer le membre " + sonNom + " ?")) {
            nouvelleDiv.remove(); // .remove() efface completement l'element de la page
            console.log("le membre " + sonNom + " a eté effacé");
        }
    });

    // on ecoute l'evenement "input" : ca se declenche a CHAQUE fois qu'on tape une lettre
    let champInput = nouvelleDiv.querySelector(".nom-edit");
    champInput.addEventListener("input", function () {
        // this.value correspond au texte actuellement dans l'input
        nouvelleDiv.querySelector("h3").textContent = this.value;
    });

    console.log("un nouveau gars a ete rajouté");
}

// INITIALISATION DU DEBUT
// DOMContentLoaded veut dire qu'on attend que tout le HTML de la page soit chargé avant de lancer le script
window.addEventListener("DOMContentLoaded", function () {
    let leBoutonEdit = document.getElementById("btn-mode-edition");
    if (leBoutonEdit != null) leBoutonEdit.addEventListener("click", clikSurEdit);

    let btnAjout = document.getElementById("btn-ajouter-membre");
    if (btnAjout) btnAjout.addEventListener("click", rajoutPersonne);

    // relier les inputs et les h3 sur les cartes qui sont deja dans le HTML de base
    let mesCartes = document.querySelectorAll(".team-card");
    for (let i = 0; i < mesCartes.length; i++) {
        let uneCarte = mesCartes[i]; 
        let linput = uneCarte.querySelector(".nom-edit");
        let letitre = uneCarte.querySelector("h3");
        
        if (linput && letitre) {
            linput.addEventListener("input", function () {
                // this c'est l'input ou on ecrit. parentElement permet de remonter d'un cran dans le HTML 
                // pour trouver la div globale (la carte) et ensuite chercher le h3 a l'interieur
                let h3Proche = this.parentElement.querySelector("h3");
                h3Proche.textContent = this.value;
            });
        }

        let btnSup = uneCarte.querySelector(".btn-supprimer");
        if (btnSup != null) {
            // le "e" dans function(e) c'est l'Evenement du clic
            btnSup.addEventListener("click", function (e) {
                // e.target c'est l'element precis qui a ete cliqué (le bouton)
                // en faisant parentElement, on recupere toute la carte pour pouvoir la supprimer
                let carteParent = e.target.parentElement;
                let lenom = carteParent.querySelector("h3").textContent;
                
                if (confirm("Supprimer le membre '" + lenom + "' ?")) {
                    carteParent.remove();
                    console.log("membre suprrimé: " + lenom);
                }
            });
        }
    }
});