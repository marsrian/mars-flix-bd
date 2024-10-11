"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import DashboardTabs from "@/components/DashboardTabs";
import Loading from "@/components/Loading";
import useProfile from "@/components/useProfile";

const UsersInfoPage = () => {
  const [users, setUsers] = useState([]);
  const { data, loading } = useProfile();

  useEffect(() => {
    fetch("/api/user").then((res) => {
      res.json().then((users) => {
        setUsers(users);
      });
    });
  }, []);

  if (loading) {
    return <Loading loadingInfo={`Loading users Info...`} />;
  }

  if (!data.admin) {
    return (
      <p className="italic text-red-600 text-center mt-20">Not an Admin</p>
    );
  }

  return (
    <section className="mt-8 px-2 md:px-0 w-full md:w-[800px] mx-auto">
      <DashboardTabs isAdmin={true} />
      <h3 className="italic text-center text-lg font-semibold text-gray-900 dark:text-white">Users Information:</h3>
      <div className="mt-2">
        {users?.length &&
          users.map((user) => (
            <div
              key={user._id}
              className="bg-gray-100 rounded-lg mb-2 py-2 px-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col md:flex-row justify-between w-[240px] md:w-[600px] md:gap-6">
                  <div className="text-gray-900">
                    {!!user.name && <span>{user.name}</span>}
                    {!user.name && <span className="italic">No name</span>}
                  </div>
                  <p className="text-gray-500">{user.email}</p>
                </div>
                <div>
                  <Link
                    className="button"
                    href={"/dashboard/users/" + user._id}
                  >
                    <FaEdit title="Edit" className="text-2xl text-gray-600" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default UsersInfoPage;
