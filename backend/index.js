const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
}));
const storage = multer.diskStorage({
    destination:(req, file, cb)=> {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb)=> {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null,uniqueSuffix + file.originalname );
    }
})
const upload = multer({ storage: storage });


app.post("/file-upload", upload.single("file"), (req, res) => {
    try {
        res.status(200).json({ success: "File uploaded successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(7070, () => {
    console.log("Server is running on http://localhost:7070");
})