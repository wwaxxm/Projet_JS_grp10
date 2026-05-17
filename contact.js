/* contact.js - Page Contact et Quiz */

/* ERREURS DE SAISIE */
function verifierSaisie(champ) { /* fonction qui prend un champ de formulaire en paramètre et vérifie que ce que l'utilisateur a écrit est correct.*/
   let valeur = champ.value.trim(); // enleve espace ne debut et en fin du texte 
   let nom = champ.name || champ.id || "champ inconnu";

/* si le champs est vide renvoie false est previens l'utilisateur */
    if (valeur === "" && champ.hasAttribute("required")) { 
        console.error(" [Contact] Champ '" + nom + "' : obligatoire mais vide.");
        return false;
    }
    /* champ.type permet de verifier si l'email est valide*/
    if (champ.type === "email" && valeur !== "") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeur)) {
            console.error(" [Contact] Email invalide → " + valeur);
            return false;
        }
    }
    /*   on verifie qu'il n'y a pas de 0,1,2...9 dans le champ nom */
    if (nom === "nom_complet" && valeur !== "") {
        if (/[0-9]/.test(valeur)) { /* si un chiffre est detecter  renvoie false*/
            console.error(" [Contact] Champ 'nom complet' : ne doit pas contenir de chiffres → '" + valeur + "'");
            return false;
        }
        console.log(" [Contact] Nom complet valide : '" + valeur + "'");
    }
    if (nom === "message" && valeur.length < 10) {
        console.error(" [Contact] Message trop court : " + valeur.length + " caractères (min 10).");
        return false;
    }

    /* si le champ est un <select> avec aucune valeur la console affiche l'erreur */
    if (champ.tagName === "SELECT" && valeur === "") { 
        console.error(" [Contact] Aucun sujet sélectionné.");
        return false;
    }
    return true;
}

/* si l'utilisateur appuie sur envoyer ses réponses la console affiche une erreur si erreur et affiche un simple message si c'est bon */
const formContact = document.getElementById ("form-contact");
if (formContact) {
    formContact.addEventListener("submit", function (e) {
        e.preventDefault();  // empêche l'envoi réel du formulaire
       let champs = this.querySelectorAll("input, textarea, select"); // this est le mot clé qui désigne l'élément sur lequel l'événement s'est produit 
       let ok = true;
        console.log(" Vérification formulaire Contact ");
        //si verifierSaisie retourne FALSE
        champs.forEach(function (c) { if (!verifierSaisie (c)) ok = false; });
        if (!ok) {
            console.error(" Soumission bloquée - corrigez les erreurs ci-dessus.");
        } else {
            console.log(" Formulaire Contact valide - envoi en cours...");
        }
    });
}

/*  QUIZ */
function verifierQuiz() {
   let bonnesReponses = { q1: "b", q2: "c", q3: "b", q4: "b" };
   let score = 0;
    console.log("--- Résultats du quiz FitLook ---");
    for (let i = 1; i <= 4; i++) {
        /*  permet d'éviter de répéter 4 fois la même ligne : */
       let rep = document.querySelector('input[name="q' + i + '"]:checked');
        if (!rep) {
            console.warn(" Question " + i + " : pas de réponse sélectionnée.");

        // rep.value = la lettre de la réponse choisie
        } else if (rep.value === bonnesReponses["q" + i]) {
            score++;
            console.log(" Question " + i + " : bonne réponse !");
        } else {
            console.log(" Question " + i + " : mauvaise réponse.");
        }
    }
   // utilisation de CSS dans JS avec style //
    console.log("Score final : " + score + "/4");
   let res = document.getElementById("quiz-result");
    res.style.display = "block";
    if (score === 4) {
        res.style.backgroundColor = "#1a3a2e"; res.style.color = "#4caf50"; res.style.border = "1px solid #4caf50";
        res.textContent = "Bravo ! " + score + "/4 — Tu connais FitLook par cœur !";
    } else if (score >= 2) {
        res.style.backgroundColor = "#2a2a0e"; res.style.color = "#ffc107"; res.style.border = "1px solid #ffc107";
        res.textContent = "Pas mal ! " + score + "/4 — Tu connais bien FitLook !";
    } else {
        res.style.backgroundColor = "#2a0e0e"; res.style.color = "#e94560"; res.style.border = "1px solid #e94560";
        res.textContent = score + "/4 — Relis notre site pour en apprendre plus !";
    }
}
