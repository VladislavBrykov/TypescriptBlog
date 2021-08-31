"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LOGIN_TYPE = {
    EMAIL: 'email',
    PHONE_NUMBER: 'phoneNumber'
};
function loginType(phoneEmail) {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return (re.test((phoneEmail)) ? LOGIN_TYPE.EMAIL : LOGIN_TYPE.PHONE_NUMBER);
}
exports.default = loginType;
//# sourceMappingURL=find.out.which.id.js.map