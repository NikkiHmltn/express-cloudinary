require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const multer = require('multer');
const cloudinary = require('cloudinary');

//app and port
const app = express();
const PORT = process.env.PORT || 3000;
const uploads = multer({ dest: "./uploads" })

//middleware
app.set('view engine', 'ejs');
app.use(ejsLayouts);

//routes
app.get('/', function(req, res) {
  res.render('index');
});

// post route
app.post("/", uploads.single('inputFile'), (req, res) => {
 console.log('On post route!')

 //get an input from the user
 let file = req.file.path
console.log(file)

 //upload the file to cloundinary 
 cloudinary.uploader.upload(file, (result) => {
    console.log(result);
    res.render("results", { image: result.url });
 })
})

//server listening on port
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
