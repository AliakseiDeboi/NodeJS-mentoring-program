import { UserI } from '../models/user/interface';

/**
 * This class describes User Service and contains operations that
 * can be applied to users and also contains mocked data
 */
export class UserService {

    /**
     * Array that contains mocked data about users
     * @private users
     */
    private users: Array<UserI> = [
        {
            "id": 0,
            "login": "Nagibator123",
            "password": "password",
            "age": 34,
            "isDeleted": false
        },
        {
            "id": 1,
            "login": "Crushitel",
            "password": "password",
            "age": 21,
            "isDeleted": false
        },
        {
            "id": 2,
            "login": "Iriska",
            "password": "password",
            "age": 66,
            "isDeleted": false
        },
        {
            "id": 3,
            "login": "Liliana",
            "password": "password",
            "age": 21,
            "isDeleted": false
        },
        {
            "id": 4,
            "login": "AAAAAAAA1235",
            "password": "password",
            "age": 29,
            "isDeleted": false
        },
        {
            "id": 5,
            "login": "MacBook12",
            "password": "password",
            "age": 16,
            "isDeleted": false
        },
    ];

    /**
     * This method describes logic of getting user by id
     * @param id is string
     */
    public getUserById(id: string): UserI | undefined {
        return this.users.find((user: UserI) => user.id.toString() === id);
    }

    /**
     * This method describes logic of getting all users
     */
    public getAllUsers(): Array<UserI> {
        return this.users
            .filter((user: UserI) => !user.isDeleted)
            .sort((a: UserI, b: UserI) => a.login > b.login ? 1 : -1);
    }

    /**
     * This method describes logic of getting user by login
     * @param loginSubstring is string
     */
    public getAutoSuggestUsers(loginSubstring: string): Array<UserI> {
        return this.getAllUsers().filter((user: UserI) => user.login.toLowerCase().includes(loginSubstring));
    }

    /**
     * This method describes logic of adding user
     * @param newUser is Omit<UserI, 'id'>
     */
    public addUser(newUser: Omit<UserI, 'id'>): UserI {
        const newId = this.users.length;
        const user = {id: newId, ...newUser};
        this.users.push(user);
        return user;
    }

    /**
     * This method describes logic of updating user
     * @param targetUser is UserI
     * @param newValues is Partial<UserI>
     */
    public updateUser(targetUser: UserI, newValues: Partial<UserI>, ): UserI {
        return Object.assign(targetUser, newValues);
    }

    /**
     * This method describes logic of deleting user
     * @param user is UserI
     */
    public deleteUser(user: UserI): void {
        user.isDeleted = true;
    }
}
