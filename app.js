// At the top of app.js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/gemstone-guide/sw.js')
    .then(reg => console.log('Service Worker registered'))
    .catch(err => console.log('Service Worker registration failed'));
}

document.addEventListener('DOMContentLoaded', function() {
  const gemstoneGrid = document.getElementById('gemstone-grid');
  const resultsCount = document.getElementById('results-count');
  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearch');
  
  // Get all filter checkboxes
  const colorFilters = document.querySelectorAll('.color-filter');
  const chakraFilters = document.querySelectorAll('.chakra-filter');
  const zodiacFilters = document.querySelectorAll('.zodiac-filter');
  const elementFilters = document.querySelectorAll('.element-filter');
  const clearButton = document.getElementById('clearFilters');

  // Display all gems initially - SORTED ALPHABETICALLY
  displayGems(sortGemstones(gemstonesData.gemstones, 'name'));

  // Add event listeners to all filters
  [...colorFilters, ...chakraFilters, ...zodiacFilters, ...elementFilters].forEach(checkbox => {
    checkbox.addEventListener('change', filterGems);
  });

  // Search input listener
  searchInput.addEventListener('input', filterGems);

  // Clear search button
  clearSearchBtn.addEventListener('click', function() {
    searchInput.value = '';
    filterGems();
  });

  // Clear all filters (updated to also clear search)
  clearButton.addEventListener('click', function() {
    [...colorFilters, ...chakraFilters, ...zodiacFilters, ...elementFilters].forEach(cb => {
      cb.checked = false;
    });
    searchInput.value = '';
    displayGems(sortGemstones(gemstonesData.gemstones, 'name')); // Sorted
  });

  // Main filter function (UPDATED with search)
  function filterGems() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedColors = getCheckedValues(colorFilters);
    const selectedChakras = getCheckedValues(chakraFilters);
    const selectedZodiacs = getCheckedValues(zodiacFilters);
    const selectedElements = getCheckedValues(elementFilters);

    const filtered = gemstonesData.gemstones.filter(gem => {
      // Search filter - searches across multiple fields
      const matchesSearch = searchTerm === '' || 
                            gem.name.toLowerCase().includes(searchTerm) ||
                            gem.color.toLowerCase().includes(searchTerm) ||
                            gem.spiritual_properties.toLowerCase().includes(searchTerm) ||
                            gem.physical_healing.toLowerCase().includes(searchTerm) ||
                            gem.trivia.toLowerCase().includes(searchTerm) ||
                            gem.chakra.toLowerCase().includes(searchTerm) ||
                            gem.element.toLowerCase().includes(searchTerm) ||
                            gem.zodiac.toLowerCase().includes(searchTerm);

      // Color filter - flexible matching
      const matchesColor = selectedColors.length === 0 || 
                           selectedColors.some(color => {
                             const gemColor = gem.color.toLowerCase();
                             const filterColor = color.toLowerCase();
                             
                             if (filterColor === 'red' && (gemColor.includes('red') || gemColor.includes('orange'))) return true;
                             if (filterColor === 'brown' && (gemColor.includes('brown') || gemColor.includes('gold'))) return true;
                             if (filterColor === 'purple' && (gemColor.includes('purple') || gemColor.includes('violet'))) return true;
                             if (filterColor === 'clear' && (gemColor.includes('white') || gemColor.includes('clear') || gemColor.includes('colorless'))) return true;
                             if (filterColor === 'gray' && (gemColor.includes('gray') || gemColor.includes('grey') || gemColor.includes('silver') || gemColor.includes('metallic'))) return true;
                             if (filterColor === 'pink' && gemColor.includes('pink')) return true;
                             if (filterColor === 'yellow' && (gemColor.includes('yellow') || gemColor.includes('golden'))) return true;
                             if (filterColor === 'black' && gemColor.includes('black')) return true;
                             if (filterColor === 'blue' && gemColor.includes('blue')) return true;
                             if (filterColor === 'green' && gemColor.includes('green')) return true;
                             
                             return gemColor.includes(filterColor);
                           });
      
      // Chakra filter - includes "all" handling
      const matchesChakra = selectedChakras.length === 0 || 
                            gem.chakra.toLowerCase().includes('all') ||
                            selectedChakras.some(chakra => gem.chakra.includes(chakra));
      
      // Zodiac filter - includes "all" handling
      const matchesZodiac = selectedZodiacs.length === 0 || 
                            gem.zodiac.toLowerCase().includes('all') ||
                            selectedZodiacs.some(zodiac => gem.zodiac.includes(zodiac));
      
      // Element filter - includes "all" handling
      const matchesElement = selectedElements.length === 0 || 
                             gem.element.toLowerCase().includes('all') ||
                             selectedElements.some(element => gem.element.includes(element));

      return matchesSearch && matchesColor && matchesChakra && matchesZodiac && matchesElement;
    });

    displayGems(sortGemstones(filtered, 'name'));
  }

  // Helper function to get checked values
  function getCheckedValues(checkboxes) {
    return Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);
  }

  // Sort function
  function sortGemstones(gems, sortBy = 'name') {
    return [...gems].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'hardness') {
        return b.hardness - a.hardness; // High to low
      }
      return 0;
    });
  }

  // Display gems in grid
function displayGems(gems) {
  resultsCount.textContent = `Showing ${gems.length} gemstone${gems.length !== 1 ? 's' : ''}`;
  
  if (gems.length === 0) {
    gemstoneGrid.innerHTML = '<div class="col-12"><p class="text-center">No gemstones match your filters.</p></div>';
    return;
  }
  
  let html = '';
  gems.forEach((gem, index) => {
    html += `
      <div class="col-md-4 col-lg-3 mb-4">
        <div class="card h-100" style="animation-delay: ${index * 0.05}s;">
          <img src="${gem.image_url}" class="card-img-top" alt="${gem.name}">
          <div class="card-body">
            <h5 class="card-title">${gem.name}</h5>
            <p class="card-text">
              <strong>Element:</strong> ${gem.element}<br>
              <strong>Zodiac:</strong> ${gem.zodiac}<br>
              <strong>Chakra:</strong> ${gem.chakra}
            </p>
            <a href="gem.html?id=${gem.id}" class="btn btn-outline-danger">View Details</a>
          </div>
        </div>
      </div>
    `;
  });
  gemstoneGrid.innerHTML = html;
}
});

