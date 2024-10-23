"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import moment from "moment";
import { BsTrash } from "react-icons/bs";
import demoImage from "/public/img/demo_image.jpg";
import Input from "@/components/form/Input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { FaRegListAlt } from "react-icons/fa";
import {
  AiFillHeart,
  AiOutlineComment,
  AiOutlineHeart,
  AiTwotoneCalendar,
} from "react-icons/ai";

const BlogDetails = ({ params }) => {
  const [blogDetails, setBlogDetails] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [blogLikes, setBlogLikes] = useState(0);

  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [blogComments, setBlogComments] = useState(0);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session } = useSession();

  async function fetchBlog() {
    try {
      const response = await fetch(`/api/blog/${params.id}`);
      const blog = await response.json();
      setBlogDetails(blog);
      setIsLiked(blog?.likes?.includes(session?.user?._id));
      setBlogLikes(blog?.likes?.length || 0);
      setBlogComments(blog?.comments?.length || 0);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBlog();
    // for adstera
    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.src =
      "//windyplentiful.com/43/6a/f4/436af4beb161efb32216003e742b9dc9.js";

    // Create the second script element for another ad
    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src =
      "//windyplentiful.com/43/6a/f4/436af4beb161efb32216003e742b9dc9.js";

    // Get the containers for the ads
    const adContainer1 = document.getElementById("ad-container-1");
    const adContainer2 = document.getElementById("ad-container-2");

    // Append the scripts to the respective containers
    if (adContainer1) adContainer1.appendChild(script1);
    if (adContainer2) adContainer2.appendChild(script2);

    // Clean up the scripts if the component unmounts
    return () => {
      if (adContainer1 && adContainer1.contains(script1)) {
        adContainer1.removeChild(script1);
      }
      if (adContainer2 && adContainer2.contains(script2)) {
        adContainer2.removeChild(script2);
      }
    };
  }, []);

  const timeStr = blogDetails?.createdAt;
  const time = moment(timeStr);
  const formattedTime = time.format("D MMMM YYYY");

  const handleLike = async () => {
    if (!session?.user) {
      toast.error("Please login before liking.");
      return;
    }

    try {
      const response = await fetch(`/api/blog/${params.id}/like`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(null),
      });

      if (response.status === 200) {
        setIsLiked((prev) => !prev);
        setBlogLikes((prev) => (isLiked ? prev - 1 : prev + 1));
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentText) {
      setError("comment text is required.");
      return;
    }

    try {
      setIsCommenting(true);
      setError("");

      const newComment = {
        text: commentText,
      };

      const response = await fetch(`/api/blog/${params.id}/comment`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.accessToken}`,
        },
        method: "POST",
        body: JSON.stringify(newComment),
      });

      if (response?.status === 201) {
        setSuccess("Comment created successfully.");
        setTimeout(() => {
          setCommentText("");
          fetchBlog();
        }, 500);
      } else {
        setError("Error occurred while creating comment.");
      }
    } catch (error) {
      console.log(error);
      setError("Error occurred while creating comment.");
    }

    setIsCommenting(false);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `/api/blog/${params.id}/comment/${commentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
          method: "DELETE",
        }
      );

      if (response?.status === 200) {
        fetchBlog();
      } else {
        console.log("Request failed with status: ", response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="container max-w-3xl mx-auto px-4 md:px-0">
      <div className="flex flex-col items-center justify-center">
        <Link href={`/user/${blogDetails?.authorId?._id.toString()}`}>
          <div className="flex flex-col justify-center items-center py-10">
            <Image
              src={
                blogDetails?.authorId?.avatar?.url
                  ? blogDetails?.authorId?.avatar?.url
                  : demoImage
              }
              alt="avatar image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-20 h-20 rounded-full"
            />

            <div className="text-center">
              <p className="italic">Author: {blogDetails?.authorId?.name}</p>
            </div>
          </div>
        </Link>
        
        {/* First Ad Placement */}
        <div id="ad-container-1" className="ad-container my-4">
          {/* First Ad will be injected here */}
        </div>

        <div className="text-center space-y-3">
          <h2 className="font-semibold text-lg">{blogDetails?.title}</h2>

          <p>{blogDetails?.excerpt}</p>

          <p className="flex items-center justify-center gap-3">
            <span className="flex items-center gap-1">
              <FaRegListAlt />
              {blogDetails?.category}
            </span>

            <span className="flex items-center gap-1">
              <AiTwotoneCalendar />
              {formattedTime}
            </span>
          </p>

          {/* Second Ad Placement */}
          <div id="ad-container-2" className="ad-container my-2">
            {/* Second Ad will be injected here */}
          </div>

          <div>
            <Image
              src={blogDetails?.image ? blogDetails?.image?.url : demoImage}
              alt="blog details image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-full rounded-lg py-10"
            />
          </div>

          {/* Optionally, add a third Ad Placement */}
          <div id="ad-container-3" className="ad-container my-4">
            {/* Third Ad will be injected here */}
          </div>

          <div className="text-start">
            <div className="space-y-5">
              {blogDetails?.description && (
                <div
                  className="space-y-4 text-justify"
                  dangerouslySetInnerHTML={{ __html: blogDetails?.description }}
                ></div>
              )}
            </div>
          </div>
          {blogDetails?.infos &&
            blogDetails.infos.map((b) => {
              return (
                <div key={b._id} className="mt-6">
                  {b.infoDetails && (
                    <p
                      className={`mb-2 text-justify text-gray-900 dark:text-white`}
                    >
                      {b.infoDetails}
                    </p>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      <div className="py-12">
        <div className="flex gap-10 items-center text-xl justify-center">
          <div className="flex items-center gap-1">
            <p>{blogLikes}</p>

            {isLiked ? (
              <AiFillHeart
                onClick={handleLike}
                size={20}
                color="#ed5784"
                cursor="pointer"
              />
            ) : (
              <AiOutlineHeart onClick={handleLike} size={20} cursor="pointer" />
            )}
          </div>

          <div className="flex items-center gap-1">
            <p>{blogComments}</p>

            <AiOutlineComment size={20} />
          </div>
        </div>
      </div>

      <div>
        {!session?.user && (
          <h3 className="text-red-500">Kindly login to leave a comment.</h3>
        )}

        {session?.user && (
          <form onSubmit={handleCommentSubmit} className="space-y-2">
            <Input
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
              name="comment"
              type="text"
              placeholder="Type message..."
            />

            <Button type="submit" className="btn">
              {isCommenting ? "Loading..." : "Comment"}
            </Button>
          </form>
        )}

        {blogDetails?.comments && blogDetails?.comments.length === 0 && (
          <p className="mt-1 pb-2">No comments</p>
        )}

        {blogDetails?.comments && blogDetails?.comments.length > 0 && (
          <>
            {blogDetails.comments.map((comment) => (
              <div key={comment._id} className="flex gap-3 py-5 items-center">
                <Image
                  src={
                    comment?.user?.avatar?.url
                      ? comment?.user?.avatar?.url
                      : demoImage
                  }
                  alt="avatar image"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-10 h-10 rounded-full"
                />

                <div>
                  <p className="text-whiteColor">{comment?.user?.name}</p>
                  <p>{comment.text}</p>
                </div>

                {session?.user?._id === comment?.user?._id && (
                  <BsTrash
                    onClick={() => handleDeleteComment(comment._id)}
                    cursor="pointer"
                    className="text-red-500 ml-10"
                  />
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default BlogDetails;
