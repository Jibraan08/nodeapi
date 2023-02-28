const express = require("express");
const app = express();
app.use(express.json())
const port = 6500;
const db = require('./api/helper/conn');
const cors = require('cors')
app.use(cors());
const route = require('./api/routers/routes')
app.use('/',route)

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
