"use client";
import DashboardTabs from "@/components/DashboardTabs";
import UserForm from "@/components/form/UserForm";
import Left from "@/components/Left";
import Loading from "@/components/Loading";
import useProfile from "@/components/useProfile";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditUserPage = () => {
  const { data, loading } = useProfile();
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/profile?_id=${id}`).then((res) => {
      res.json().then((user) => {
        setUser(user);
      });
    });
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (res.ok) {
        resolve();
      } else {
        reject();
      }
    });

    await toast.promise(promise, {
      loading: "Saving user...",
      success: "User saved!",
      error: "Error !",
    });
  }

  if (loading) {
    return <Loading loadingInfo={`Loading user Info...`} />;
  }

  if (!data.admin) {
    return (
      <p className="italic text-red-600 text-center mt-20">Not an Admin</p>
    );
  }
  return (
    <section className="mt-8 px-2 md:px-0 w-full md:w-[800px] mx-auto">
      <DashboardTabs isAdmin={true} />
      <Link
        className="w-60 mx-auto flex justify-center gap-2 border rounded-md p-2 "
        href={"/dashboard/users"}
      >
        <Left /> Show all users
      </Link>
      <div className="mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick} />
      </div>
    </section>
  );
};

export default EditUserPage;