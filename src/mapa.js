// Datos iniciales de puntos de reciclaje (10 ubicaciones en Ibagué)
const locations = [
    { 
        id: 1, 
        lat: 4.4389, 
        lng: -75.2322, 
        name: 'Centro de Ibagué', 
        address: 'Calle 10 # 5-20, Centro',
        applicantName: 'Juan Pérez',
        phone: '3123456789',
        email: 'juan.perez@email.com',
        materialType: 'Plástico',
        weight: '25 kg',
        status: 'pendiente'
    },
    { 
        id: 2, 
        lat: 4.4450, 
        lng: -75.2400, 
        name: 'Parque Centenario', 
        address: 'Carrera 5 # 10-30',
        applicantName: 'María Gómez',
        phone: '3101234567',
        email: 'maria.gomez@email.com',
        materialType: 'Papel/Cartón',
        weight: '15 kg',
        status: 'pendiente'
    },
    { 
        id: 3, 
        lat: 4.4280, 
        lng: -75.2250, 
        name: 'Terminal de Transportes', 
        address: 'Av. Ferrocarril # 12-45',
        applicantName: 'Carlos López',
        phone: '3112345678',
        email: 'carlos.lopez@email.com',
        materialType: 'Vidrio',
        weight: '30 kg',
        status: 'pendiente'
    },
    { 
        id: 4, 
        lat: 4.4500, 
        lng: -75.2150, 
        name: 'Museo Panóptico', 
        address: 'Calle 15 # 8-40',
        applicantName: 'Ana Rodríguez',
        phone: '3134567890',
        email: 'ana.rodriguez@email.com',
        materialType: 'Metales',
        weight: '20 kg',
        status: 'pendiente'
    },
    { 
        id: 5, 
        lat: 4.4350, 
        lng: -75.2200, 
        name: 'Plaza de Mercado', 
        address: 'Carrera 3 # 10-10',
        applicantName: 'Luis Martínez',
        phone: '3145678901',
        email: 'luis.martinez@email.com',
        materialType: 'Orgánico',
        weight: '40 kg',
        status: 'pendiente'
    },
    { 
        id: 6, 
        lat: 4.4420, 
        lng: -75.2300, 
        name: 'Unibagué', 
        address: 'Carrera 22 # 1-01',
        applicantName: 'Sofía Hernández',
        phone: '3156789012',
        email: 'sofia.hernandez@email.com',
        materialType: 'Electrónicos',
        weight: '12 kg',
        status: 'pendiente'
    },
    { 
        id: 7, 
        lat: 4.4250, 
        lng: -75.2350, 
        name: 'Hospital San Francisco', 
        address: 'Calle 20 # 5-50',
        applicantName: 'Pedro Díaz',
        phone: '3167890123',
        email: 'pedro.diaz@email.com',
        materialType: 'Plástico',
        weight: '18 kg',
        status: 'pendiente'
    },
    { 
        id: 8, 
        lat: 4.4600, 
        lng: -75.2100, 
        name: 'Jardín Botánico', 
        address: 'Carrera 2 # 10-60',
        applicantName: 'Laura Torres',
        phone: '3178901234',
        email: 'laura.torres@email.com',
        materialType: 'Papel/Cartón',
        weight: '22 kg',
        status: 'pendiente'
    },
    { 
        id: 9, 
        lat: 4.4300, 
        lng: -75.2150, 
        name: 'Estadio Manuel Murillo Toro', 
        address: 'Carrera 5 # 20-30',
        applicantName: 'Andrés Silva',
        phone: '3189012345',
        email: 'andres.silva@email.com',
        materialType: 'Vidrio',
        weight: '35 kg',
        status: 'pendiente'
    },
    { 
        id: 10, 
        lat: 4.4400, 
        lng: -75.2250, 
        name: 'Centro Comercial La Estación', 
        address: 'Av. Ambalá # 10-80',
        applicantName: 'Carmen Vargas',
        phone: '3190123456',
        email: 'carmen.vargas@email.com',
        materialType: 'Metales',
        weight: '28 kg',
        status: 'pendiente'
    }
];

// Equipos de cuadrilla disponibles
const teams = [
    { 
        id: 1, 
        name: 'Equipo Alpha', 
        completedToday: 3, 
        kgCollectedToday: 150,
        members: 4,
        vehicle: 'Camión F-350'
    },
    { 
        id: 2, 
        name: 'Equipo Beta', 
        completedToday: 5, 
        kgCollectedToday: 230,
        members: 3,
        vehicle: 'Camión F-250'
    },
    { 
        id: 3, 
        name: 'Equipo Gamma', 
        completedToday: 2, 
        kgCollectedToday: 90,
        members: 5,
        vehicle: 'Camión F-150'
    },
    { 
        id: 4, 
        name: 'Equipo Delta', 
        completedToday: 4, 
        kgCollectedToday: 180,
        members: 4,
        vehicle: 'Furgón Mercedes'
    },
    { 
        id: 5, 
        name: 'Equipo Épsilon', 
        completedToday: 6, 
        kgCollectedToday: 300,
        members: 3,
        vehicle: 'Camión Volvo'
    }
];

// Variables globales
let map;
let selectedLocation = null;
let selectedTeam = null;
let markers = [];
let teamMarkers = [];
let routeLayers = [];

// Función para calcular distancia ficticia (simulada)
function calculateDistance(teamIndex, locationIndex) {
    const baseDistances = [2.5, 3.8, 1.2, 4.5, 2.0, 3.3, 1.8, 4.0, 2.7, 3.5];
    const teamAdjustments = [0.5, 0.8, 0.2, 0.7, 0.3];
    
    let distance = baseDistances[locationIndex] + teamAdjustments[teamIndex];
    distance += (Math.random() * 0.5 - 0.25); // Pequeña variación aleatoria
    return Math.max(0.5, distance.toFixed(2));
}

// Inicializar mapa cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Crear el mapa
    map = L.map('map').setView([4.4389, -75.2322], 13);
    
    // Añadir capa de tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    // Crear marcadores
    createMarkers();
    
    // Inicializar iconos de Lucide
    lucide.createIcons();
});

// Crear marcadores
// Crear marcadores
function createMarkers() {
    // Recorrer cada ubicación con su índice
    locations.forEach((location, index) => {
        // El número será la posición en la lista (1-10)
        const numero = index + 1;
        
        const recycleIcon = L.divIcon({
            html: `
                <div class="relative">
                    <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                        <i data-lucide="recycle" class="w-6 h-6 text-white"></i>
                    </div>
                    <div class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                        ${numero}  <!-- Muestra 1, 2, 3... 10 -->
                    </div>
                </div>
            `,
            className: 'custom-div-icon',
            iconSize: [40, 40],
            iconAnchor: [20, 40]
        });
        
        const marker = L.marker([location.lat, location.lng], { 
            icon: recycleIcon,
            riseOnHover: true
        })
        .addTo(map)
        .bindPopup(`
            <div class="p-2">
                <h3 class="font-bold text-green-700">${location.name}</h3>
                <p class="text-sm">${location.materialType} - ${location.weight}</p>
                <p class="text-xs text-gray-500">${location.applicantName}</p>
            </div>
        `);
        
        markers.push(marker);
        
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
        <div class="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg p-4 mb-4">
            <div class="flex justify-between items-start">
                <div>
                    <h3 class="text-xl font-bold flex items-center gap-2">
                        <i data-lucide="recycle" class="w-6 h-6"></i>
                        ${location.name}
                    </h3>
                    <p class="text-sm opacity-90">Punto de Reciclaje</p>
                </div>
                <button onclick="closeInfoPanel()" class="text-white hover:text-gray-200 transition-colors">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>
            </div>
            <div class="mt-2 flex items-center gap-2">
                <span class="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">${location.materialType}</span>
                <span class="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm">${location.weight}</span>
                <span class="px-3 py-1 bg-yellow-500 rounded-full text-sm">${location.status}</span>
            </div>
        </div>
        
        <div class="px-4 pb-4 space-y-4">
            <div>
                <h4 class="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <i data-lucide="user" class="w-4 h-4"></i>
                    Información del Solicitante
                </h4>
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <p class="text-gray-500">Nombre</p>
                        <p class="font-medium">${location.applicantName}</p>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg">
                        <p class="text-gray-500">Teléfono</p>
                        <p class="font-medium">${location.phone}</p>
                    </div>
                    <div class="bg-gray-50 p-3 rounded-lg col-span-2">
                        <p class="text-gray-500">Correo Electrónico</p>
                        <p class="font-medium">${location.email}</p>
                    </div>
                </div>
            </div>
            
            <div>
                <h4 class="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <i data-lucide="map-pin" class="w-4 h-4"></i>
                    Dirección
                </h4>
                <div class="bg-gray-50 p-3 rounded-lg text-sm">
                    <p class="font-medium">${location.address}</p>
                    <p class="text-gray-500 mt-1">Ibagué, Tolima</p>
                </div>
            </div>
            
            <div class="pt-4 border-t">
                <button onclick="showTeamSelector()" class="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white rounded-lg hover:from-green-700 hover:to-emerald-800 transition-all shadow-md">
                    <i data-lucide="truck" class="w-5 h-5"></i>
                    <span class="font-semibold">Asignar Equipo de Recolección</span>
                </button>
                
                <div id="teamSelector" class="hidden mt-4 space-y-3">
                    <h5 class="font-medium text-gray-700">Selecciona un equipo:</h5>
                    <!-- Las opciones se generarán dinámicamente -->
                </div>
            </div>
            
            <div class="text-xs text-gray-500 pt-4 border-t">
                <div class="flex justify-between">
                    <p>📍 Lat: ${location.lat.toFixed(4)}</p>
                    <p>📍 Lng: ${location.lng.toFixed(4)}</p>
                </div>
                <p class="mt-1">ID: REC-${location.id.toString().padStart(3, '0')}</p>
            </div>
        </div>
    `;
    
    infoPanel.classList.remove('hidden');
    
    // Centrar mapa
    map.flyTo([location.lat, location.lng], 16);
    
    // Actualizar iconos
    lucide.createIcons();
}

// Mostrar selector de equipos
function showTeamSelector() {
    const teamSelector = document.getElementById('teamSelector');
    teamSelector.innerHTML = '';
    
    teams.forEach((team, index) => {
        const distance = calculateDistance(index, selectedLocation.id - 1);
        
        const teamCard = document.createElement('div');
        teamCard.className = 'border border-gray-200 rounded-lg p-3 hover:border-green-400 hover:bg-green-50 cursor-pointer transition-all';
        teamCard.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <h6 class="font-semibold text-gray-800">${team.name}</h6>
                    <p class="text-sm text-gray-600">${team.vehicle} • ${team.members} miembros</p>
                </div>
                <div class="text-right">
                    <p class="font-bold text-green-600">${distance} km</p>
                    <p class="text-xs text-gray-500">distancia</p>
                </div>
            </div>
            <div class="flex justify-between text-xs text-gray-600 mt-2">
                <span>✅ ${team.completedToday} solicitudes hoy</span>
                <span>♻️ ${team.kgCollectedToday} kg recolectados</span>
            </div>
        `;
        
        teamCard.addEventListener('click', () => showConfirmationModal(team, distance));
        teamSelector.appendChild(teamCard);
    });
    
    teamSelector.classList.remove('hidden');
}

// Mostrar modal de confirmación
function showConfirmationModal(team, distance) {
    selectedTeam = team;
    
    const modal = document.createElement('div');
    modal.id = 'confirmationModal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-xl max-w-md w-full transform transition-all">
            <div class="p-6">
                <div class="flex items-center gap-3 mb-4">
                    <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <i data-lucide="alert-triangle" class="w-6 h-6 text-green-600"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-gray-800 text-lg">Confirmar Asignación</h3>
                        <p class="text-gray-600 text-sm">¿Asignar esta solicitud al equipo seleccionado?</p>
                    </div>
                </div>
                
                <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-lg p-4 mb-6">
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p class="text-gray-500">Equipo asignado:</p>
                            <p class="font-semibold text-green-700">${team.name}</p>
                        </div>
                        <div>
                            <p class="text-gray-500">Distancia:</p>
                            <p class="font-semibold">${distance} km</p>
                        </div>
                        <div>
                            <p class="text-gray-500">Solicitudes hoy:</p>
                            <p class="font-semibold">${team.completedToday}</p>
                        </div>
                        <div>
                            <p class="text-gray-500">KG recolectados:</p>
                            <p class="font-semibold">${team.kgCollectedToday} kg</p>
                        </div>
                    </div>
                    <div class="mt-3 pt-3 border-t border-green-200">
                        <p class="text-gray-500 text-xs">Vehículo: ${team.vehicle}</p>
                        <p class="text-gray-500 text-xs">Miembros: ${team.members} personas</p>
                    </div>
                </div>
                
                <div class="flex gap-3">
                    <button onclick="confirmAssignment()" class="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-800 transition-all">
                        Sí, asignar equipo
                    </button>
                    <button onclick="cancelAssignment()" class="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    lucide.createIcons();
}

// Confirmar asignación
function confirmAssignment() {
    if (!selectedLocation || !selectedTeam) return;
    
    // Ocultar modal
    document.getElementById('confirmationModal').remove();
    
    // 1. Agregar marcador del equipo (en ubicación aleatoria cerca del punto)
    const offsetLat = (Math.random() * 0.01) - 0.005;
    const offsetLng = (Math.random() * 0.01) - 0.005;
    
    const teamLat = selectedLocation.lat + offsetLat;
    const teamLng = selectedLocation.lng + offsetLng;
    
    // Icono para el equipo
    const teamIcon = L.divIcon({
        html: `
            <div class="relative">
                <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-pulse">
                    <i data-lucide="truck" class="w-7 h-7 text-white"></i>
                </div>
                <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                    ${selectedTeam.name}
                </div>
            </div>
        `,
        className: 'custom-div-icon',
        iconSize: [48, 60],
        iconAnchor: [24, 60]
    });
    
    const teamMarker = L.marker([teamLat, teamLng], { 
        icon: teamIcon,
        zIndexOffset: 1000
    }).addTo(map);
    
    teamMarkers.push(teamMarker);
    
    // 2. Dibujar 3 rutas optimizadas (simuladas)
    drawOptimizedRoutes([teamLat, teamLng], [selectedLocation.lat, selectedLocation.lng]);
    
    // 3. Actualizar estado en el panel
    const infoPanel = document.getElementById('infoPanel');
    const button = infoPanel.querySelector('button');
    
    if (button) {
        button.innerHTML = `
            <i data-lucide="check-circle" class="w-5 h-5"></i>
            <span class="font-semibold">Asignado a ${selectedTeam.name}</span>
        `;
        button.className = 'w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg cursor-default shadow-md';
        button.onclick = null;
        
        // Actualizar estado
        const statusElement = infoPanel.querySelector('.bg-yellow-500');
        if (statusElement) {
            statusElement.textContent = 'asignado';
            statusElement.className = 'px-3 py-1 bg-blue-500 rounded-full text-sm text-white';
        }
    }
    
    // Actualizar iconos
    lucide.createIcons();
    
    // Mostrar notificación
    showNotification(`Equipo ${selectedTeam.name} asignado exitosamente!`);
}

// Dibujar 3 rutas optimizadas
function drawOptimizedRoutes(start, end) {
    // Limpiar rutas anteriores
    routeLayers.forEach(layer => map.removeLayer(layer));
    routeLayers = [];
    
    // Colores para las rutas
    const colors = ['#3B82F6', '#10B981', '#8B5CF6'];
    const opacities = [0.9, 0.7, 0.5];
    const weights = [4, 3, 2];
    
    // Generar 3 rutas con diferentes caminos
    for (let i = 0; i < 3; i++) {
        const points = [];
        points.push(start);
        
        // Crear puntos intermedios para simular diferentes rutas
        const segments = 3 + i; // Más segmentos para rutas "más complejas"
        for (let j = 1; j < segments; j++) {
            const fraction = j / segments;
            const midLat = start[0] + (end[0] - start[0]) * fraction;
            const midLng = start[1] + (end[1] - start[1]) * fraction;
            
            // Añadir variación aleatoria a cada ruta
            const variation = (i - 1) * 0.001; // Pequeña variación
            points.push([midLat + variation, midLng + variation]);
        }
        
        points.push(end);
        
        // Crear polilínea
        const polyline = L.polyline(points, {
            color: colors[i],
            weight: weights[i],
            opacity: opacities[i],
            dashArray: i === 0 ? null : '10, 10',
            lineCap: 'round'
        }).addTo(map);
        
        // Añadir marcador de inicio/fin para cada ruta
        if (i === 0) {
            L.circleMarker(start, {
                color: '#3B82F6',
                fillColor: '#3B82F6',
                fillOpacity: 1,
                radius: 6
            }).addTo(map);
            
            L.circleMarker(end, {
                color: '#10B981',
                fillColor: '#10B981',
                fillOpacity: 1,
                radius: 6
            }).addTo(map);
        }
        
        routeLayers.push(polyline);
    }
    
    // Ajustar vista para mostrar todas las rutas
    const bounds = L.latLngBounds([start, end]);
    routeLayers.forEach(layer => {
        bounds.extend(layer.getBounds());
    });
    map.fitBounds(bounds, { padding: [50, 50] });
}

// Cancelar asignación
function cancelAssignment() {
    selectedTeam = null;
    const modal = document.getElementById('confirmationModal');
    if (modal) modal.remove();
}

// Cerrar panel
function closeInfoPanel() {
    document.getElementById('infoPanel').classList.add('hidden');
    selectedLocation = null;
    selectedTeam = null;
    
    // Limpiar rutas y marcadores de equipo
    routeLayers.forEach(layer => map.removeLayer(layer));
    routeLayers = [];
    
    teamMarkers.forEach(marker => map.removeLayer(marker));
    teamMarkers = [];
}

// Mostrar notificación
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-0 opacity-0 transition-all duration-300';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animación de entrada
    setTimeout(() => {
        notification.classList.remove('opacity-0');
        notification.classList.add('opacity-100');
    }, 10);
    
    // Auto-remover después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('opacity-100');
        notification.classList.add('opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}