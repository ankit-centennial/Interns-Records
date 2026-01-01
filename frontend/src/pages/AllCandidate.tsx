import { useEffect, useState } from "react";
import { candidateDeleteApi, candidateGetApi } from "../api/candidateApi";
import { type Pagination, type Candidate } from "../types/candidate";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const AllCandidate = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [search, setSearch] = useState<string>("");
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 1,
    search: "",
  });

  const [loading, setLoading] = useState<boolean>(true);

  const totalPages =
    Number.isInteger(pagination.totalPages) && pagination.totalPages > 0
      ? pagination.totalPages
      : 1;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidate = async (): Promise<void> => {
      try {
        const data = await candidateGetApi(page, limit, search);

        const candidates = data?.candidate || [];
        const pagination = data?.pagination || {};

        setCandidates(candidates);
        setPagination((prev) => ({
          ...prev,
          page: Number(pagination?.page) || 1,
          limit: Number(pagination?.limit) || limit,
          totalPages: Number(pagination?.totalPages) || 1,
          total: Number(pagination?.total) || 0,
          search,
        }));
      } catch (error) {
        console.error("Error fetching candidate", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCandidate();
  }, [page, search]);

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const data = await candidateDeleteApi(id);
      alert(data.message);

      const newCandidates = candidates.filter(
        (candidate) => candidate._id != id
      );
      setCandidates(newCandidates);
    } catch (error: any) {
      alert(error.response?.data?.error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center px-4">
      <div className="p-4 overflow-x-auto w-full  bg-white shadow-lg rounded-lg  flex flex-col my-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
          <h2 className="text-xl font-semibold text-gray-800">
            All Candidates
          </h2>
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
                <th className="p-3">Job Board</th>
                <th className="p-3">Job Posted Date</th>
                <th className="p-3">Posted By</th>
                <th className="p-3">Applied Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {candidates?.length > 0 ? (
                candidates.map((candidate) => (
                  <tr
                    key={candidate._id}
                    className="border-b hover:bg-gray-50 "
                  >
                    <td className="p-3">{candidate.name}</td>
                    <td className="p-3">{candidate.email}</td>
                    <td className="p-3">{candidate.phone}</td>
                    <td className="p-3">{candidate.status}</td>
                    <td className="p-3">
                      {candidate.joiningDate &&
                      !isNaN(Date.parse(candidate.joiningDate))
                        ? new Date(candidate.joiningDate).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )
                        : "N/A"}
                    </td>
                    <td className="p-3">{candidate.duration || "N/A"}</td>
                    <td className="p-3">{candidate.jobBoard}</td>
                    <td className="p-3">
                      {candidate.jobPostedDate &&
                      !isNaN(Date.parse(candidate.jobPostedDate))
                        ? new Date(candidate.jobPostedDate).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )
                        : "N/A"}
                    </td>

                    <td className="p-3">{candidate.jobPostedBy}</td>

                    <td className="p-3">
                      {candidate.appliedDate &&
                      !isNaN(Date.parse(candidate.appliedDate))
                        ? new Date(candidate.appliedDate).toLocaleDateString(
                            "en-US",
                            { year: "numeric", month: "long", day: "numeric" }
                          )
                        : "N/A"}
                    </td>

                    <td className="p-3">
                      <div className="flex gap-3 justify-around">
                        <button
                          className="px-3 py-2 bg-green-600 rounded-lg hover:cursor-pointer hover:bg-green-500"
                          onClick={() =>
                            navigate("/", { state: { candidates: candidate } })
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-2 bg-red-500 rounded-lg hover:cursor-pointer hover:bg-red-400"
                          onClick={() => handleDelete(candidate._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center p-3 text-gray-500">
                    No candidates found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center itmes-center mt-4 space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded-lg ${
                page === i + 1
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="bg-gray-200 rounded-lg disabled:opacity-50 px-3 py-1"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllCandidate;
