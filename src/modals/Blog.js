import mongoose, { Schema } from "mongoose";

const InfoSchema = new Schema({
  serial: Number,
  infoDetails: String,
});

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    excerpt: {
      type: String,
    },
    quote: {
      type: String,
    },
    image: {
      id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Select Category",
        "Movie List",
        "Movie Review",
        "TV Series Review",
        "TV Series List",
        "Entertainment",
        "Tech Trick",
        "Terms"
      ],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
      },
    ],
    infos: { type: [InfoSchema] },
  },
  { timestamps: true }
);

export default mongoose?.models?.Blog || mongoose.model("Blog", BlogSchema);