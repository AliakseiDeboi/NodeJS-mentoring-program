import { Op } from 'sequelize';
import { User } from '../models/user.model-definition';
import { UserAttributes, UserCreationAttributes, UserInstance } from '../types/user.interface';
/**
 * This class describes User Service and contains operations that
 * can be applied to users and also contains mocked data
 */
export class UserService {

    /**
     * This method describes logic of getting user by id
     * @param id is string
     */
    public async getUserById(id: string): Promise<UserInstance | null> {
        return User.findByPk(id);
    }

    /**
     * This method describes logic of getting all users
     */
    public async getAllUsers(limit?: number): Promise<UserInstance[]> {
        return User.findAll({
            where: {isDeleted: false},
            order: [['login', 'ASC']],
            limit: limit
        })
    }

    /**
     * This method describes logic of getting user by login
     * @param loginSubstring is string
     * @param limit
     */
    public async getAutoSuggestUsers(loginSubstring: string, limit?: number): Promise<UserInstance[]> {
        return User.findAll({
            where: {isDeleted: false, login: {[Op.iLike]: `%${loginSubstring}%`}},
            order: [['login', 'ASC']],
            limit: limit
        })
    }

    /**
     * This method describes logic of adding user
     * @param newUser is Omit<UserAttributes, 'id'>
     */
    public async addUser(newUser: UserCreationAttributes): Promise<UserInstance> {
        return User.create(newUser);
    }

    /**
     * This method describes logic of updating user
     * @param targetUser is UserAttributes
     * @param user
     */
    public async updateUser(targetUser: UserInstance, user: Partial<UserAttributes>): Promise<void> {
        await User.update({...user}, {where: {id: targetUser.id}});
    }

    /**
     * This method describes logic of deleting user
     * @param id
     */
    public async deleteUser(id: string): Promise<void> {
        await User.update({isDeleted: true}, {where: {id}});
    }
}
