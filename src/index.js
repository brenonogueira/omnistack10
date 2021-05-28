const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

mongoose.connect('mongodb+srv://breno:1234@cluster0.v78bj.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(express.json()); //fazendo express entender requisições no corpo no formato json - precisa vir antes das rotas
app.use(routes);


app.listen(3333);