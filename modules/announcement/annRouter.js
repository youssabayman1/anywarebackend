const express = require("express");

const router = express.Router();

const {
    getAllAnnouncement,
    createAnnouncement,
    getAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
} = require("./announcementServices");

const validateRequest = require("../../utils/validator/announcement");

router.get("/", getAllAnnouncement);
router.post("/", validateRequest, createAnnouncement);
router.get("/:id", getAnnouncement);
router.patch("/:id",validateRequest, updateAnnouncement);
router.delete("/:id", deleteAnnouncement);

module.exports = router;