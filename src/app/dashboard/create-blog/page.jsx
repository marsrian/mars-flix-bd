"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/components/form/Input";
import TextArea from "@/components/form/TextArea";
import DashboardTabs from "@/components/DashboardTabs";
import { Button } from "@/components/ui/button";
import Loading from "@/components/Loading";
import useProfile from "@/components/useProfile";
import BlogItemProps from "@/components/form/BlogItemProps";

const initialState = {
  title: "",
  description: "",
  excerpt: "",
  quote: "",
  category: "",
  photo: "",
};

const CreateBlog = () => {
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUD_NAME;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

  const [state, setState] = useState(initialState);
  const [infos, setInfos] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession();
  const { data, loading } = useProfile();

  const handleChange = (event) => {
    setError("");
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setState({ ...state, [name]: files[0] });
    } else {
      setState({ ...state, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { photo, title, category, description, excerpt, quote } =
      state;

    if (!title || !category) {
      setError("Please fill out all required fields.");
      return;
    }

    if (photo) {
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (photo.size > maxSize) {
        setError("File size is too large. Please select a file under 5MB.");
        return;
      }
    }

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");
      const image = await uploadImage();

      const newBlog = {
        title,
        description,
        excerpt,
        quote,
        category,
        image,
        infos,
        authorId: session?.user?._id,
      };

      const response = await fetch(`/api/blog`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "POST",
        body: JSON.stringify(newBlog),
      });

      if (response?.status === 201) {
        setSuccess("Blog created successfully.");
        setTimeout(() => {
          router.refresh();
          router.push("/blog");
        }, 1500);
      } else {
        setError("Error occurred while creating blog.");
      }
    } catch (error) {
      console.log(error);
      setError("Error occurred while creating blog.");
    }

    setIsLoading(false);
  };

  const uploadImage = async () => {
    if (!state.photo) return;

    const formdata = new FormData();

    formdata.append("file", state.photo);
    formdata.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formdata,
        }
      );

      const data = await res.json();
      const image = {
        id: data["public_id"],
        url: data["secure_url"],
      };

      return image;
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading loadingInfo={`Loading Blog Info...`} />;
  }

  if (!data.admin) {
    return (
      <p className="italic text-red-600 text-center mt-20">Not an Admin</p>
    );
  }

  return (
    <section className="container max-w-3xl mx-auto mt-8 px-2 md:px-0">
      <DashboardTabs isAdmin={true} />
      <h2 className="text-center font-bold text-lg mb-5">
        <span className="">Create</span> Blog
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 mb-4 md:mb-8">
        <Input
          label="Title"
          type="text"
          name="title"
          placeholder="Write you title here..."
          onChange={handleChange}
          value={state.title}
        />

        <TextArea
          label="Description"
          rows="4"
          name="description"
          placeholder="Write you description here..."
          onChange={handleChange}
          value={state.description}
        />

        <TextArea
          label="Excerpt"
          rows="2"
          name="excerpt"
          placeholder="Write you excerpt here..."
          onChange={handleChange}
          value={state.excerpt}
        />

        <TextArea
          label="Quote"
          rows="2"
          name="quote"
          placeholder="Write you quote here..."
          onChange={handleChange}
          value={state.quote}
        />

        <div>
          <label className="block">Select an option</label>
          <select
            name="category"
            onChange={handleChange}
            value={state.category}
            className="block rounded-lg w-full p-3 bg-primaryColorLight"
          >
            <option value="Select Category">Select Category</option>
            <option value="Movie List">Movie List</option>
            <option value="Movie Review">Movie Review</option>
            <option value="TV Series List">TV Series List</option>
            <option value="TV Series Review">TV Series Review</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Tech Trick">Tech Trick</option>
            <option value="Terms">Terms</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Upload Image</label>

          <input
            onChange={handleChange}
            type="file"
            name="photo"
            accept="image/*"
          />

          {state.photo && (
            <div>
              <Image
                src={URL.createObjectURL(state.photo)}
                priority
                alt="Sample image"
                width={0}
                height={0}
                sizes="100vw"
                className="w-32 mt-5"
              />
            </div>
          )}
        </div>
        {/* Information Form: */}
        <div className="flex flex-col">
          <label className="">Add Infos:</label>
          <BlogItemProps
            name="Infos"
            props={infos}
            setProps={setInfos}
            addLabel={"Add Info"}
          />
        </div>

        {error && <div className="text-red-700">{error}</div>}

        {success && <div className="text-green-700">{success}</div>}

        <Button type="submit" className="btn">
          {isLoading ? "Loading..." : "Create"}
        </Button>
      </form>
    </section>
  );
};

export default CreateBlog;