import { useEffect, useState } from "react";
import { candidateGetApi, candidateDeleteApi } from "../api/candidateApi";
import { type Pagination, type Candidate } from "../types/candidate";
import Loading from "../components/Loading";
import ReadOnlyRow from "../components/ReadOnlyRow";
import EditableRow from "../components/EditableRow";

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
  const [editCandidateId, setEditCandidateId] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const totalPages =
    Number.isInteger(pagination.totalPages) && pagination.totalPages > 0
      ? pagination.totalPages
      : 1;

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

  const handleEditClick = (candidate: Candidate): void => {
    setEditCandidateId(candidate._id);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-screen flex flex-col items-center px-4 ">
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
        <div className="bg-white rounded-lg">
          <form action="">
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
                  <th className="p-3">Offer Letter Sent</th>
                  <th className="p-3">Offer Letter Accepted</th>
                  <th className="p-3">Candidate Enrolled</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>

              <tbody>
                {candidates?.length > 0 ? (
                  candidates.map((candidate) => (
                    <>
                      {editCandidateId === candidate._id ? (
                        <EditableRow
                          candidat={candidate}
                          setEditCandidateId={setEditCandidateId}
                        ></EditableRow>
                      ) : (
                        <ReadOnlyRow
                          key={candidate._id}
                          candidate={candidate}
                          onDelete={handleDelete}
                          onEdit={handleEditClick}
                        ></ReadOnlyRow>
                      )}
                    </>
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
          </form>
        </div>

        {/* Pagination */}

        <div className="w-full mt-4 flex justify-center">
          <div className="flex border rounded-lg overflow-hidden">
            <button
              className="px-4 py-2 bg-gray-200 disabled:opacity-50 border-r"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              «
            </button>

            <button className="px-4 py-2 bg-gray-100 text-sm font-medium">
              Page {page} of {totalPages}
            </button>

            <button
              className="px-4 py-2 bg-gray-200 disabled:opacity-50 border-l"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCandidate;
