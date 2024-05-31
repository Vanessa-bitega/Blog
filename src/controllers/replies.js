
import Question from "../models/Question.js";
import Reply from "../models/replies.js";
const createReply = async (req, res) => {
    if (!req.user || !req.user.id) {
        res.send('You have to login to make a reply');
        return; // Add return statement to exit function
    }

    const questionId = req.query.id;
    

    try { 
        // Retrieve the content of the question
        const question = await Question.findById(questionId);

        if (!question) {
            return res.status(404).send('Question not found');
        }

        const { content } = req.body;
        const reply = new Reply({
            content: content,
            userId: req.user.id,
            parentQuestion: question, // Save the entire question object as parent
            votes: 0
        });

        const saveReply = await reply.save();

        // Update the question with the new reply
        question.replies.push(saveReply);
        await question.save();

        res.status(200).send(saveReply);
    } catch(err) {
        res.status(500).send(err);
    }
}
export default createReply
