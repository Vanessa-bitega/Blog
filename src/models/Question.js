import mongoose from "mongoose";

const { Schema } = mongoose;

const QuestionSchema = new Schema(
  {
    title: { type: String, required: true },
    subtitle: String,
    body: { type: Schema.Types.Mixed },
    genre: { type: String, required: true }, // Add genre field
    tags: [{
      type: Schema.Types.Object,
      ref: 'Tag',
      required: false
    }],
    replies: [{
      type: Schema.Types.Object,
      ref: 'Reply' // Reference to your Reply model
    }]
  },
  { timestamps: true }
);

QuestionSchema.index({ genre: 1 }); // Index the genre field

QuestionSchema.virtual('populatedReplies')
  .get(function() {
    return this.populate('replies'); // Populate replies with content
  });

QuestionSchema.virtual('populatedTags', {
  ref: 'Tag',
  localField: 'tags',
  foreignField: '_id',
  justOne: false // Set to false for array of tags
});

const Question = mongoose.model("Question", QuestionSchema);

export default Question;
