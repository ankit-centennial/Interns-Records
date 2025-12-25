import { useState } from "react";
import { type CandidateFormData } from "../types/candidate";
import { candidateAddApi } from "../api/candidateApi";
import { useNavigate } from "react-router-dom";

const AddCandidate = () => {
  const [formData, setFormData] = useState<CandidateFormData>({
    name: "",
    email: "",
    phone: "",
    status: "",
    joiningDate: "",
    duration: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name as keyof typeof prev]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const data = await candidateAddApi(formData);
      alert(data.message);
      navigate("/all-candidate");
    } catch (error: any) {
      alert(error.response?.data?.error);
    }
  };
  return (
    <div className="flex flex-col bg-white shadow-xl px-10 py-10 rounded-2xl my-10 w-full max-w-4xl">
      <div className="text-center pb-6">
        <h2 className="text-3xl font-bold">Add Candidate</h2>
      </div>
      <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="subpixel-antialiased text-lg font-stretch-expanded uppercase">Name</label>
          <input
            required
            type="text"
            placeholder="enter candidate name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded "
          />
        </div>

        <div className="flex flex-col  gap-2">
          <label className="subpixel-antialiased text-lg font-stretch-expanded uppercase">Email</label>
          <input
            required
            type="email"
            placeholder="enter candidate email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="subpixel-antialiased text-lg font-stretch-expanded uppercase">Phone</label>
          <input
            required
            type="tel"
            placeholder="enter candidate phone no."
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="border p-2 rounded "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="subpixel-antialiased text-lg font-stretch-expanded uppercase">Status</label>
          <select
            required
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Status</option>
            <option value="interested">Interested</option>
            <option value="busy">Busy</option>
            <option value="no response">No Response</option>
            <option value="no incoming service">No Incoming Service</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="subpixel-antialiased text-lg font-stretch-expanded uppercase">Joining Date</label>
          <input
            required
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={handleChange}
            className="border p-2 rounded "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="subpixel-antialiased text-lg font-stretch-expanded uppercase">Duration</label>
          <input
            required
            type="text"
            placeholder="1 month"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="border p-2 rounded "
          />
        </div>
        <div className="w-full flex justify-center lg:ml-54 mt-4">
          <button
            type="submit"
            className="bg-cyan-600 px-6 py-2 rounded-lg text-white text-lg hover:cursor-pointer hover:bg-cyan-500"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCandidate;
