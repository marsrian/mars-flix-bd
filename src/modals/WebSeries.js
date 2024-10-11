import mongoose, { models, model, Schema } from "mongoose";

const EpisodeSchema = new Schema({
  serial: Number,
  episodeLink: String,
});

const WebSeriesSchema = new Schema(
  {
    seriesName: { type: "String" },
    moviePoster: { type: "String" },
    duration: { type: "String" },
    IMDBRating: { type: "String" },
    season: { type: "String" },
    totalEpisode: { type: "String" },
    language: { type: "String" },
    quality: { type: "String" },
    resolution: { type: "String" },
    size: { type: "String" },
    releaseDate: { type: "String" },
    trailerLink: { type: "String" },
    genre: { type: "String" },
    description: { type: "String" },
    category: { type: mongoose.Types.ObjectId },
    episodes: { type: [EpisodeSchema] },
  },
  {
    timestamps: true,
  }
);

export const WebSeries = models?.WebSeries || model("WebSeries", WebSeriesSchema);