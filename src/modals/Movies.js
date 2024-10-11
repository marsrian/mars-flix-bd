import mongoose, { Schema } from "mongoose";

const MovieSchema = new Schema(
  {
    movieName: {
      type: String,
      required: true,
    },
    moviePoster: {
      type: String,
      required: true,
    },
    releaseDate: {
      type: String,
      required: true,
    },
    IMDBRating: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    director: {
      type: String,
    },
    cast: {
      type: String,
    },
    language: {
      type: String,
      required: true,
    },
    quality: {
      type: String,
      required: true,
    },
    resolution: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    movieLink: {
      type: String,
      required: true,
    },
    trailerLink: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      default: "",
    },
    category: { type: mongoose.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);
const Movie = mongoose?.models?.Movie || mongoose?.model("Movie", MovieSchema);

export default Movie;