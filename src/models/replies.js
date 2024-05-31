import { Schema, model } from 'mongoose';

const replySchema = new Schema({
  content: { type:  Schema.Types.Mixed, require:true},
  
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to your User model (if applicable)
    required: true,
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Question' || 'Reply', // Reference to either Blog or Reply model
    },
    votes: {
        type: Number,
        default: 0,
      },
      votedBy: [{
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to your User model (if applicable)
      }],
  
 
} ,{ timestamps: true });

const Reply = model('Reply', replySchema);

export default Reply;
