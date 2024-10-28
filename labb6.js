function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

const map = L.map('map').setView([45, -110], 3); 


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


function fetchMarker(lat, lng, markerNumber) {
    const marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(`Marker ${markerNumber}`).openPopup();
    
    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
        .then(response => response.json())
        .then(data => {
            const locality = data.locality || "Error";
            document.getElementById('insidemarker').innerHTML += 
                `<div class="insidemarker">Marker ${markerNumber}: [${lat}, ${lng}]<br>Locality: ${locality}</div>`;
        })
        .catch(error => console.error('Error', error));
}


for (let i = 1; i <= 3; i++) {
    const lat = getRandomInRange(30, 35, 3);
    const lng = getRandomInRange(-90, -100, 3);
    fetchMarker(lat, lng, i);
}
