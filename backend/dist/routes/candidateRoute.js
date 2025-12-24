"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const candidateController_1 = require("../controllers/candidateController");
const router = express_1.default.Router();
router.post("/add", candidateController_1.addCandidateController);
router.get("/", candidateController_1.getCandidateController);
router.delete("/:id", candidateController_1.deleteCandidateController);
router.put("/:id", candidateController_1.updateCandidateController);
exports.default = router;
