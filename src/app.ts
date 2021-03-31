import express from 'express';
import morgan from 'morgan';

import { Application, NextFunction, Request, Response } from 'express';
import { routerUsers } from './api/users';
import * as bodyParser from 'body-parser';

const port = process.env.PORT || 3000;
const app: Application = express();

/**
 * Configuring main application
 */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/users', routerUsers);
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found');
    next(error);
});
app.use((err: Error, req: Request, res: Response) => {
    res.status(404);
    res.json({
        error: {
            message: err.message
        }
    });
});

app.listen(port, () => console.log(`server is running on port ${port}`));
