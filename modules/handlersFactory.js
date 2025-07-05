const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/apiFeatures");
const asyncHandler = require("express-async-handler");
const moment = require('moment');

exports.deleteOne = (Modle) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const documents = await Modle.findByIdAndDelete(id);
    if (!documents) {
      return next(new ApiError(`nod documents for this is  id  ${id}`, 404));
    }
    return res.status(200).json({
      message: `Item with id ${id} has been deleted.`,
    });
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(
        new ApiError(`No document for this id ${req.params.id}`, 404)
      );
    }
    // Trigger "save" event when update document
    document.save();
    res.status(200).json({ data: document });
  });

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    // Format the dueDate if it exists
    if (req.body.dueDate) {
      const formattedDate = moment(req.body.dueDate).format(
        "DD MMM YYYY - hh:mm A"
      );
      req.body.dueDateFormatted = `Due to: ${formattedDate}`;
    }

    const newDoc = await Model.create(req.body);

    res.status(201).json({ data: newDoc });
  });
exports.getOne = (Modle) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Modle.findById(id);
    if (!document) {
      return next(new ApiError(`nod document for this is  id  ${id}`, 404));
    }
    res.status(200).json({ data: document });
  });

exports.getMany = (Modle, modleName = "") =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }
    console.log(filter);
    // Build query
    const documentsCounts = await Modle.countDocuments(filter);
    const apiFeatures = new ApiFeatures(Modle.find(filter), req.query)
      .paginate(documentsCounts)
      .search(modleName)
      .filter()
      .limitFields()
      .sort();

    // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });
