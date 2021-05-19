import express, { Application, Request, Response, NextFunction, response } from 'express';
import { routerUsers } from './controllers/users.controller';
import * as bodyParser from 'body-parser';

import { sequelize } from './data-access/database.connection';
import { User } from './models/user.model-definition';
import { routerGroups } from './controllers/groups.controller';
import { Group } from './models/group.model-definition';
import { UserGroup } from './models/user-group.model-definition';


import { Logger, morganMiddleware } from './config';

const port = process.env.PORT || 3000;
const app: Application = express();

/**
 * Configuring main application
 */
app.use(morganMiddleware);
app.use(bodyParser.json());
app.use('/users', routerUsers);
app.use('/groups', routerGroups);
app.use((req: Request, res: Response) => {
    res.status(500).json({
        error: {
            message: 'Not found'
        }
    });
});

process
    .on('unhandledRejection', (reason, p) => {
        Logger.error(`${reason} Unhandled Rejection at Promise ${p}`);
    })
    .on('uncaughtException', err => {
        Logger.error(`${err} Uncaught Exception thrown`);
        process.exit(1);
    });

sequelize.authenticate().then(() => {
    User.sync().then();
    Group.sync().then();
    UserGroup.sync().then();
    User.belongsToMany(Group, { through: UserGroup, foreignKey: 'userId' });
    Group.belongsToMany(User, { through: UserGroup, foreignKey: 'groupId' });
    app.listen(port, () => Logger.info(`server is running on port ${port}`));
}).catch(err => Logger.error(err));
