import { useEffect, useState } from "react";
import { candidateDeleteApi, candidateGetApi } from "../api/candidateApi";
import type { Candidate } from "../types/candidate";

const AllCandidate = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  useEffect(() => {
    const fetchCandidate = async (): Promise<void> => {
      try {
        const data = await candidateGetApi();
        setCandidates(data);
      } catch (error) {
        console.error("Error fetching candidate", error);
      }
    };
    fetchCandidate();
  }, []);

  const handleDelete = async (id:string): Promise<void> => {
    try {
      const res = await candidateDeleteApi(id)
      alert(res.data.message);

      const newCandidates = candidates.filter((candidate)=> candidate._id != id)
      setCandidates(newCandidates)
    } catch (error: any) {
      alert(error.response?.data?.error);
      
    }
  }

  return (
    <div className="p-6  mt-5 lg:mt-10 overflow-x-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h2 className="text-xl font-semibold text-gray-800">All Candidates</h2>
        <input
          type="text"
          placeholder="Search by name or email..."
          // value={search}
          // onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow ">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-cyan-600 text-white">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">status</th>
              <th className="p-3">Joining Date</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {candidates.map((candidate) => (
              <tr key={candidate._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{candidate.name}</td>
                <td className="p-3">{candidate.email}</td>
                <td className="p-3">{candidate.phone}</td>
                <td className="p-3">{candidate.status}</td>
                <td className="p-3">
                  {new Date(candidate.joiningDate).toLocaleDateString("en-Us", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="p-3">{candidate.duration}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button className="px-3 py-2 bg-green-600 rounded-lg">
                      Edit
                    </button>
                    <button className="px-3 py-2 bg-red-500 rounded-lg"
                    onClick={()=>handleDelete(candidate._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCandidate;
