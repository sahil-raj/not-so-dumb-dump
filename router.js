let express = require("express");
let router = express.Router();

let fs = require('fs');

const dustbin_filled = 0;

router.get("/", (req,res,next) => {
    res.sendFile(__dirname + "/src/index.html");
});

router.get("/find_your_bin", (req,res,next) => {
    res.sendFile(__dirname + "/src/find_your_bin.html");
});

router.get("/admin", (req,res,next) => {
    res.sendFile(__dirname + "/src/admin.html");
});

router.get("/smart_bin", (req,res,next) => {
    res.sendFile(__dirname + "/src/smart_bin.html");
});

router.get("/e_waste", (req,res,next) => {
    res.sendFile(__dirname + "/src/e_waste.html");
});

router.get("/dispose", (req,res,next) => {
    res.sendFile(__dirname + "/src/dispose.html");
});

router.put('/location', (req, res, next) => {
    dustbin_filled = req.body.filled;
    res.end();
})

router.post("/login_handler", (req,res,next) => {
    let mydata = JSON.parse(fs.readFileSync("src/data/users.json"));
    let senData = {found: false, data: null};
    console.log(req.body);
    for (let i=0; i < mydata.users.length; ++i) {
        if (mydata.users[i].name == req.body.data.name && mydata.users[i].password == req.body.data.password) {
            let markers = JSON.parse(fs.readFileSync("src/data/map_markers_cor.json"));
            senData = {found: true, data: {markers}};
            break;
        }
    }
    res.send(senData);
});

module.exports = router;