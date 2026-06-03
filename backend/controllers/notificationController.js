const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(20);

    const unreadCount = notifications.filter(
      (item) => !item.isRead
    ).length;

    res.status(200).json({
      unreadCount,
      notifications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getNotifications,
};