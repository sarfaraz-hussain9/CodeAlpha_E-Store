import { useEffect } from "react";
import { useAllUserAdminQuery } from "../../redux/api/usersApiSlice";
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useAllUserAdminQuery();

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching users:", error);
    return <div>Error fetching users.</div>;
  }

  if (!users || users.length === 0) {
    return <div>No users found.</div>;
  }

  return (
    <div className='w-screen min-h-[81vh] hidden lg:block'>
      <h1 className="text-2xl font-semibold underline mb-4 text-center">USERS LIST</h1>
      <table className="table-auto mx-auto">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-2">ID</th>
            <th className="px-6 py-2">USERNAME</th>
            <th className="px-6 py-2">EMAIL</th>
            <th className="px-6 py-2">isADMIN</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="px-6 py-2">{user._id}</td>
              <td className="px-6 py-2">{user.username}</td>
              <td className="px-6 py-2">{user.email}</td>
              <td className="px-6 py-2 text-center">
                {user.isAdmin ? (
                  <FaCheck className="text-green-500 mx-auto" />
                ) : (
                  <FaXmark className="text-red-500 mx-auto" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;