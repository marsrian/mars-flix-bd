"use client";
import MovieFormPage from "@/components/form/MovieFormPage";
import DashboardTabs from "@/components/DashboardTabs";
import Left from "@/components/Left";
import Loading from "@/components/Loading";
import useProfile from "@/components/useProfile";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const NewMoviePage = () => {
  const [redirectItems, setRedirectItems] = useState(false);
  const { data, loading } = useProfile();

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/movies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving game...",
      success: "Saved!",
      error: "Error saving!",
    });

    setRedirectItems(true);
  }

  if (redirectItems) {
    return redirect("/dashboard/movies");
  }

  if (loading) {
    return <Loading loadingInfo={`Loading movies Info...`} />;
  }

  if (!data.admin) {
    return (
      <p className="italic text-red-600 text-center mt-20">Not an Admin</p>
    );
  }

  return (
    <section className="mt-8 px-2 md:px-0 w-full md:w-[800px] mx-auto">
      <DashboardTabs isAdmin={true} />
      <div className="mt-8 max-w-2xl mx-auto">
        <Link
          className="w-60 mx-auto flex justify-center gap-2 border rounded-md p-2 "
          href={"/dashboard/movies"}
        >
          <Left /> Show all movies
        </Link>
      </div>
      <MovieFormPage movieItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
};

export default NewMoviePage;
