import { model, models, Schema } from "mongoose";

const MovieCategorySchema = new Schema(
  {
    name: { type: "String", required: true },
  },
  { timestamps: true }
);

export const MovieCategory =
  models?.MovieCategory || model("MovieCategory", MovieCategorySchema);