const express = require("express");
const getConnection = require("./dbconnection/index");
const userRoutes = require('./routes/userRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const notificationRoutes = require('./routes/notificationRoutes.js')
const multerRoutes = require('./routes/multerRouters.js')
const videoRoutes = require('./routes/videoNotification.js')
const Error = require("./middleware/error.js");
const cors = require('cors');
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const imageUploadCloudinaryRoute = require("./routes/imageUploadCloudinaryRoute.js")
require("dotenv").config({ path: "config/.env" });
getConnection()
const app = express();

// cloudinary 
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// cros middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(express.static('uploads'));
app.use('/images', express.static('uploads'));

app.get('/', (req, res) => {
  res.send(" Wellcome to chat-app")
})

app.get('/helthcheck', (req, res) => {
  res.send("Helth Is Good")
})

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/notification', notificationRoutes)
app.use('/api/multer', multerRoutes)
app.use('/api/video', videoRoutes)
app.use('/api/user', imageUploadCloudinaryRoute)

//middleware for error
app.use(Error);


const server = app.listen(process.env.PORT, () => {
  console.log(`server is started ${process.env.host}:`, process.env.PORT)
})

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("Connected");
  });

  socket.on("join chat", (room) => {
    console.log(123, room);
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user == newMessageReceived.sender._id) return;

      socket.in(user).emit("message received", newMessageReceived);
    });
  });

  socket.on('send_notification', (data) => {
    socket.in(data.receiver_id).emit('receive_notification', data)
  })

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});