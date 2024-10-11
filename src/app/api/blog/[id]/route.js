import dbConnect from "@/lib/dbConnect";
import Blog from "@/modals/Blog";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  await dbConnect();
  const id = res.params.id;
  try {
    const blog = await Blog.findById(id)
      .populate({
        path: "authorId",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "GET error" },
      {
        status: 500,
      }
    );
  }
}