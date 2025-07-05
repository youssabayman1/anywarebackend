const express = require("express");

const router = express.Router();

const {
    getAllQuiz,
    createQuiz,
    getQuiz,
    updateQuiz,
    deleteQuiz

   
} = require("./quizSerices");
const validateRequest = require("../../utils/validator/quiznalidator");

router.get("/", getAllQuiz);
router.post("/",  validateRequest,createQuiz);
router.get("/:id", getQuiz);
router.patch("/:id",validateRequest, updateQuiz);
router.delete("/:id", deleteQuiz);

module.exports = router;