const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // This will add `createdAt` and `updatedAt` fields and manage them automatically
  }
);

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
