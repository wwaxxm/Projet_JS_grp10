/* nous-trouver.js */

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
        console.error("❌ [nous-trouver] Champ '" + nom + "' : obligatoire mais vide.");
        return false;
    }
    if (champ.type === "email" && valeur !== "") {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeur)) {
            console.error("❌ [nous-trouver] Champ '" + nom + "' : email invalide → " + valeur);
            return false;
        }
    }
    return true;
}

document.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
        var champs = this.querySelectorAll("input, textarea, select");
        var ok = true;
        champs.forEach(function (c) { if (!verifierSaisie(c)) ok = false; });
        if (!ok) {
            e.preventDefault();
            console.error("🚫 [nous-trouver] Soumission bloquée - erreurs de saisie.");
        }
    });
});
