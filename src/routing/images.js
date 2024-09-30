const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.get("/:folder/:filename", (req, res) => {
    const options = {
        root: path.join(__dirname, "../../public"),
        dotfiles: "deny"
    };

    console.log(req.params);

    const fileName = req.params.filename;
    const folderName = req.params.folder;
    
    // Check if the file exists

    const fileExists = fs.existsSync(path.join(__dirname, "../../public", folderName, fileName));

    if (fileExists) {
        res.sendFile(path.join(folderName, fileName), options, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log(`Sent file: ${fileName}`);
            }
        });
    } else {
        res.sendFile("placeholder.jpg", options, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log(`Sent placeholder file: ${fileName}`);
            }
        });
    }

})

module.exports = router;