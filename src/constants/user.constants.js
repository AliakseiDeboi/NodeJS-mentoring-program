"use strict";
/**
 * This file contains constants for users
 */
exports.__esModule = true;
exports.requiredFields = exports.userExists = exports.userNotExist = exports.forbiddenId = void 0;
exports.forbiddenId = {
    error: {
        message: 'You can not update ID'
    }
};
exports.userNotExist = {
    error: {
        message: 'User does not exist'
    }
};
exports.userExists = {
    error: {
        message: 'User is already exists'
    }
};
exports.requiredFields = {
    error: {
        message: 'Please, update fields'
    }
};
