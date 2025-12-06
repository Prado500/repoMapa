// Datos iniciales
const locations = [
    { id: 1, lat: 4.4389, lng: -75.2322, name: 'Centro de Ibagué', description: 'Plaza de Bolívar y alrededores. Corazón histórico de la ciudad musical.' },
    { id: 2, lat: 4.4450, lng: -75.2400, name: 'Parque Centenario', description: 'Pulmón verde de la ciudad, ideal para caminatas y eventos culturales.' },
    { id: 3, lat: 4.4280, lng: -75.2250, name: 'Terminal de Transportes', description: 'Principal punto de conexión terrestre para viajeros hacia y desde Ibagué.' },
    { id: 4, lat: 4.4500, lng: -75.2150, name: 'Museo Panóptico', description: 'Antigua prisión convertida en un complejo cultural y museo moderno.' }
];

// Variables globales
let map;
let selectedLocation = null;
let markers = [];

// Inicializar mapa cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Crear el mapa
    map = L.map('map').setView([4.4389, -75.2322], 14);
    
    // Añadir capa de tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    // Crear marcadores
    createMarkers();
});

// Crear marcadores
function createMarkers() {
    locations.forEach(location => {
        // Crear marcador
        const marker = L.marker([location.lat, location.lng])
            .addTo(map)
            .bindPopup(`<b>${location.name}</b>`);
        
        // Guardar referencia
        markers.push(marker);
        
        // Evento click
        marker.on('click', function() {
            showLocationInfo(location);
        });
    });
}

// Mostrar información de ubicación
function showLocationInfo(location) {
    selectedLocation = location;
    
    const infoPanel = document.getElementById('infoPanel');
    
    infoPanel.innerHTML = `
        <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
                <i data-lucide="map-pin" class="w-5 h-5 text-red-500"></i>
                ${location.name}
            </h3>
            <button onclick="closeInfoPanel()" class="text-gray-500 hover:text-gray-700 transition-colors">
                <i data-lucide="x" class="w-5 h-5"></i>
            </button>
        </div>
        
        <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-semibold text-gray-600">Descripción:</span>
                <button onclick="enableEdit()" class="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm">
                    <i data-lucide="edit-2" class="w-4 h-4"></i>
                    Editar
                </button>
            </div>
            
            <div id="descriptionView">
                <p class="text-gray-700 leading-relaxed text-sm">${location.description}</p>
            </div>
            
            <div id="descriptionEdit" class="hidden">
                <textarea id="editTextarea" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800" rows="4">${location.description}</textarea>
                <div class="flex gap-2 mt-3">
                    <button onclick="saveDescription()" class="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <i data-lucide="save" class="w-4 h-4"></i>
                        Guardar
                    </button>
                    <button onclick="cancelEdit()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
        
        <div class="text-xs text-gray-500 border-t pt-3">
            <p>📍 Lat: ${location.lat.toFixed(4)}</p>
            <p>📍 Lng: ${location.lng.toFixed(4)}</p>
        </div>
    `;
    
    // Mostrar panel
    infoPanel.classList.remove('hidden');
    
    // Centrar mapa en la ubicación
    map.flyTo([location.lat, location.lng], 15);
    
    // Actualizar iconos
    lucide.createIcons();
}

// Cerrar panel
function closeInfoPanel() {
    document.getElementById('infoPanel').classList.add('hidden');
    selectedLocation = null;
}

// Habilitar edición
function enableEdit() {
    document.getElementById('descriptionView').classList.add('hidden');
    document.getElementById('descriptionEdit').classList.remove('hidden');
}

// Cancelar edición
function cancelEdit() {
    document.getElementById('descriptionView').classList.remove('hidden');
    document.getElementById('descriptionEdit').classList.add('hidden');
}

// Guardar descripción
function saveDescription() {
    const newDescription = document.getElementById('editTextarea').value;
    
    if (selectedLocation) {
        // Actualizar en el array
        const index = locations.findIndex(loc => loc.id === selectedLocation.id);
        if (index !== -1) {
            locations[index].description = newDescription;
        }
        
        // Actualizar vista
        selectedLocation.description = newDescription;
        
        // Volver a vista normal
        cancelEdit();
        
        // Actualizar el texto en la vista
        document.querySelector('#descriptionView p').textContent = newDescription;
    }
}