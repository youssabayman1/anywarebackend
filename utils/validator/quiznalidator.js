const { z } = require("zod");


const quizSchema = z.object({
  quizName: z.string().min(3, "Quiz name must be at least 3 characters"),
  course: z.string().min(2, "Course must be at least 2 characters"),
  topic: z.string().min(2, "Topic must be at least 2 characters"),
  dueDate: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    { message: "Invalid date format" }
  ),
});


const QuizValidator = (req, res, next) => {
  const result = quizSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.flatten().fieldErrors, 
    });
  }

  req.body = result.data;

  next();
};


module.exports = QuizValidator;
