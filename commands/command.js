"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMAND_TYPES = void 0;
var COMMAND_TYPES;
(function (COMMAND_TYPES) {
    COMMAND_TYPES[COMMAND_TYPES["SUBCOMMAND"] = 1] = "SUBCOMMAND";
    COMMAND_TYPES[COMMAND_TYPES["SUBCOMMAND_GROUP"] = 2] = "SUBCOMMAND_GROUP";
    COMMAND_TYPES[COMMAND_TYPES["STRING"] = 3] = "STRING";
    COMMAND_TYPES[COMMAND_TYPES["INTEGER"] = 4] = "INTEGER";
    COMMAND_TYPES[COMMAND_TYPES["BOOLEAN"] = 5] = "BOOLEAN";
    COMMAND_TYPES[COMMAND_TYPES["USER"] = 6] = "USER";
    COMMAND_TYPES[COMMAND_TYPES["CHANNEL"] = 7] = "CHANNEL";
    COMMAND_TYPES[COMMAND_TYPES["ROLE"] = 8] = "ROLE";
    COMMAND_TYPES[COMMAND_TYPES["MENTIONABLE"] = 9] = "MENTIONABLE";
    COMMAND_TYPES[COMMAND_TYPES["NUMBER"] = 10] = "NUMBER";
    COMMAND_TYPES[COMMAND_TYPES["ATTACHMENT"] = 11] = "ATTACHMENT";
})(COMMAND_TYPES = exports.COMMAND_TYPES || (exports.COMMAND_TYPES = {}));