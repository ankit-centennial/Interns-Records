import { Request, Response } from "express";
import Candidate from "../models/candidate";

// Add Candidate
export const addCandidateController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, phone, status, joiningDate, duration } = req.body;

    if (!name || !email || !phone || !status || !joiningDate || !duration) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const addCandidate = await Candidate.create({
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
  } catch (error) {
    if ((error as any).code === 11000) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }
    res.status(500).json({
      message: "candidate not added",
      error: (error as Error).message,
    });
  }
};

//Get Candidate
export const getCandidateController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    //Pagination
    const candidate = await Candidate.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Candidate.countDocuments();

    res.status(200).json({
      candidate,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      error: (error as Error).message,
    });
  }
};

//Delete Candidate
export const deleteCandidateController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deleteCandidate = await Candidate.findByIdAndDelete(id);

    if (!deleteCandidate) {
      res.status(404).json({ message: "Candidate not found" });
      return;
    }

    res.status(200).json({ message: "Candidate deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      error: (error as Error).message,
    });
  }
};

//update Candidate
export const updateCandidateController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, email, phone, status, joiningDate, duration } = req.body;

    const candidate = { name, email, phone, status, joiningDate, duration };

    const updateCandidate = await Candidate.findByIdAndUpdate(id, candidate, {
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
  } catch (error) {
    res.status(500).json({
      message: "something went wrong",
      error: (error as Error).message,
    });
  }
};
