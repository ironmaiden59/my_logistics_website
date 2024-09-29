require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('sequelize');
const { User, Item, UserItem } = require('./models'); // Import User model
const itemRoutes = require('./routes/items');
const cors = require('cors');
const session = require('express-session');
const messageRoutes = require('./routes/messages');
const authenticateToken = require('./middleware/authenticateToken');

// Import necessary modules for Socket.IO
const http = require('http'); // Create an HTTP server
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // Create the HTTP server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Allow the frontend origin
    methods: ['GET', 'POST'],
    credentials: true, // Allow credentials such as cookies
  },
});

// CORS middleware for HTTP routes
const allowedOrigins = [
  'http://localhost:3000', // Your web app
  'chrome-extension://dghlmhdbgcllfmfelhljdgpgjcffbbbp', // Your Chrome extension
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// Serve static files from the uploads directory
app.use('/items', itemRoutes);
app.use('/messages', messageRoutes);


// Connect to PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
  }
);


  // Use routes
app.use('/messages', messageRoutes);

// Test database connection
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('sendMessage', (messageData) => {
    // Broadcast the message to other clients
    io.emit('newMessage', messageData);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


// Routes

// Sign-up route
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    // Generate a JWT token
    const authToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ authToken, message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const authToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ authToken, message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// User profile endpoint
app.get('/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address1: user.address1 || '',
      address2: user.address2 || '',
      city: user.city || '',
      state: user.state || '',
      zipCode: user.zipCode || ''
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/user/profile', authenticateToken, async (req, res) => {
  const { firstName, lastName, email, address1, address2, city, state, zipCode } = req.body;

  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ firstName, lastName, email, address1, address2, city, state, zipCode });

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Password management endpoint
app.put('/user/password', authenticateToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedPassword });

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/users/associate-item', authenticateToken, async (req, res) => {
  try {
    const { itemId } = req.body;
    const userId = req.user.userId; // Assuming your auth middleware sets req.user

    // Create an association between the user and the item
    await UserItem.findOrCreate({ where: { userId, itemId } });

    res.json({ success: true });
  } catch (error) {
    console.error('Error associating item with user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Define the route to fetch items associated with the authenticated user
app.get('/users/items', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming your authentication middleware sets req.user

    // Fetch items the user owns (items they're selling)
    const sellingItems = await Item.findAll({
      where: { userId },
    });

    // Fetch items the user is interested in (items they've associated with via UserItem)
    const buyingItems = await UserItem.findAll({
      where: { userId },
      include: [{ model: Item }],
    });

    // Extract the items from buyingItems
    const interestedItems = buyingItems.map(userItem => userItem.Item);

    // Combine the results
    res.json({
      sellingItems,
      interestedItems,
    });
  } catch (error) {
    console.error('Error fetching user items:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server with WebSocket support
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});