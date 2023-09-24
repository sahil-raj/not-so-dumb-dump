"use strict";

let myForm = document.getElementById("my-form");
let user = document.getElementById("my-user");
let pass = document.getElementById("my-pass");

let myPos = undefined;
let grv = undefined;


$.post("/login_handler", { data: { name: "sa", password: "sa" } }, function (rv) {
    grv = rv;
    $("#my-form-con").fadeOut();
    $("#real-player").fadeIn();
    mapboxgl.accessToken = 'pk.eyJ1Ijoic2FoaWxyYWphYXJ1IiwiYSI6ImNqNmtkM21hOTFoN2oyd3AydzN1ajEybGgifQ.QnQwBry7eBcWLzLfJ-0ryA';
    var mapyMap = new mapboxgl.Map({
        container: 'map-cont-2',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [77.5653368, 12.9073609],
        zoom: 10,
        interactive: true
    });
    // console.log(rv.data.markers);
    for (let i = 0; i < rv.data.markers.cordinates.length; ++i) {
        // console.log(rv.data.markers.cordinates[i]);
        let myMarker = new mapboxgl.Marker({ color: rv.data.markers.cordinates[i].color }).setLngLat(rv.data.markers.cordinates[i].pos).addTo(mapyMap);

    }

    for (let i = 0; i < rv.data.markers.cordinates.length; ++i) {
        let myEle = '<tr><th scope="row">' + (i + 1) + '</th><td><div class="my-div-div" style="background-color:' + rv.data.markers.cordinates[i].color + '"></div></td><td>' + rv.data.markers.cordinates[i].pos[0] + '</td><td>' + rv.data.markers.cordinates[i].pos[1] + '</td><td>' + rv.data.markers.cordinates[i].filled + '</td><td>' + rv.data.markers.cordinates[i].clear + '</td></tr>';
        $("#my-tbody").append(myEle);
    }

});

$("#great-bin").click(() => {
    navigator.geolocation.getCurrentPosition(
        (p) => {
            myPos = [p.coords.longitude, p.coords.latitude];
            console.log(myPos);
            function disCal(a, b) {
                let d = Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
                return d;
            }

            function myFunc() {
                if (grv != undefined) {
                    let minDis = disCal(grv.data.markers.cordinates[0].pos, myPos);
                    let minDisE = 1;
                    for (let i = 1; i < grv.data.markers.cordinates.length; ++i) {
                        if (disCal(grv.data.markers.cordinates[i].pos, myPos) <= minDis) {
                            minDis = disCal(grv.data.markers.cordinates[i].pos, myPos);
                            minDisE = i + 1;
                        }
                    }
                    alert("Nearest Dustbin is " + minDisE + " at a distance of " + minDis);
                } else {
                    myFunc();
                    console.log("test");
                }
            }
            myFunc();
        }
    );
});
