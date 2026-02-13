const gemContainer = document.getElementById('gem-container');
// const gem = gemstonesData.gemstones[0];

gemstonesData.gemstones.forEach((gem) => {
    gemContainer.innerHTML += `
    <a href="gem.html?id=${gem.id}"
    <div class="card gemstone-card m-2 col-md-5 col-xl-3 text-decoration-none">
        <div class="gem-name h2 text-center mb-4">${gem.name}</div>
        <img src="${gem.image_url}" class="mx-auto"></img>
        <div id="gem-color"><strong>Color: </strong>${gem.color}</div>
        <div id="spiritual"><strong>Spiritual properties:</strong> ${gem.spiritual_properties}</div>
        <div id="healing"><strong>Healing: </strong>${gem.physical_healing}</div>
    </div>
    </a>
    `;
})

// Example: Filter by color
function filterGems() {
  const selectedColors = getSelectedCheckboxes('color');
  const filteredGems = gemstonesData.gemstones.filter(gem => {
    if (selectedColors.length === 0) return true; // Show all if nothing selected
    return selectedColors.includes(gem.color);
  });
  displayGems(filteredGems);
}

