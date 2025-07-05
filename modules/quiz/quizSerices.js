const quiz = require("../../models/quizModels");
const factory = require("../handlersFactory");

exports.getAllQuiz = factory.getMany(quiz, "Quiz");
exports.createQuiz = factory.createOne(quiz);
exports.getQuiz = factory.getOne(quiz);
exports.updateQuiz = factory.updateOne(quiz);
exports.deleteQuiz = factory.deleteOne(quiz);
