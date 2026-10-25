import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      minLength: 8,
      required: function () {
        return this.provider === "local";
      },
    },

    provider: {
      type: String,
      enum: ["google", "facebook", "local"],
      default: "local",
    },

    role: {
      type: String,
      enum: ["citizen", "admin"],
      default: "citizen",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true,
    },
  },
);

export const User = model("User", userSchema);
