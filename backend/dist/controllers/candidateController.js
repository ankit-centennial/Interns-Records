"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCandidateController = exports.deleteCandidateController = exports.getCandidateController = exports.addCandidateController = void 0;
const candidate_1 = __importDefault(require("../models/candidate"));
// Add Candidate
const addCandidateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, status, joiningDate, duration } = req.body;
        if (!name || !email || !phone || !status || !joiningDate || !duration) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const addCandidate = yield candidate_1.default.create({
            name,
            email,
            phone,
            status,
            joiningDate,
            duration,
        });
        res
            .status(201)
            .json({ message: "candidate added successfully", addCandidate });
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ message: "Email already exists" });
            return;
        }
        res.status(500).json({
            message: "candidate not added",
            error: error.message,
        });
    }
});
exports.addCandidateController = addCandidateController;
//Get Candidate
const getCandidateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 5, 1);
    const skip = (page - 1) * limit;
    const candidate = yield candidate_1.default.find().skip(skip).limit(limit);
    const total = yield candidate_1.default.countDocuments();
    res.status(200).json({
        candidate,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    });
});
exports.getCandidateController = getCandidateController;
//Delete Candidate
const deleteCandidateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteCandidate = yield candidate_1.default.findByIdAndDelete(id);
        if (!deleteCandidate) {
            res.status(404).json({ message: "Candidate not found" });
            return;
        }
        res.status(200).json({ message: "Candidate deleted successfully" });
    }
    catch (error) {
        res.status(500).json({
            message: "something went wrong",
            error: error.message,
        });
    }
});
exports.deleteCandidateController = deleteCandidateController;
//update Candidate
const updateCandidateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email, phone, status, joiningDate, duration } = req.body;
        const candidate = { name, email, phone, status, joiningDate, duration };
        const updateCandidate = yield candidate_1.default.findByIdAndUpdate(id, candidate, {
            new: true,
            runValidators: true,
        });
        if (!updateCandidate) {
            res.status(404).json({ message: "Candidate not found" });
            return;
        }
        res
            .status(200)
            .json({ message: "Candidate update successfully", updateCandidate });
    }
    catch (error) {
        res.status(500).json({
            message: "something went wrong",
            error: error.message,
        });
    }
});
exports.updateCandidateController = updateCandidateController;
