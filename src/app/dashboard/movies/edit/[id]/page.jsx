"use client";
import DeleteButton from "@/components/form/DeleteButton";
import MovieFormPage from "@/components/form/MovieFormPage";
import DashboardTabs from "@/components/DashboardTabs";
import Left from "@/components/Left";
import Loading from "@/components/Loading";
import useProfile from "@/components/useProfile";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditMoviePage = () => {
  const { id } = useParams();
  const [movieItem, setMoviesItem] = useState(null);
  const [redirectItems, setRedirectItems] = useState(false);
  const { data, loading } = useProfile();

  useEffect(() => {
    fetch("/api/movies").then((res) => {
      res.json().then((items) => {
        const item = items.movies.find((i) => i._id === id);
        setMoviesItem(item);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/movies", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) resolve();
      else reject();
    });

    await toast.promise(savingPromise, {
      loading: "Saving item...",
      success: "Saved!",
      error: "Error saving!",
    });

    setRedirectItems(true);
  }

  // DELETE MOVIE DATA:
  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/movies?_id=" + id, {
        method: "DELETE",
      });
      if (res.ok) resolve();
      else reject();
    });
    await toast.promise(promise, {
      loading: "Deleting item...",
      success: "Deleted!",
      error: "Error deleting!",
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
    <section className="mt-8 px-2 md:px-0 w-full md:w-[800px] mx-auto mb-4">
      <DashboardTabs isAdmin={true} />
      <div className="mt-8 max-w-md mx-auto">
        <Link
          className="w-60 mx-auto flex justify-center gap-2 border border-white rounded-md p-2 text-white"
          href={"/dashboard/movies"}
        >
          <Left /> Show all movies
        </Link>
      </div>
      <MovieFormPage movieItem={movieItem} onSubmit={handleFormSubmit} />
      <DeleteButton
        label="Delete this movie item"
        onDelete={handleDeleteClick}
      />
    </section>
  );
};

export default EditMoviePage;