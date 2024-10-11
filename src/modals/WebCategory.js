import { model, models, Schema } from "mongoose";

const WebCategorySchema = new Schema(
  {
    name: { type: "String", required: true },
  },
  { timestamps: true }
);

export const WebCategory = models?.WebCategory || model("WebCategory", WebCategorySchema);