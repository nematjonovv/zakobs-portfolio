import { useState } from "react";
import AccountModal from "./modal/AccountModal";
import { useAccount } from "../Context/AccountContext";
import { useAuth } from "../Context/AuthContext";

function AccountSettings() {
  const [open, isOpen] = useState(false);
  const { loading, success, error, handleDelete, users } = useAccount();
  const { user } = useAuth();

  return (
    <div className="overflow-y-scroll hidden-scroll h-100 w-100 glassmorphism rounded-2xl border border-gray-500">
      <table className="min-w-full border glassmorphism rounded-lg overflow-hidden ">
        <thead className="border-b border-[#ffffff4d]">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Username
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Role
            </th>
            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {user?.role === "admin" ? (
            users?.data?.map((e, i) => (
              <tr
                key={i}
                className="hover:bg-black/6 transition border-b border-[#ffffff4d]"
              >
                <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                  {e.username}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{e.role}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="cursor-pointer hover:underline text-md hover:text-red-600 mr-4 bi bi-trash"
                    onClick={() => handleDelete(e.id)}
                  ></button>
                  <button className="cursor-pointer hover:underline text-md hover:text-purple-700 bi bi-pencil-square"></button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="px-6 py-6 text-center text-gray-500">
                You don’t have permission to view this data
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <AccountModal isOpen={open} onClose={() => isOpen(false)} />
    </div>
  );
}

export default AccountSettings;
