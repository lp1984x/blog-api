const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose")
const auth = require("./routes/auth");
const user = require("./routes/users");
const post = require("./routes/posts");
const category = require("./routes/categories");
const multer = require("multer")
const path = require("path")




dotenv.config();
app.use(express.json())
app.use("/images", express.static(path.join(__dirname,"/images")))

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true
    
}).then(console.log("conected")).catch(err=>console.log(err));

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "images");
    },
    filename:(req, file, cb)=>{
        cb(null, req.body.name);
    }
});

const upload = multer({storage: storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
    res.status(200).json("file has been uploaded")
});

app.use("/api/auth", auth);
app.use("/api/users", user);
app.use("/api/posts", post);
app.use("/api/categories", category);

app.listen("5000");