const announcement = require("../../models/AnnouncementsModel");
const factory = require("../handlersFactory");

exports.getAllAnnouncement = factory.getMany(announcement, "Announcement");
exports.createAnnouncement = factory.createOne(announcement);
exports.getAnnouncement = factory.getOne(announcement);
exports.updateAnnouncement = factory.updateOne(announcement);
exports.deleteAnnouncement = factory.deleteOne(announcement);
