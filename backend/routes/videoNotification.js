const express = require('express');
const { postVideoNotification, getVideoNotification, deleteVideoNotification, deleteAllVideoNotification } = require('../controller/videoNotificationController');

const router = express.Router();

router.post('/post/video/notification',postVideoNotification);
router.post('/get/video/notification',getVideoNotification);
router.delete('/delete/video/notification/:id',deleteVideoNotification)
router.delete('/delete_all/video_notification',deleteAllVideoNotification)

module.exports = router;