// require("dotenv").config();
// const express = require("express");
// const app = express();
// const cors = require("cors");
// var bodyParser = require("body-parser");

// const connectDB = require("./database");

// app.all('*', (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://reading-test.vercel.app/");
//   next();
// });

// app.use(
//   cors({
//     origin: ["http://127.0.0.1:3000", process.env.CLIENT_URL, "http://localhost:5173","https://reading-test.vercel.app"],
//     credentials: true,
//   })
// );

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use("/api/user", require("./routes/UserRoute"));
// app.use("/api/result", require("./routes/ResultRoute"));

// app.listen(process.env.PORT, () => {
//   connectDB();
//   console.log(`Server is running on ${process.env.IP}:${process.env.PORT}`);
// });

//___________________________________________________________________________________________________________________________
//___________________________________________________________________________________________________________________________
//___________________________________________________________________________________________________________________________

// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const cors = require("cors");

// const app = express();
// app.use(express.json());

// const PORT = process.env.PORT || 3000;
// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// // CORS configuration
// app.use(cors({
//   origin: ["http://127.0.0.1:3000", process.env.CLIENT_URL, "http://localhost:5173", "https://reading-test.vercel.app"],
//   credentials: true,
// }));

// // Connect to MongoDB Atlas
// const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://shivkamp:goodevening@cluster0.mtuwxiq.mongodb.net/';
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// const db = mongoose.connection;
// db.on('error', (error) => {
//     console.error('MongoDB connection error:', error);
//     process.exit(1);
// });
// db.once('open', () => {
//     console.log('Connected to MongoDB');
// });

// // User schema and model
// const userSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     data: [{ type: Object }]
// }, { collection: 'Userdata' });

// const User = mongoose.model('User', userSchema);

// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization'];

//     if (!token) {
//         return res.status(401).json({ message: 'No token provided' });
//     }

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.userId = decoded.userId;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };

// // Default route to handle base URL
// app.get('/', (req, res) => {
//     res.send('Welcome to the API!');
// });

// // Register API
// app.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//     }

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'User already exists' });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({ email, password: hashedPassword });
//         await newUser.save();

//         const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

//         res.status(201).json({ message: 'User registered successfully', token });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// });

// // Login API
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ message: 'Email and password are required' });
//     }

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid email or password' });
//         }

//         const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

//         res.status(200).json({ token });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// });

// // Save user data API
// app.post('/saveUserData', verifyToken, async (req, res) => {
//     const { email, userData } = req.body;
//     const userId = req.userId;

//     if (!email || !userData) {
//         return res.status(400).json({ message: 'Email and userData are required' });
//     }

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         user.data.push(userData);
//         await user.save();

//         res.status(200).json({ message: 'User data saved successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// });

// // Get user data API
// app.get('/getUserData', verifyToken, async (req, res) => {
//     const userId = req.userId;

//     try {
//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         res.status(200).json(user.data);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// });

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cors = require("cors");
// app.use(cors());

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

// app.use(cors({ origin: "*" }));

// CORS configuration
app.use(cors({
  origin: ["http://127.0.0.1:3000", process.env.CLIENT_URL, "http://localhost:5173", "https://reading-test.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));



// Handle preflight requests for all routes
app.options('*', (req, res) => {
  res.sendStatus(204);
});

// Connect to MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// User schema and model
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    data: [{ type: Object }]
}, { collection: 'Userdata' });

const User = mongoose.model('User', userSchema);

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Default route to handle base URL
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Register API
app.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Login API
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Save user data API
app.post('/saveUserData', verifyToken, async (req, res) => {
    const { email, userData } = req.body;
    const userId = req.userId;

    if (!email || !userData) {
        return res.status(400).json({ message: 'Email and userData are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.data.push(userData);
        await user.save();

        res.status(200).json({ message: 'User data saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get user data API
app.get('/getUserData', verifyToken, async (req, res) => {
    const userId = req.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user.data);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
