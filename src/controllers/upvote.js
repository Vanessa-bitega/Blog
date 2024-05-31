import Reply from "../models/replies.js"


const upvoteReply= async (req, res) => {
  const replyId = req.query.id
  
    let userId = req.user.id
    try {
        const reply = await Reply.findById(replyId)
        if (!reply) {
            return res.status(404).json({ message: "Reply not found" })
        }
        const hasUpvoted = reply.votedBy.includes(userId);

        if (hasUpvoted) {
          // User has already upvoted, so remove the upvote
          reply.votedBy.pull(userId);
          reply.votes--; // Decrement vote count
        } else {
          // User hasn't upvoted, so add the upvote
          reply.votedBy.push(userId);
          reply.votes++; // Increment vote count
        }
        const updatedReply = await reply.save();
        res.status(200).json(updatedReply); 
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }

}

export default upvoteReply