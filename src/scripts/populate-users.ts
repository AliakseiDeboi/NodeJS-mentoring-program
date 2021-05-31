import { sequelize } from '../data-access/database.connection';
import { User } from '../models/user.model-definition';
import { UserCreationAttributes } from '../types/user.interface';

import { Logger } from '../config';

/**
 * Default data for PG
 */
const defaultData: Array<UserCreationAttributes> =  [
    {
        'id': 0,
        'login': 'Nagibator123',
        'password': 'password',
        'age': 34,
        'isDeleted': false
    },
    {
        'id': 1,
        'login': 'Crushitel',
        'password': 'password',
        'age': 21,
        'isDeleted': false
    },
    {
        'id': 2,
        'login': 'Iriska',
        'password': 'password',
        'age': 66,
        'isDeleted': false
    },
    {
        'id': 3,
        'login': 'Liliana',
        'password': 'password',
        'age': 21,
        'isDeleted': false
    },
    {
        'id': 4,
        'login': 'AAAAAAAA1235',
        'password': 'password',
        'age': 29,
        'isDeleted': false
    },
    {
        'id': 5,
        'login': 'MacBook12',
        'password': 'password',
        'age': 16,
        'isDeleted': false
    }
];

/**
 * Here is populating
 */
const populateUsers = async () => {
    await sequelize.authenticate();
    await User.sync({ force: true });
    await User.bulkCreate(defaultData);
};

populateUsers().then(() => {
    Logger.info('Table with users was created and populated');
}).catch(err => Logger.error(err));
