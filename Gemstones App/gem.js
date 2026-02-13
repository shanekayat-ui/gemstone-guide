document.addEventListener('DOMContentLoaded', function() {
  const gemPageContainer = document.getElementById('gem-page-container');
  const urlParams = new URLSearchParams(window.location.search);
  const gemId = parseInt(urlParams.get('id'));
  
  const currentGem = gemstonesData.gemstones.find(g => g.id === gemId);
  // Then use it like this:
    const lusterData = lusterInfo[currentGem.luster] || {
    description: "Information not available for this luster type.",
    examples: []
    };
    if (lusterData) {
    console.log(lusterData.description);
    console.log(lusterData.examples);
    }

  gemPageContainer.innerHTML += `
<div class="m-2 row justify-content-center">
    <div class="gem-name h2 mt-2 text-center display-1">${currentGem.name}</div>
    <img src="${currentGem.image_url}" class="mx-auto my-3"></img>
    <div id="gemInfo" class="row m-2">
        <div id="gem-color" class="fs-5 my-1"><strong>Color: </strong>${currentGem.color}</div>
        
        <!-- Hardness Scale -->
        <div id="hardness-scale" class="fs-5 my-3">
            <strong>Hardness: </strong>${currentGem.hardness} / 10 (Mohs Scale)
            <div class="hardness-slider-container mt-2">
                <input type="range" class="form-range hardness-slider" min="1" max="10" step="0.5" value="${currentGem.hardness}" disabled>
                <div class="hardness-labels d-flex justify-content-between">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                </div>
            </div>
        </div>
        
        <div id="luster" class="fs-5 my-1"><strong>Luster: </strong>
            <a href="#" class="text-decoration-none" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="${lusterData.description}">${currentGem.luster}</a>
            <i class="bi bi-info-circle"></i>
        </div>
        <div id="element" class="fs-5 my-1"><strong>Element: </strong>${currentGem.element}</div>
        <div id="chakra" class="fs-5 my-1"><strong>Chakra: </strong>${currentGem.chakra}</div>
        <div id="zodiac" class="fs-5 my-1"><strong>Zodiac: </strong>${currentGem.zodiac}</div>
        <div id="spiritual" class="fs-5 my-1"><strong>Spiritual properties:</strong> ${currentGem.spiritual_properties}</div>
        <div id="healing" class="fs-5 my-1"><strong>Healing: </strong>${currentGem.physical_healing}</div>
        <div id="trivia" class="fs-1 my-3 text-center">${currentGem.trivia}</div>
    </div>    
</div>
`;
// Initialize Bootstrap popovers AFTER adding the HTML
const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));
});




