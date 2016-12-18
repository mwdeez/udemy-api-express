import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import config from './config';
import routes from './routes';

let app = express();
app.server = http:createServer(app);

// middleware

// passport config

// api routes
app.use('/v1', routes);


// run server
app.server.listen(config.port);
console.log(`Started server on port ${app.server.addres().port}`);

export default app;
