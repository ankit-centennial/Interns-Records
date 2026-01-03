import { useState } from "react";
import { type CandidateFormData, type Candidate } from "../types/candidate";
import { candidateEditApi } from "../api/candidateApi";

interface EditableRowProp {
  candidat: Candidate;
  setEditCandidateId: React.Dispatch<React.SetStateAction<string | null>>;
}
const EditableRow = ({ candidat, setEditCandidateId }: EditableRowProp) => {
  const [editFormData, setEditFormData] = useState<CandidateFormData>({
    name: candidat.name,
    email: candidat.email,
    phone: candidat.phone,
    status: candidat.status ?? "",
    joiningDate: candidat.joiningDate ?? "",
    duration: candidat.duration ?? "",
    jobBoard: candidat.jobBoard,
    jobPostedDate: candidat.jobPostedDate,
    appliedDate: candidat.appliedDate,
    jobPostedBy: candidat.jobPostedBy,
    offerLetterSent: candidat.offerLetterSent ?? "",
    offerLetterAccepted: candidat.offerLetterAccepted ?? "",
    candidateEnrolled: candidat.candidateEnrolled ?? "",
  });
  const editHandleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name as keyof typeof prev]: value,
    }));
  };

  const handleEditSave = async () => {
    try {
      const data = await candidateEditApi(candidat._id, editFormData);
      alert(data.message);
    } catch (error: any) {
      alert(error.response?.data?.error);
    }
  };

  const handleEditCancel = () => {
    setEditCandidateId(null);
  };

  return (
    <tr key={candidat._id}>
      <td>
        <input
          type="text"
          className="border mt-3 mr-3"
          value={editFormData.name}
          name="name"
          onChange={editHandleChange}
        />
      </td>
      <td>
        <input
          type="email"
          className="border mt-3 mr-3"
          value={editFormData.email}
          name="email"
          onChange={editHandleChange}
        />
      </td>

      <td>
        <input
          type="tel"
          className="border mt-3 mr-3"
          value={editFormData.phone}
          name="phone"
          onChange={editHandleChange}
        />
      </td>
      <td>
        <select
          name="status"
          value={editFormData?.status || ""}
          onChange={editHandleChange}
          className="border mt-3 mr-3  rounded"
        >
          <option value="">Select Status</option>
          <option value="interested">Interested</option>
          <option value="busy">Busy</option>
          <option value="no response">No Response</option>
          <option value="no incoming service">No Incoming Service</option>
          <option value="rejected">Rejected</option>
        </select>
      </td>

      <td>
        <input
          type="date"
          className="border mt-3 mr-3"
          value={editFormData.joiningDate}
          name="joiningDate"
          onChange={editHandleChange}
        />
      </td>

      <td>
        <input
          type="text"
          className="border mt-3 mr-3"
          value={editFormData.duration}
          name="duration"
          placeholder="1 month"
          onChange={editHandleChange}
        />
      </td>
      <td>
        <input
          type="text"
          className="border mt-3 mr-3"
          value={editFormData.jobBoard}
          name="jobBoard"
          onChange={editHandleChange}
        />
      </td>

      <td>
        <input
          type="date"
          className="border mt-3 mr-3"
          value={editFormData.jobPostedDate.slice(0, 10)}
          name="jobPostedDate"
          onChange={editHandleChange}
        />
      </td>

      <td>
        <input
          type="text"
          className="border mt-3 mr-3"
          value={editFormData.jobPostedBy}
          name="jobPostedBy"
          onChange={editHandleChange}
        />
      </td>

      <td>
        <input
          type="date"
          className="border mt-3 mr-3"
          value={editFormData.appliedDate.slice(0, 10)}
          name="appliedDate"
          onChange={editHandleChange}
        />
      </td>

      <td>
        <input
          type="text"
          className="border mt-3 mr-3"
          value={editFormData.offerLetterSent}
          name="offerLetterSent"
          placeholder=""
          onChange={editHandleChange}
        />
      </td>

      <td>
        <input
          type="text"
          className="border mt-3 mr-3"
          value={editFormData.offerLetterAccepted}
          name="offerLetterAccepted"
          placeholder=""
          onChange={editHandleChange}
        />
      </td>

      <td>
        <input
          type="text"
          className="border mt-3 mr-3"
          value={editFormData.candidateEnrolled}
          name="candidateEnrolled"
          placeholder=""
          onChange={editHandleChange}
        />
      </td>
      <td className="p-3">
        <div className="flex gap-3 justify-around">
          <button
            className="px-3 py-2 bg-blue-500 rounded-lg hover:cursor-pointer hover:bg-blue-400"
            onClick={handleEditSave}
          >
            Save
          </button>
          <button
            className="px-3 py-2 bg-yellow-500 rounded-lg hover:cursor-pointer hover:bg-yellow-400"
            onClick={handleEditCancel}
          >
            Cancel
          </button>
        </div>
      </td>
    </tr>
  );
};

export default EditableRow;
