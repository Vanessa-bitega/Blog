import { Router } from "express";
const router = Router();
import Questioncontroller from "../controllers/Question.js"; ///review
import userSignup from "../controllers/signup.js";
import userLogin from "../controllers/login.js"; 
import forgotPassword from "../controllers/forgotpssword.js"
import resetPassword  from "../controllers/forgotpssword.js"
import authMiddleware from "../middlewares/auth.js";
import createReply from "../controllers/replies.js";
import upvoteReply from "../controllers/upvote.js";
import tag from '../controllers/tags.js';
import Tag from '../models/tag.js';
import Question from '../models/Question.js';
import configurations from "../configs/index.js";

// Route for getting all/Questions
router.get("/Questions", Questioncontroller.allQuestions);

router.get("/Question", Questioncontroller.oneQuestion);

router.post("/Questions",authMiddleware.authentication, Questioncontroller.createQuestion);

router.put("/Questions", Questioncontroller.updateQuestion);

router.delete("/Questions", Questioncontroller.deleteQuestion);

//replies&&votes
router.post("/upvote", authMiddleware.authentication,upvoteReply);
router.post("/reply", authMiddleware.authentication,createReply);

//Tags

router.post("/tags",tag.addTag )
router.get("/tags",tag.getTags)
router.get("/tag",tag.findById)
router.put("/tags",tag.updateTags )
router.delete("/tags",tag.deleteTag )

// User Routes
router.post("/auth/signup", userSignup);
router.post("/auth/login", userLogin);
router.post("/forgot-password", resetPassword.forgotPassword );
router.post("/reset-password", forgotPassword.resetPassword);


   
   router.get('/Questions/:genre', async (req, res) => {
    let { genre } = req.params; // Get the genre from the request parameters
    genre = genre.toLowerCase();
    try {
      // Query the database for questions with the specified genre
      const questions = await Question.find({ genre });
  
      // Return the questions as a JSON response
      res.json(questions);
    } catch (error) {
      // If an error occurs, send an error response
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  



export default router;
