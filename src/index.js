const express = require('express');
require('./db/mongoose')

const userRouter = require('./router/user')
const documentRoute = require('./router/document')
const app = express();

const port = process.env.PORT || 8000;

app.use(express.json()); //parse incoming json
app.use(userRouter);
app.use(documentRoute);

app.listen(port,()=>{
    console.log('Server is up on port 8000');
})



