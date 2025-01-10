
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use('/public', express.static(__dirname + "/public"))
app.set('view engine', 'ejs');


const port = 4000;

app.listen(port, function(){
    console.log(`Server is running on port ${port}`);
})

// visit github reamde for more guidance: 
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});


// --- Items list ---

const itemsSchema = {
    name : String
}

const Item = mongoose.model("Item", itemsSchema)

const item1 = new Item({
    name: "Welcome to your todolist"
});

const item2 = new Item({
    name: "Hit the + button to add new items"
});

const item3 = new Item({
    name: "<-- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];


// New Page list

const listSchema = {
    name: String,
    items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);

app.get("/", function(req, res){

    Item.find({})
        .then(function(foundItems) {
            if (foundItems.length === 0) {
                Item.insertMany(defaultItems)
                    .then(function () {
                        console.log("Successfully saved the default items to Database.");
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                res.redirect("/");
            } else {
                res.render('list', {listTitle: "Today", newListItems: foundItems});
            }
            
        })
        .catch(function (err) {
            console.log(err);
        });

    // let day = date.getDay();
    
});

app.post("/", function(req, res) {
    let ItemName = req.body.newItem;
    let listName = req.body.list;

    const item = Item({
        name: ItemName
    });

    if (listName === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({name: listName})
        .then(function(foundList) {
            foundList.items.push(item);
            foundList.save()
            foundList.redirect("/" + listName);
        })
        .catch(function(err) {
            console.log(err);
        })
    }
});


app.get("/:customListName", function(req, res) {
    let customListName = _.capitalize(req.params.customListName);

    List.findOne({name: customListName})
        .then(function(foundList) {
            if(!foundList) {
                // Create a new list
                const list = new List({
                    name: customListName,
                    items: defaultItems
                })
            
                list.save();
                res.redirect("/" + customListName);
            } else {
                // Show existing list
                res.render('list', {listTitle: foundList.name, newListItems: foundList.items});
            }
        })
        .catch(function(err) {
            console.log(err);
        })
});


app.post("/delete", function(req, res) {
    let checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if(listName === "Today") {
        Item.findByIdAndRemove(checkedItemId)
            .then(function() {
                console.log("Successfully deleted the checked item!");
                res.redirect("/");
            });
    } else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}})
            .then(function(foundList) {
                res.redirect("/" + listName);
            })
            .catch(function(err) {
                console.log(err);
            })
    }
});

