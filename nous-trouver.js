/* nous-trouver.js - Page Nous trouver */

/* 1. ANTI-PLAGIAT */
document.addEventListener("copy", function () {
    console.warn("⚠️ ATTENTION - Règles sur le plagiat :");
    console.warn("Le contenu de ce site est la propriété exclusive de FitLook.");
    console.warn("Toute reproduction sans autorisation écrite est interdite.");
    console.warn("Article L122-4 du Code de la Propriété Intellectuelle.");
});

/* 2. ERREURS DE SAISIE */
function verifierSaisie(champ) {
    var valeur = champ.value.trim();
    var nom = champ.name || champ.id || "champ inconnu";
    if (valeur === "" && champ.hasAttribute("required")) {
        console.error("❌ [Nous trouver] Champ '" + nom + "' vide et obligatoire.");
        return false;
    }
    if (champ.type === "email" && valeur !== "") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeur)) {
            console.error("❌ [Nous trouver] Email invalide : " + valeur);
            return false;
        }
    }
    return true;
}

var forms = document.querySelectorAll("form");
for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener("submit", function (e) {
        var champs = this.querySelectorAll("input, textarea, select");
        var ok = true;
        for (var j = 0; j < champs.length; j++) {
            if (!verifierSaisie(champs[j])) ok = false;
        }
        if (!ok) console.error("🚫 [Nous trouver] Soumission bloquée - erreurs de saisie.");
    });
}
console.log("📄 nous-trouver.js chargé");
