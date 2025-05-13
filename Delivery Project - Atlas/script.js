const searchInput = document.getElementById('searchInput');
const searchContainer = document.getElementById('searchContainer');
const mapDiv = document.getElementById('map');
const hero = document.getElementById('hero');
let mapInitialized = false;

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchContainer.classList.add('top');
    mapDiv.classList.add('active');
    hero.style.display = 'flex';
    document.querySelector('.branding').style.display = 'none';

        // Envoi de la requête à un serveur Python
        const query = searchInput.value;

        fetch('http://localhost:5000/recherche', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recherche: query })
        })
        .then(res => res.json())
        .then(data => console.log('Réponse Python:', data))
        .catch(err => console.error('Erreur serveur:', err));

    if (!mapInitialized) {
      initMap();
      mapInitialized = true;
    }
  }
});

function initMap() {
  const map = L.map('map', {
    worldCopyJump: false,
    maxBoundsViscosity: 1.0,
    zoomSnap: 0.25,
    minZoom: 2,
    maxZoom: 6,
    zoomControl: false,
    maxBounds: [[-85, -180], [85, 180]]
  }).setView([20, 0], 2);

  map.on('drag', () => {
    map.panInsideBounds(map.options.maxBounds, { animate: false });
  });

  fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
    .then(response => response.json())
    .then(geoData => {
      L.geoJSON(geoData, {
        style: {
          color: '#00ffff',
          weight: 1,
          fillColor: '#0077be',
          fillOpacity: 0.5
        },
        onEachFeature: (feature, layer) => {
          layer.on('click', () => {
            alert(`Pays : ${feature.properties.name}`);
          });
          layer.on('mouseover', () => {
            layer.setStyle({ fillColor: '#00d4ff' });
          });
          layer.on('mouseout', () => {
            layer.setStyle({ fillColor: '#0077be' });
          });
        }
      }).addTo(map);
    });

  const backButton = document.createElement('button');
  backButton.textContent = 'Accueil';
  backButton.style.position = 'fixed';
  backButton.style.top = '20px';
  backButton.style.right = '20px';
  backButton.style.padding = '10px 20px';
  backButton.style.borderRadius = '20px';
  backButton.style.background = '#0077be';
  backButton.style.color = 'white';
  backButton.style.border = 'none';
  backButton.style.zIndex = '1000';
  backButton.style.cursor = 'pointer';
  document.body.appendChild(backButton);

  backButton.addEventListener('click', () => {
    mapDiv.classList.remove('active');
    searchContainer.classList.remove('top');
    hero.style.display = 'flex';
    document.querySelector('.branding').style.display = 'flex';
  });
}