const mongoose = require('mongoose');

const db = 'mongodb+srv://admin:vBINXatgcskzhGEe@cluster0.itur5xn.mongodb.net/?retryWrites=true&w=majority'
mongoose.set('strictQuery',true);

const connected = async function(){
    await mongoose.connect(db)
    .then(() => console.log('Connected!')).catch(()=>{
        console.log("not connected");
     })


}
connected();