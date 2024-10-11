"use client";
import DeleteButton from "@/components/form/DeleteButton";
import WebSeriesFormPage from "@/components/form/WebSeriesFormPage";
import DashboardTabs from "@/components/DashboardTabs";
import Left from "@/components/Left";
import Loading from "@/components/Loading";
import useProfile from "@/components/useProfile";
import Link from "next/link";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const EditWebSeriesPage = () => {
  const { id } = useParams();
  const [webSeriesItem, setWebSeriesItem] = useState(null);
  const [redirectItems, setRedirectItems] = useState(false);
  const {data, loading} = useProfile();

  useEffect(() => {
    fetch("/api/web-series").then((res) => {
      res.json().then((items) => {
        const item = items.webSeries.find((i) => i._id === id);
        setWebSeriesItem(item);
      });
    });
  }, []);

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    data = { ...data, _id: id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/web-series", {
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

  // DELETE GAME DATA:
  async function handleDeleteClick() {
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/web-series?_id=" + id, {
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
    return redirect("/dashboard/web-series");
  }

  if (loading) {
    return <Loading loadingInfo={`Loading Web Series Info...`} />;
  }

  if (!data.admin) {
    return (
      <p className="italic text-red-600 text-center mt-20">Not an Admin</p>
    );
  }

  return (
    <section className="mt-8 px-2 md:px-0 w-full md:w-[800px] mx-auto">
      <DashboardTabs isAdmin={true} />
      <div className="mt-8 max-w-md mx-auto">
        <Link
          className="w-60 mx-auto flex justify-center gap-2 border rounded-md p-2"
          href={"/dashboard/web-series"}
        >
          <Left /> Show all web-series
        </Link>
      </div>
      <WebSeriesFormPage webSeriesItem={webSeriesItem} onSubmit={handleFormSubmit} />
      <div
        className={`my-4 bg-orange-800 text-white rounded-xl`}
      >
        <DeleteButton
          label="Delete this series item"
          onDelete={handleDeleteClick}
        />
      </div>
    </section>
  );
};

export default EditWebSeriesPage;