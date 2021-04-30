import { DataTypes } from 'sequelize';
import { sequelize } from '../data-access/database.connection';
import { User } from './user.model-definition';
import { Group } from './group.model-definition';
import { UserGroupInterface } from '../types/user-group.interface';

/**
 * This is user-group model definition
 */
export const UserGroup = sequelize.define<UserGroupInterface>('UserGroup', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    groupId: {
        type: DataTypes.INTEGER,
        references: {
            model: Group,
            key: 'id'
        }
    }
}, {
    freezeTableName: true
});
