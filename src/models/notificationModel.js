const { sql, connectDB } = require('../config/dbConfig');

class NotificationModel {
  
  static async getByUserId(userId) {
    const pool = await connectDB();
    const result = await pool.request()
      .input('user_id', sql.BigInt, userId)
      .query('SELECT * FROM notifications WHERE user_id = @user_id ORDER BY created_at DESC');
    return result.recordset;
  }

  static async create(data) {
    const pool = await connectDB();
    await pool.request()
      .input('user_id', sql.BigInt, data.user_id)
      .input('title', sql.NVarChar(255), data.title)
      .input('message', sql.NVarChar(sql.MAX), data.message)
      .input('type', sql.NVarChar(50), data.type || 'system')
      .query(`
        INSERT INTO notifications (user_id, title, message, type)
        VALUES (@user_id, @title, @message, @type)
      `);
    return true;
  }

  static async markAsRead(userId, notificationId = null) {
    const pool = await connectDB();
    let query = 'UPDATE notifications SET is_read = 1 WHERE user_id = @user_id';
    
    const request = pool.request().input('user_id', sql.BigInt, userId);

    if (notificationId && notificationId !== 'all') {
      query += ' AND notification_id = @notification_id';
      request.input('notification_id', sql.BigInt, notificationId);
    }
    
    await request.query(query);
    return true;
  }
}

module.exports = NotificationModel;