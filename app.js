const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const {} = require("ejs");
const app = express();
const PORT = 3000 || process.env.PORT;

//Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Setting up mongo DB
mongoose.connect(
  "mongodb://localhost:27017/wikiDB",
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to DB");
    }
  }
);

//Creating a Schema
const articleSchema = mongoose.Schema({
  title: String,
  content: String,
});

//Creating a DB model
const Article = mongoose.model("article", articleSchema);
//

//Creating Chained Route

app.route("/articles")
  .get((req, res) => {
    Article.find({}, (err, articles) => {
      if (!err) {
        res.send(articles);
      } else {
        res.send(err);
      }
    });
  })
  .post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    Article.find({ title: title }, (err, foundArticles) => {
      if (!err && foundArticles.length == 0) {
        const article = new Article({
          title: _.capitalize(title),
          content: content,
        });
        article.save((err) => {
          if (!err) {
            res.send("Article has been accepted!");
          } else {
            res.send(err);
          }
        });
      } else {
        res.send("Article you are trying to submit is already available.");
      }
    });
  })
  .delete((req, res) => {
    Article.deleteMany({}, (err) => {
      if (!err) {
        res.send("All the articles have been deleted successfully!!");
      } else {
        res.send(err);
      }
    });
  });

//////////////////////////////////////USING PARAMS FOR SPECIFIC ARTICLES///////////////////////////////////////////////
app.route("/articles/:articleTitle")
.get((req, res)=>{
    const getOneArticle = _.capitalize(req.params.articleTitle);
    Article.find({title: getOneArticle}, (err, articles) => {
        if (!err) {
          res.send(articles);
        } else {
          res.send(err);
        }
      });
})
.delete((req, res)=>{
    const deleteOneArticle = req.params.articleTitle;
    Article.deleteOne({title: deleteOneArticle}, (err)=>{
        if(!err){
            res.write("Deleted Requested article successfully", deleteOneArticle);
            res.send();
        }else{
            res.send(err);
        }
    })
})
.put((req, res)=>{
    const updateOneArticle = req.params.articleTitle;
    const title = req.body.title;
    const content = req.body.content;
    Article.findOneAndUpdate({title: updateOneArticle},
        {title: title, content: content}, 
        {overwrite: true}, 
        (err)=>{
        if(!err){
            res.send("Updated successfully");
        }else{
            res.send(err);
        }
    });
})
.patch((req, res)=>{
    const title = req.params.articleTitle;
    Article.updateOne({title: title}, {$set: req.body}, (err)=>{
        if(!err){
            res.send("Patched successfully");
        }else{
            res.send(err);
        }
    })
});

app.listen(PORT, () => {
  console.log("Server listening on", PORT);
});
