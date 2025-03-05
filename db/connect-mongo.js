const mongoose = require('mongoose');


const getConnection = async () => {

    try{
        const url = 'mongodb+srv://luisavelasquezd:YzuR6rUa8HRbe5uL@cluster0.kdnp2.mongodb.net/movie-serie-inv?retryWrites=true&w=majority&appName=Cluster0'

        await mongoose.connect(url);
    
        console.log('conexion exitosa');

    } catch(error) {
        console.log(error);
    }

}
    module.exports = {
        getConnection,
    }
   

