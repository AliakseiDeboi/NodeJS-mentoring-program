import express from 'express';
import { Request, Response, Router } from 'express';
import { createValidator } from 'express-joi-validation';
import { UserService } from '../services/user.service';
import { UserI } from '../models/user/interface';
import { createUserSchema, getUsersQuerySchema, updateUserSchema } from '../models/user/schema';

export const routerUsers: Router = express.Router();

const validator = createValidator();
const userService: UserService = new UserService();

const forbiddenId = {
    error: {
        message: 'You can not update ID'
    }
};

const userNotExist = {
    error: {
        message: 'User does not exist'
    }
};

const userExists = {
    error: {
        message: 'User is already exists'
    }
};

/**
 * GET HTTP request. First param describes url path, second param is validator,
 * third param - callback function, that shows users. Also it can show us users by login substring
 */
routerUsers.get('/', validator.query(getUsersQuerySchema), (req: Request, res: Response) => {
    let users: Array<UserI>;

    if (req.query.loginSubstring) {
        users = userService.getAutoSuggestUsers(req.query.loginSubstring.toString().toLowerCase());
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
    const login = userService.getAutoSuggestUsers(req.body.login.toLowerCase());
    if (!login.length) {
        const user: UserI = userService.addUser(req.body);
        res.status(200).json(user);
    } else {
        res.status(400).json(userExists);
    }
});

/**
 * GET HTTP request. First param describes url path, second param is validator,
 * third param - callback function, that allow us to get user by id.
 */
routerUsers.get('/:userId', (req: Request, res: Response) => {
    const user: UserI | undefined = userService.getUserById(req.params.userId);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(400).json(userNotExist);
    }
});

/**
 * PUT HTTP request. First param describes url path, second param is validator,
 * third param - callback function, that allow us to update user by id. All fields are
 * optional
 */
routerUsers.put('/:userId', validator.body(updateUserSchema), (req: Request, res: Response) => {
    const user: UserI | undefined = userService.getUserById(req.params.userId);
    const flag = req.body.id === user?.id;

    if (user && flag) {
        userService.updateUser(user, req.body);
        res.status(200).json(user);
    } else if (flag) {
        res.status(400).json(userNotExist);
    } else {
        res.status(400).json(forbiddenId);
    }
});

/**
 * DELETE HTTP request. First param describes url path,
 * second param - callback function, that allow us to delete user by id.
 */
routerUsers.delete('/:userId', (req: Request, res: Response) => {
    const user: UserI | undefined = userService.getUserById(req.params.userId);

    if (user) {
        userService.deleteUser(user);
        res.status(200).json();
    } else {
        res.status(400).json(userNotExist);
    }
});
