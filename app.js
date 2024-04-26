import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import postRoute from './routes/post.route.js';
import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import testRoute from './routes/test.route.js';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL, 
    credentials: true
}))
app.use(express.json());
// app.use(express.json({ urlencoded: true }));
app.use(cookieParser());


const PORT = process.env.PORT || 8080;

// app.use('/api/posts', postRoute);
app.use('/api/users', userRoute);
app.use('/api/auths', authRoute);
app.use('/api/tests', testRoute);

app.listen(PORT, () => {
    console.log(`Server conneceted to ${PORT}`);
})