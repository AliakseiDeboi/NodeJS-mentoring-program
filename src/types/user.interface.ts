import { Model, Optional } from 'sequelize';

/**
 * This interface contains body of user
 */
export interface UserAttributes {
    id: number;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}
