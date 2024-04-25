import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';
// import postRoute from './routes/post.route.js';
// import userRoute from './routes/user.route.js';
import authRoute from './routes/auth.route.js';

const app = express();

app.use(express.json());
// app.use(express.json({ urlencoded: true }));
app.use(cookieParser());
const PORT = process.env.PORT || 8080;

// app.use('/api/posts', postRoute);
// app.use('/api/users', userRoute);
app.use('/api/auths', authRoute);

app.listen(PORT, () => {
    console.log(`Server conneceted to ${PORT}`);
})