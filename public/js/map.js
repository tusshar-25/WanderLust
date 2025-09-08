mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    center: listing.geometry.coordinates, // use directly
    zoom: 10
});


const marker = new mapboxgl.Marker({color: "#b3001b"})
    .setLngLat(listing.geometry.coordinates)   // needs [lng, lat]
    .setPopup(new mapboxgl.Popup({offset: 25, className: "custom-popup"})
    .setHTML("<h4>" + listing.title + "</h4><p>Exact location will be provided after booking</p>"))
    .addTo(map);
