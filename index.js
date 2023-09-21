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


var items2= [];

app.get("/",(req,res)=>{

    if( items2.length ===0){
        const getItems = async () => {
            try {
              const items3 = await Item.find({});
              return items3;
            } catch (error) {
              console.error(error);
              throw error;
            }
          };
          
          // Use the async function to get fruits and print their names
          getItems()
            .then(items => {
                if(items.length == 0){
                    item1.save();
                    item2.save();
                }
                items.forEach( x => {
                    items2.push(x.name);
                });
            })
            .catch(error => console.error(error));
    
            res.redirect("/");
        }else{
            res.render("index.ejs",{
                items: items2
            });
        }
        
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
    
    items2.push(req.body.task);

    res.render("index.ejs",{
        items: items2
    });
});

app.post("/delete",(req,res)=>{
    try {
        var items3=[]
    
        items2.forEach(x => {
            if(x != req.body.task){
                items3.push(x);
            }
        });
    
        console.log(items3);
    } catch (error) {
        console.error(error);
    }
        res.render("index.ejs",{
        items: items3
    });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });