"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const candidateSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["busy", "interested", "no response", "no incoming service"],
        required: true,
    },
    joiningDate: {
        type: Date,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Candidate = (0, mongoose_1.model)("Candidate", candidateSchema);
exports.default = Candidate;
