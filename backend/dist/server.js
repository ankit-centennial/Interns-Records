"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
}));
app.use(express_1.default.json());
const candidateRoute_1 = __importDefault(require("./routes/candidateRoute"));
app.use("/api/candidate", candidateRoute_1.default);
const PORT = Number(process.env.PORT);
app.get("/", (_req, _res) => {
    _res.send("Inter Records API is running");
});
(0, database_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at 
         http://localhost:${PORT}`);
    });
});
