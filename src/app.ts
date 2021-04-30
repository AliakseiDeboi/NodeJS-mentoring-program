import express from 'express';
import morgan from 'morgan';

import { Application, Request, Response } from 'express';
import { routerUsers } from './controllers/users.controller';
import * as bodyParser from 'body-parser';

import { sequelize } from './data-access/database.connection';
import { User } from './models/user.model-definition';
import { routerGroups } from './controllers/groups.controller';
import { Group } from './models/group.model-definition';
import { UserGroup } from './models/user-group.model-definition';


const port = process.env.PORT || 3000;
const app: Application = express();

/**
 * Configuring main application
 */
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/users', routerUsers);
app.use('/groups', routerGroups);
app.use((req: Request, res: Response) => {
    res.status(400).json({
        error: {
            message: 'Not found'
        }
    });
});
app.use((err: Error, req: Request, res: Response) => {
    res.status(404);
    res.json({
        error: {
            message: err.message
        }
    });
});

sequelize.authenticate().then(() => {
    User.sync().then();
    Group.sync().then();
    UserGroup.sync().then();
    User.belongsToMany(Group, { through: UserGroup, foreignKey: 'userId' });
    Group.belongsToMany(User, { through: UserGroup, foreignKey: 'groupId' });
    app.listen(port, () => console.log(`server is running on port ${port}`));
}).catch(err => console.log(err));
