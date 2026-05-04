/* contact.js - Page Contact + Quiz */

/* 1. ANTI-PLAGIAT */
document.addEventListener("copy", function () {
    console.warn("⚠️ ATTENTION - Règles sur le plagiat :");
    console.warn("Le contenu de ce site est la propriété exclusive de FitLook.");
    console.warn("Toute reproduction sans autorisation écrite est interdite.");
    console.warn("Article L122-4 du Code de la Propriété Intellectuelle.");
});

/* 2. ERREURS DE SAISIE - vérification poussée pour le formulaire contact */
function verifierSaisie(champ) {
    var valeur = champ.value.trim();
    var nom = champ.name || champ.id || "champ inconnu";

    if (valeur === "" && champ.hasAttribute("required")) {
        console.error("❌ [Contact] Champ '" + nom + "' : obligatoire mais vide.");
        return false;
    }
    if (champ.type === "email" && valeur !== "") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeur)) {
            console.error("❌ [Contact] Champ '" + nom + "' : email invalide → " + valeur);
            return false;
        }
    }
    if (nom === "message" && valeur.length < 10) {
        console.error("❌ [Contact] Champ 'message' trop court : " + valeur.length + " caractères (min 10).");
        return false;
    }
    if (champ.tagName === "SELECT" && valeur === "") {
        console.error("❌ [Contact] Champ '" + nom + "' : aucun sujet sélectionné.");
        return false;
    }
    console.log("✅ [Contact] Champ '" + nom + "' valide.");
    return true;
}

var formContact = document.getElementById("form-contact");
if (formContact) {
    formContact.addEventListener("submit", function (e) {
        e.preventDefault();
        var champs = this.querySelectorAll("input, textarea, select");
        var ok = true;
        console.log("--- Vérification formulaire Contact ---");
        for (var j = 0; j < champs.length; j++) {
            if (!verifierSaisie(champs[j])) ok = false;
        }
        if (!ok) {
            console.error("🚫 Soumission bloquée - corrigez les erreurs ci-dessus.");
        } else {
            console.log("✅ Formulaire valide - envoi en cours...");
        }
    });
}

/* 3. QUIZ */
function verifierQuiz() {
    var bonnesReponses = { q1: "b", q2: "c", q3: "b", q4: "b" };
    var score = 0;
    console.log("--- Résultats du quiz FitLook ---");
    for (var i = 1; i <= 4; i++) {
        var rep = document.querySelector('input[name="q' + i + '"]:checked');
        if (!rep) {
            console.warn("⚠️ Question " + i + " : pas de réponse.");
        } else if (rep.value === bonnesReponses["q" + i]) {
            score++;
            console.log("✅ Question " + i + " : bonne réponse !");
        } else {
            console.log("❌ Question " + i + " : mauvaise réponse.");
        }
    }
    console.log("Score : " + score + "/4");
    var res = document.getElementById("quiz-result");
    res.style.display = "block";
    if (score === 4) {
        res.style.backgroundColor = "#1a3a2e";
        res.style.color = "#4caf50";
        res.style.border = "1px solid #4caf50";
        res.textContent = "Bravo ! " + score + "/4 — Tu connais FitLook par cœur !";
    } else if (score >= 2) {
        res.style.backgroundColor = "#2a2a0e";
        res.style.color = "#ffc107";
        res.style.border = "1px solid #ffc107";
        res.textContent = "Pas mal ! " + score + "/4 — Tu connais bien FitLook !";
    } else {
        res.style.backgroundColor = "#2a0e0e";
        res.style.color = "#e94560";
        res.style.border = "1px solid #e94560";
        res.textContent = score + "/4 — Relis notre site pour en apprendre plus !";
    }
}
console.log("📄 contact.js chargé");
