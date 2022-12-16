"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankedStatus = exports.Gamemode = exports.UserPermissions = void 0;
var UserPermissions;
(function (UserPermissions) {
    UserPermissions[UserPermissions["None"] = 0] = "None";
    UserPermissions[UserPermissions["Normal"] = 1] = "Normal";
    UserPermissions[UserPermissions["Moderator"] = 2] = "Moderator";
    UserPermissions[UserPermissions["Supporter"] = 4] = "Supporter";
    UserPermissions[UserPermissions["Friend"] = 8] = "Friend";
    UserPermissions[UserPermissions["peppy"] = 16] = "peppy";
    UserPermissions[UserPermissions["World_Cup_staff"] = 32] = "World_Cup_staff";
})(UserPermissions = exports.UserPermissions || (exports.UserPermissions = {}));
var Gamemode;
(function (Gamemode) {
    Gamemode[Gamemode["std"] = 0] = "std";
    Gamemode[Gamemode["taiko"] = 1] = "taiko";
    Gamemode[Gamemode["ctb"] = 2] = "ctb";
    Gamemode[Gamemode["mania"] = 3] = "mania";
})(Gamemode = exports.Gamemode || (exports.Gamemode = {}));
var RankedStatus;
(function (RankedStatus) {
    RankedStatus[RankedStatus["unknown"] = 0] = "unknown";
    RankedStatus[RankedStatus["unsubmitted"] = 1] = "unsubmitted";
    RankedStatus[RankedStatus["pending"] = 2] = "pending";
    RankedStatus[RankedStatus["wip"] = 2] = "wip";
    RankedStatus[RankedStatus["graveyard"] = 2] = "graveyard";
    RankedStatus[RankedStatus["unused"] = 3] = "unused";
    RankedStatus[RankedStatus["ranked"] = 4] = "ranked";
    RankedStatus[RankedStatus["approved"] = 5] = "approved";
    RankedStatus[RankedStatus["qualified"] = 6] = "qualified";
    RankedStatus[RankedStatus["loved"] = 7] = "loved";
})(RankedStatus = exports.RankedStatus || (exports.RankedStatus = {}));
