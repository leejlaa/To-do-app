import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

 

const app = express();
const port = 3001;

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB", { useNewUrlParser:true });

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to to-do list"
});

const item2 = new Item({
    name: "Start adding tasks for today!"
}); 

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/",(req,res)=>{

    
        const getItems = async () => {
            try {
              const items3 = await Item.find({});
              return items3;
            } catch (error) {
              console.error(error);
              throw error;
            }
          };
          
          // Use the async function to get items and print their names
          getItems()
            .then(items => {
                if(items.length == 0){
                    item1.save();
                    item2.save();
                    res.redirect("/");
                }
                res.render("index.ejs",{
                    items: items
                });
            })
            .catch(error => console.error(error));
    
        
        
});

// app.get("/done",(req,res)=>{

//    items2.forEach(x =>{
//         if(x == req.body.task){
//             x = "<del>" + x + "</del>";
//         }
//    });
//     res.render("index.ejs", {
//         items: items2
//     });
// });

app.post("/submit",(req,res)=>{
    
    const item = new Item({
        name: req.body.task
    });

    item.save();

    
    res.redirect("/");
});

app.post("/delete",(req,res)=>{
   
    console.log(req.body.checkbox);
    // Item.deleteOne({ name: req.body.singleEntry })
    // .then(() => {
    // console.log("Successfully Deleted");
    // res.redirect("/");
    // })
    // .catch((err) => {
    // console.log(err);
    // });
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });