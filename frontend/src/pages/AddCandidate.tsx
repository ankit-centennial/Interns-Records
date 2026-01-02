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
    jobBoard: "",
    jobPostedDate: "",
    appliedDate: "",
    jobPostedBy: "",
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
    <div className="flex flex-col bg-white shadow-xl px-10 py-4 rounded-2xl  w-full max-w-3xl my-10 justify-center items-center">
      <div className="text-center pb-6">
        <h2 className="text-3xl font-bold">Add Candidate</h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  gap-4 w-full  max-w-xl "
      >
        <div className="flex flex-col">
          <label className="subpixel-antialiased text-lg font-stretch-expanded uppercase">
            Name
          </label>
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

        <div className="flex flex-col  ">
          <label className="subpixel-antialiased text-lg font-stretch-expanded uppercase">
            Email
          </label>
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

        <div className="flex flex-col ">
          <label className="subpixel-antialiased text-lg font-stretch-expanded uppercase">
            Phone
          </label>
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

        <div className="flex flex-col ">
          <label className="subpixel-antialiased text-lg font-stretch-expanded uppercase">
            Job board
          </label>
          <input
            required
            type="text"
            placeholder="enter job board name"
            name="jobBoard"
            value={formData.jobBoard}
            onChange={handleChange}
            className="border p-2 rounded "
          />
        </div>

        <div className="flex flex-col ">
          <label className="subpixel-antialiased text-lg font-stretch-expanded uppercase">
            Job posted Date
          </label>
          <input
            required
            type="date"
            name="jobPostedDate"
            value={formData.jobPostedDate.slice(0, 10)}
            onChange={handleChange}
            className="border p-2 rounded "
          />
        </div>

        <div className="flex flex-col ">
          <label className="subpixel-antialiased text-lg font-stretch-expanded uppercase">
            Applied Date
          </label>
          <input
            required
            type="date"
            name="appliedDate"
            value={formData.appliedDate.slice(0, 10)}
            onChange={handleChange}
            className="border p-2 rounded "
          />
        </div>

        <div className="flex flex-col ">
          <label className="subpixel-antialiased text-lg font-stretch-expanded uppercase">
            Job Posted By
          </label>
          <input
            required
            type="text"
            placeholder="posted by"
            name="jobPostedBy"
            value={formData.jobPostedBy}
            onChange={handleChange}
            className="border p-2 rounded "
          />
        </div>

        <div className="flex lg:mt-6 w-full justify-center">
          <button
            type="submit"
            className="bg-cyan-600 px-6 py-3  rounded-lg text-white text-lg hover:cursor-pointer hover:bg-cyan-500"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCandidate;
