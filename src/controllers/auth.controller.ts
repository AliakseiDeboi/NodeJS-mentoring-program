import express, { NextFunction, Request, Response, Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { UserService } from '../services/user.service';
import { checkRefreshToken, generateAccessToken, generateRefreshToken } from '../tokens';
import { authBodySchema } from '../validators/auth.schema';
import { UserInstance } from '../types/user.interface';

export const routerAuth: Router = express.Router();

const validator = createValidator();
const userService: UserService = new UserService();

const generateBody = (user: UserInstance) => {
    return {
        'access-token': generateAccessToken({ id: user.id, login: user.login }),
        'refresh-token': generateRefreshToken({ id: user.id, login: user.login })
    };
};

routerAuth.post('/auth', validator.body(authBodySchema), async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.login(req.body.login, req.body.password);
    if (user) {
        res.status(200).json(generateBody(user));
    } else {
        res.status(403).json({ status: 'failed', errors: 'Incorrect login or password' });
    }
});

routerAuth.post('/refresh-token', checkRefreshToken, async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.payload;
    res.status(200).json(generateBody(user));
});
