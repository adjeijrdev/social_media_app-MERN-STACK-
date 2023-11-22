import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url';
import authRoutes from './routes/user-route.js'
import userRouter from './routes/users.js'
import postRoutes from './routes/posts.js'
import { createPost } from './contollers/postsController.js'
import { register } from './contollers/auth.js'
import { verifyToken } from './middleware/validation.js';

// configuration
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "300mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "300mb", extended: true}))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

// file storage
const storage = multer.diskStorage({
    destination: function (req, file, ceb) {
        cd(null, "public/assets")
    },
    filename: function ( req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage })

//routes with file
app.post("/auth/register", upload.single("picture"), register)
app.post('/posts', verifyToken, upload.single("picture"), createPost )

//Routes
app.use('/auth', authRoutes)
app.use('/users', userRouter)
app.use('/post', postRoutes)

//MONGOOSE SETUP
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`))