"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routers_1 = __importDefault(require("./Api-Router/routers"));
const app = express_1.default();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(cors());
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
app.use('/api', routers_1.default);
app.listen(PORT, () => {
    console.log(`server listen on port - ${PORT}`);
});
//# sourceMappingURL=app.js.map