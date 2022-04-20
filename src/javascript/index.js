const express = require('express');
const cors= require('cors');
const userDao = require("./dao/userdao")

const app = express();
const PORT = 3000;
app.use(express.json())
app.use(cors())

app.get('/users', async (req, res) => {
    try {
        const users = await userDao.getAllUsers(); 
        res.send(users);
    } catch (err) {
        console.error(err);
        res.status(500).send("An Error occured processing your request");
    }
})

app.get("/user/:id", async (req, res) => {
    try {
        const user = await userDao.getById(req.params.id);
        res.send(user)
    } catch (err) {
        console.error(err);
        res.status(500).send("An Error occured processing your request");
    }
})

  
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occured, server can't start", error);
    }
)