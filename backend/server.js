const express = require('express');
const app = express();

const port = process.env.Port || 5000;
const routes = require('./routes/routes');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>
{
    res.send('From Server');
});

app.use('/api',routes);
app.listen(port,()=>
{
    console.log(`Server is Up And Running On Port ${port}`);
});

