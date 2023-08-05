"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./lib/db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_1.dbconnect)();
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '20mb' }));
// Routes
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const ProductRoutes_1 = __importDefault(require("./routes/ProductRoutes"));
app.use('/api/auth', UserRoutes_1.default);
app.use('/api/app', ProductRoutes_1.default);
app.listen(9000, () => {
    console.log('server running at port 9000');
});
