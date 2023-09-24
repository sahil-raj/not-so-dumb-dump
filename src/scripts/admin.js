"use strict";

let myForm = document.getElementById("my-form");
let user = document.getElementById("my-user");
let pass = document.getElementById("my-pass");

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    $.post("/login_handler", { data: { name: user.value, password: pass.value } }, function (rv) {
        if (rv.found != true)
            alert("Please check username and password");
        else {
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
        }

        for (let i = 0; i < rv.data.markers.cordinates.length; ++i) {
            let myEle = '<tr><th scope="row">' + (i + 1) + '</th><td><div class="my-div-div" style="background-color:' + rv.data.markers.cordinates[i].color + '"></div></td><td>' + rv.data.markers.cordinates[i].pos[0] + '</td><td>' + rv.data.markers.cordinates[i].pos[1] + '</td><td>' + rv.data.markers.cordinates[i].filled + '</td><td>' + rv.data.markers.cordinates[i].clear + '</td></tr>';
            $("#my-tbody").append(myEle);
        }
    });
});

$("#eff-path").click(() => {
    $("#real-player").fadeOut();
    $("#player-2").fadeIn();
});

let coolForm = document.getElementById("cool-form");
let map2d = document.getElementById("exampleInputEmail1");
let startP = document.getElementById("exampleInputPassword1");

coolForm.addEventListener("submit", (e) => {
    e.preventDefault();
    /*
    This is the v1.0 of the project it will simply work ona sweeping pattern
    */

    //input data goes here

    let inputMap = eval(map2d.value);
    let dumpTruckPos = eval(startP.value);

    //6x5 matrix map as sample input



    //main code

    //variable to keep track of the movement of the truck
    let truckMovHistory = [];

    //array of all the way points that the truck have taken
    let wayPoints = [];

    //push truck's initial position to the truckMovHistory
    truckMovHistory.push(dumpTruckPos);

    //function to move the truck
    function moveTruck(cor) {
        dumpTruckPos = cor;
        truckMovHistory.push(cor);
        return truckMovHistory;
    }

    //function to check for each and every bin
    function checkBin(cor) {
        //this function checks if the current bin is filled or not and if its filled then it pushes it to the waypoint array and moves the truck to the current cordinate given
        if (inputMap[cor[0]][cor[1]] == 1) {
            wayPoints.push(cor);
        }
        moveTruck(cor);
    }

    /***************************************/

    //first move the truck to (0,0) position
    moveTruck([0, 0]);

    //code to make the swiping pattern taking the origin as the starting point and our matrix in fourth quadrant
    for (let i = 0; i < inputMap.length; ++i) {
        if ((i + 1) % 2 == 0) {
            for (let j = inputMap[i].length - 1; j >= 0; --j) {
                checkBin([i, j]);
            }
        } else {
            for (let j = 0; j < inputMap[i].length; ++j) {
                checkBin([i, j]);
            }
        }
    }

    let reTxt = "";
    for (let i = 0; i < wayPoints.length; ++i) {
        reTxt += "[" + wayPoints[i] + "]";
    }
    document.getElementById("out-data").innerHTML = "Take the following path:" + reTxt;

});