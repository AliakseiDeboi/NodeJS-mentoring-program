import { sequelize } from '../data-access/database.connection';
import { User } from '../models/user.model-definition';
import { UserCreationAttributes } from '../types/user.interface';

import { Logger } from '../config';

/**
 * Default data for PG
 */
const defaultData: Array<UserCreationAttributes> =  [
    {
        'login': 'Nagibator123',
        'password': 'Password123',
        'age': 34,
        'isDeleted': false
    },
    {
        'login': 'Crushitel',
        'password': 'Password123',
        'age': 21,
        'isDeleted': false
    },
    {
        'login': 'Iriska',
        'password': 'Password123',
        'age': 66,
        'isDeleted': false
    },
    {
        'login': 'Liliana',
        'password': 'Password123',
        'age': 21,
        'isDeleted': false
    },
    {
        'login': 'AAAAAAAA1235',
        'password': 'Password123',
        'age': 29,
        'isDeleted': false
    },
    {
        'login': 'MacBook12',
        'password': 'Password123',
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
