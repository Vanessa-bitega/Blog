import Tag from "../models/tag.js";
import Question from "../models/Question.js";
const addTag = async (req, res) => {
    const questionID = req.query.id;
    try {
        const question = await Question.findById(questionID);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
       const tag = new Tag(req.body);
        await tag.save();
        question.tags.push(tag);
        await question.save();
    res.status(201).json(tag);
        
       
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    
}
 const getTags = async (req, res) => { 
    const tags = await Tag.find();
    res.status(200).json(tags);
}
 const updateTags = async (req, res) => { 
    const tagId = req.query.id;
    const updates = req.body;

    const updatedTag = await Tag.findByIdAndUpdate(tagId, updates, { new: true })
    if (!updatedTag) {
        return res.send(404).json({msg:'not found'});
    } 
    res.status(200).json(updatedTag);
}
 const findById = async (req, res) => {
    const tagId = req.query.id;
    
    const foundTag = await Tag.findById(tagId);
    if (!foundTag) {
        return res.send(404).json({msg:'not found'});
    }
    return res.status(200).json(foundTag);
};

const deleteTag = async (req, res) => {
    const deletedTag = await Tag.findByIdAndDelete(req.query.id);
  
    if (!deletedTag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
  
    return res.status(200).json({ message: 'Tag deleted' });
  };

export default {addTag, deleteTag, findById, getTags, updateTags}