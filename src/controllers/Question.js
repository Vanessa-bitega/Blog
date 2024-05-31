import Question from "../models/Question.js";



const allController = {
    allQuestions: async (req, res) => {

        try {
            // Check if req.user is defined and contains the id property
            // if (!req.user || !req.user.id) {
            //     return res.status(401).json({ message: "Unauthorized: User not authenticated" });
            // }
            
           // const userId = req.user.id;
            const question = await Question.find().populate('populatedTags',);
            res.status(200).json( question );
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    oneQuestion: async (req, res) => {
        const question = await Question.findById(req.query.id);
        if (!question) {
            return res.status(404).json({ message: 'not found' })
        }
        res.json(question)
    },
    createQuestion: async (req, res) => {
        if (!req.user || !req.user.id) {
            throw new unauthanticated("Unauthorized: User not authenticated");
        }
            const userId = req.user.id
            const newQuestion = new Question({...req.body, userId: userId});
            const saveQuestion = await newQuestion.save();
            res.status(201).json(saveQuestion)
    },
    updateQuestion: async (req, res) => {
    
        const question= await Question.findByIdAndUpdate(req.query.id, req.body, { new: true })
        if (! question) {
            return res.status(404).json({ message: "Not Found" })
        }
        res.json(question)
            
    },
    deleteQuestion: async (req, res) => {
        
        let result = await Question.findByIdAndDelete(req.query.id)
        if (!result) {
            return res.status(404).send("not found")
        }
        res.status(200).send("Deleted Successfully!")
        
    }
}
export default allController
