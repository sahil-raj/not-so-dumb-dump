"use strict";

mapboxgl.accessToken = 'pk.eyJ1Ijoic2FoaWxyYWphYXJ1IiwiYSI6ImNqNmtkM21hOTFoN2oyd3AydzN1ajEybGgifQ.QnQwBry7eBcWLzLfJ-0ryA';
      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [77.5653368, 12.9073609],
        zoom: 15,
        interactive: false
      });

      // Create a new marker.
    const marker = new mapboxgl.Marker({color: "#FF0000"}).setLngLat([77.5653368, 12.9073609]).addTo(map);