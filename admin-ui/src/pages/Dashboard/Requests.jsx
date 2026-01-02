import { useRequests } from "../../Context/RequestContext";
import ErrorMessage from "../../utils/Messages/ErrorMessage";
import SuccessMessage from "../../utils/Messages/SuccessMessage";

function Requests() {
  const { requests, loading, success, error, handleDelete } = useRequests();
  return (
    <div className="p-5 h-screen">
      <h3 className="text-3xl font-medium text-[#272930] mb-12">Requests</h3>
      <div className="rounded-xl border border-gray-200 glassmorphism">
        <table className="min-w-full">
          <thead className="border-b border-[#ffffff4d]">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                About Project
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#ffffff4d]">
            {requests?.data?.length > 0 ? (
              requests.data.map((e) => (
                <tr key={e.id} className="hover:bg-black/5 transition">
                  <td className="px-6 py-4 text-sm text-gray-800">{e.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{e.email}</td>

                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                    <div className="relative inline-block group">
                      <p className="truncate max-w-xs cursor-help">
                        {e.message}
                      </p>

                      <div
                        className="
                pointer-events-none
                absolute
                left-1/2
                mb-3
                w-96 h-auto
                -translate-x-1/2
                rounded-lg
                bg-gray-900
                text-white
                text-sm
                p-4
                shadow-2xl
                opacity-0
                scale-95
                transition
                duration-200
                group-hover:opacity-100
                group-hover:scale-100
                z-50
              "
                      >
                        {e.message}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDelete(e.id)}
                      className="px-4 py-1.5 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-10 text-center text-sm text-gray-500"
                >
                  No requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <SuccessMessage successMessage={success} />
      <ErrorMessage errMessage={error} />
    </div>
  );
}

export default Requests;
