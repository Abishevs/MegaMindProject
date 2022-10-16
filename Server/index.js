import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { corsOptions } from "./config/corsOptions.js";
import path from "path";
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
dotenv.config();

const app = express();


app.use(logger)

app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser());


//for static files
app.use('/', express.static(path.join(__dirname, '/public')))


//should always be at the buttom includes 404 routes.
app.use(router);
app.use(errorHandler)
 
app.listen(5000, ()=> console.log('Server running at port 5000'));