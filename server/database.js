require('dotenv').config()

// let mongoose = require('mongoose')

// async function connectDB() {
//     try {
//         await mongoose.connect(process.env.MONGO_URL)
//         console.log('Database Connected Succesfully');
//     } catch (err) {
//         console.log("MongoDB Couldnt Connect: ", err);
//     }
// }

// module.exports = connectDB


let mongoose = require('mongoose');

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000 // Close sockets after 45s of inactivity
        });
        console.log('Database Connected Successfully');
    } catch (err) {
        console.error("MongoDB Connection Error: ", err);
    }
};

module.exports = connectDB;
