import { Schema, model } from "mongoose";

const storySchema = new Schema({
  caption: { type: String, required: false, default: "" },
  storyFile: { type: String, required: true },
  Author_id: { type: Schema.Types.ObjectId, ref: "user", required: true },
}, {
  timestamps: true,
});

export const Story = model("Story", storySchema);
export default Story;
