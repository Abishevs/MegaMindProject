import { allowedOrigins } from "./allowedOrigins.js";

export const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) { // || !origin
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }, 
    credentials: true, 
    optionsSuccessStatus: 200
}

export default corsOptions;