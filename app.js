//jshint esversion:6
// declaring npm packages that are used
const mongoose=require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash=require("lodash");
const length=100;

// connecting to mongoose Server
mongoose.connect("mongodb+srv://mitocondria:Dhruv1210@cluster0.x4clyh0.mongodb.net/DailyDB");

const app = express();
const posts=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


// declaring models and schema
const PostSchema={
  head:String,
  data:String
}

const ListSchema={
  item:[PostSchema]
}

const Post=mongoose.model("Post",PostSchema);
const List=mongoose.model("List",ListSchema);

// structured fixed contact
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent ="Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// get requests
app.get("/",(req,res)=>{
  Post.find({},(err,posts)=>{
    res.render("home",{
      content:homeStartingContent,
      arr:posts
    })
  })
})

app.get("/posts/:entry",(req,res)=>{
  const urlCode=req.params.entry;
  //console.log(urlCode);
  Post.findOne({head:urlCode},(err,found)=>{
    if(!err){
      res.render("post",{
        title:urlCode,
        content:found.data
      })
    }
  })
})
app.get("/about",(req,res)=>{
  res.render("about",{
    content:aboutContent
  })
})

app.get("/contact",(req,res)=>{
  res.render("contact",{
    content:contactContent
  })
})

app.get("/compose",(req,res)=>{
  res.render("compose");
})


// app.push requests
app.post("/",(req,res)=>{
  const content1=req.body.newJournalContent;
  const title=req.body.newJournalTitle;
var content = content1.substring(length);
  const post1=new Post({
    head:title,
    data:content
  })

  post1.save((err)=>{
    if(!err){
      res.render("/home");
    }
  });
//console.log(posts);
  //console.log(title);
  res.redirect("/");

})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
