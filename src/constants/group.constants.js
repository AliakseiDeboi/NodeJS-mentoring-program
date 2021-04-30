"use strict";
/**
 * This file contains constants for groups
 */
exports.__esModule = true;
exports.userWasAdded = exports.requiredFields = exports.groupNotExist = exports.forbiddenId = void 0;
exports.forbiddenId = {
    error: {
        message: 'You can not update ID'
    }
};
exports.groupNotExist = {
    error: {
        message: 'Group does not exist'
    }
};
exports.requiredFields = {
    error: {
        message: 'Please, update fields'
    }
};
exports.userWasAdded = {
    error: {
        message: 'User was added to this group'
    }
};
