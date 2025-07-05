const { z } = require("zod");

const announcementSchema = z.object({
  senderName: z.string().min(3),
  course: z.string().min(3),
  description: z.string().min(3),
  image: z.string().url().optional(),
});

const announcementvalidator = (req, res, next) => {
  const result = announcementSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.format(),
    });
  }
  req.validData = result.data;
  next();
};

module.exports = announcementvalidator; //






