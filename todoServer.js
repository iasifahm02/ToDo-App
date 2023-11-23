const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// const todos = [{id: 123, title: "Hi", description: "I'm Asif"}];

//Task 1: Retrieve all todo items
app.get("/todos", (req, res)=>{
    fs.readFile("database.json", "utf8", (err, data)=>{
        if(err) throw err;

        const todos = JSON.parse(data); // Stringify to json data
        res.status(200).json(todos);
    });
});

//Task 2: Create a new todo item
app.post("/todos", (req, res) => {
    fs.readFile("database.json", "utf8", (err, data)=>{
        if(err) throw err;

        const todos = JSON.parse(data);
        const newTodo = { //create new todo item
            id: Math.floor(Math.random()*100000),
            ...req.body //Add req.body (contains title & description)
        }
        todos.push(newTodo); // Push new todo 

        //write into the database/file
        fs.writeFile("database.json", JSON.stringify(todos), (err)=>{
            if(err) throw err;
            res.status(201).json(newTodo);
        })  
    })
});

//Task 3: Update an existing todo item by ID
app.put("/todos/:id", (req, res)=>{
    fs.readFile("database.json", "utf8", (err, data) =>{
        if(err) throw err;

        const todos = JSON.parse(data);
        const id = parseInt(req.params.id);
        const findIndex = todos.findIndex(t => t.id === id);

        if(findIndex !== -1){
            Object.assign(todos[findIndex], req.body);
            fs.writeFile("database.json", JSON.stringify(todos), (err) =>{
                if(err) throw err;
                
                res.status(200).json({message: "Todo is updated"});
            })
        }
        else{
            res.status(404).json({message: "Todo Not found"});
        }
    })
    
});

//Task 4: Retrieve a specific todo item by ID
app.get("/todos/:id", (req, res)=>{
    fs.readFile("database.json", "utf8", (err, data) =>{
        if(err) throw err;

        const todos = JSON.parse(data);
        const id = parseInt(req.params.id);
        const todoExist = todos.find(t => t.id === id);
        if(!todoExist){
            return res.status(404).json({message: "Todo Doesn't exist"});
        }
        res.status(200).json(todoExist);
    })

});

//Task 5: Delete a todo item by ID
app.delete("/todos/:id", (req, res)=>{
    fs.readFile("database.json", "utf8", (err, data) =>{
        if(err) throw err;

        const todos = JSON.parse(data);
        const id = parseInt(req.params.id);
        const todoIndex = todos.findIndex(t => t.id === id);
        if(todoIndex === -1){
            res.status(404).json({message: "Todo Doesn't exist"})
        }
        else{
            todos.splice(todoIndex, 1); // Delete the todo at that index
            fs.writeFile("database.json", JSON.stringify(todos), (err) =>{
                if(err) throw err;
                res.status(200).json({message: "Todo Deleted Successfully!"});
            })
        }
    })
}); 

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
});