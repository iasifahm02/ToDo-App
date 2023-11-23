const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// const todos = [{id: 123, title: "Hi", description: "I'm Asif"}];
const todos = [];

//Task 1: Retrieve all todo items
app.get("/todos", (req, res)=>{
    res.status(200).json(todos);
});

//Task 2: Create a new todo item
app.post("/todos", (req, res) => {
    const newTodo = {
        id: Math.floor(Math.random()*100000),
        ...req.body //Add req.body (contains title & description)
    }

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

//Task 3: Update an existing todo item by ID
app.put("/todos/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const findIndex = todos.findIndex(t => t.id === id);
    if(findIndex !== -1){
        Object.assign(todos[findIndex], req.body);
        res.status(200).json({message: "Todo is updated"});
    }
    else{
        res.status(404).json({message: "Todo Not found"});
    }
});

//Task 4: Retrieve a specific todo item by ID
app.get("/todos/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const todoExist = todos.find(t => t.id === id);
    if(!todoExist){
        return res.status(404).json({message: "Todo Doesn't exist"});
    }
    res.status(200).json(todoExist);
});

//Task 5: Delete a todo item by ID
app.delete("/todos/:id", (req, res)=>{
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(t => t.id === id);
    if(todoIndex === -1){
        res.status(404).json({message: "Todo Doesn't exist"})
    }
    else{
        todos.splice(todoIndex, 1); // Delete the todo at that index
        res.status(200).json({message: "Todo Deleted Successfully!"});
    }
}); 

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000");
});