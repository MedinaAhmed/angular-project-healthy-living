import { Schema, model } from "mongoose";

export interface Food {
  id: string;
  name: string;
  price: number;
  tags: string[];
  favorite: boolean;
  stars: number;
  imageUrl: string;
  origins: string[];
  cookTime: string;
}
//defines the the structure and contents of your data
//validate documents whenever they're created, changed, or deleted.
export const FoodSchema = new Schema<Food>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String] },
    favorite: { type: Boolean, default: false },
    stars: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    origins: { type: [String], required: true },
    cookTime: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true, // id=_id
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true, //automaticly without need of update
  }
);

export const FoodModel = model<Food>("food", FoodSchema);
