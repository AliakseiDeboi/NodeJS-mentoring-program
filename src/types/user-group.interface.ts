import { Model } from 'sequelize';

/**
 * Interface for user-groups
 */
export interface UserGroupInterface extends Model {
    userId: number;
    groupId: number;
}
