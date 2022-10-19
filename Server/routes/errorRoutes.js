import express from "express";
const errorRouter = express.Router();
import path from "path";
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

//error routes, always at the end of the file!

errorRouter.get('^/$|index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

errorRouter.all('*', (req, res) =>{
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, '..', 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ Message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
}) 

export default errorRouter;