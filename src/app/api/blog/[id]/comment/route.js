import dbConnect from "@/lib/dbConnect";
import { verifyJwtToken } from "@/lib/jwt";
import Blog from "@/modals/Blog";
import User from "@/modals/User";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  await dbConnect();
  const id = res.params.id;
  const accessToken = req.headers.get("authorization");
  const token = accessToken.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ error: "unauthorized (wrong or expired token" }),
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const blog = await Blog.findById(id);
    const user = await User.findById(decodedToken._id);

    const newComment = {
      text: body.text,
      user,
    };

    blog.comments.unshift(newComment);

    await blog.save();

    return NextResponse.json(blog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "POST error" });
  }
}