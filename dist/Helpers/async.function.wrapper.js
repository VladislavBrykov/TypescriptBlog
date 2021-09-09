"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncFunctionWrapper = void 0;
exports.asyncFunctionWrapper = (callBack) => async (req, res) => {
    try {
        await callBack(req, res);
    }
    catch (error) {
        console.log(error);
        res.status(500).send('the server encountered an unknown error');
    }
};
//# sourceMappingURL=async.function.wrapper.js.map