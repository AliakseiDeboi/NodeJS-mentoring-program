import express from 'express';
import { NextFunction, Request, Response, Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { UserService } from '../services/user.service';
import { UserI } from '../models/user/interface';
import { createUserSchema, getUsersQuerySchema, updateUserSchema } from '../models/user/schema';

export const routerUsers: Router = express.Router();

const validator = createValidator();
const userService: UserService = new UserService();

/**
 * GET HTTP request. First param describes url path, second param is validator,
 * third param - callback function, that shows users. Also it can show us users by login substring
 */
routerUsers.get('/', validator.query(getUsersQuerySchema), (req: Request, res: Response) => {
    let users: Array<UserI>;

    if (req.query.loginSubstring) {
        users = userService.findUsersByLogin(req.query.loginSubstring.toString());
    } else {
        users = userService.getAllUsers();
    }

    if (req.query.limit) {
        users = users.splice(0, parseInt(req.query.limit.toString(), 10));
    }

    res.status(200).json(users);
});

/**
 * POST HTTP request. First param describes url path, second param is validator,
 * third param - callback function, that allow us to add users
 */
routerUsers.post('/', validator.body(createUserSchema), (req: Request, res: Response) => {
    const user: UserI = userService.addUser(req.body);

    res.status(200).json(user);
});

/**
 * GET HTTP request. First param describes url path, second param is validator,
 * third param - callback function, that allow us to get user by id.
 */
routerUsers.get('/:userId', (req: Request, res: Response, next: NextFunction) => {
    const user: UserI | undefined = userService.getUserById(req.params.userId);

    if (user) {
        res.status(200).json(user);
    } else {
        const error = new Error('User does not exist');
        return next(error);
    }
});

/**
 * PATCH HTTP request. First param describes url path, second param is validator,
 * third param - callback function, that allow us to update user by id. All fields are
 * optional
 */
routerUsers.patch('/:userId', validator.body(updateUserSchema), (req: Request, res: Response, next: NextFunction) => {
    const user: UserI | undefined = userService.getUserById(req.params.userId);

    if (user) {
        userService.updateUser(user, req.body);
        res.status(200).json(user);
    } else {
        const error = new Error('User does not exist');
        return next(error);
    }
});

/**
 * DELETE HTTP request. First param describes url path,
 * second param - callback function, that allow us to delete user by id.
 */
routerUsers.delete('/:userId', (req: Request, res: Response, next: NextFunction) => {
    const user: UserI | undefined = userService.getUserById(req.params.userId);

    if (user) {
        userService.deleteUser(user);
        res.status(200).json();
    } else {
        const error = new Error('User does not exist');
        return next(error);
    }
});
