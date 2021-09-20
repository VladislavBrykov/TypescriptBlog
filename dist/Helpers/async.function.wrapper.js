"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncFunctionWrapper = void 0;
exports.asyncFunctionWrapper = (callBack) => async (req, res) => {
    try {
        await callBack(req, res);
    }
    catch (error) {
        if (!error)
            res.status(404).send('the server encountered an unknown error');
        res.status(500).send(error.toString());
    }
};
//# sourceMappingURL=async.function.wrapper.js.map