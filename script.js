// Fonction pour rechercher les établissements par ville
async function searchEtablissements() {
  const searchInput = document.getElementById("searchInput").value;
  const response = await fetch(
    `http://localhost:3001/etablissements/${searchInput}`
  );
  const data = await response.json();
  displayResults(data);
}

// Fonction pour afficher les résultats de recherche
function displayResults(etablissements) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (etablissements.length === 0) {
    resultsDiv.innerHTML = "<p>Aucun établissement trouvé.</p>";
    return;
  }

  etablissements.forEach((etablissement) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "result-item";
    itemDiv.innerHTML = `
                <p><strong>${etablissement.appellation_officielle}</strong></p>
                <p>${etablissement.adresse_uai}, ${etablissement.code_postal_uai} ${etablissement.localite_acheminement_uai}</p>
                <p>${etablissement.denomination_principale}</p>
            `;
    resultsDiv.appendChild(itemDiv);
  });
}
