const { sql, connectDB } = require('../config/dbConfig');

class StaffModel {
  
  static async getAllStaff() {
    const pool = await connectDB();
    return await pool.request().query(`
      SELECT u.user_id, u.full_name, u.email, u.phone, u.status, 
             r.code as role_code, r.name as role_name,
             b.name as branch_name, b.branch_id
      FROM users u
      JOIN user_roles ur ON u.user_id = ur.user_id
      JOIN roles r ON ur.role_id = r.role_id
      LEFT JOIN user_branch ub ON u.user_id = ub.user_id
      LEFT JOIN branches b ON ub.branch_id = b.branch_id
      WHERE r.code IN ('PT', 'SUPPORT', 'MANAGER')
    `);
  }

  static async createStaff(data) {
    const pool = await connectDB();
    const transaction = new sql.Transaction(pool);
    
    try {
      await transaction.begin(); 
      const request = new sql.Request(transaction);

      const userResult = await request
        .input('full_name', sql.NVarChar(150), data.full_name)
        .input('email', sql.NVarChar(150), data.email)
        .input('phone', sql.NVarChar(20), data.phone)
        .input('password_hash', sql.NVarChar(255), data.password_hash)
        .query(`
          INSERT INTO users (full_name, email, phone, password_hash, status)
          VALUES (@full_name, @email, @phone, @password_hash, 'active');
          SELECT SCOPE_IDENTITY() AS user_id;
        `);
      const newUserId = userResult.recordset[0].user_id;

      const roleResult = await request
        .input('role_code', sql.NVarChar(50), data.role_code)
        .query('SELECT role_id FROM roles WHERE code = @role_code');
      
      if (roleResult.recordset.length === 0) throw new Error('Role không tồn tại');
      const roleId = roleResult.recordset[0].role_id;

      await request
        .input('user_id', sql.BigInt, newUserId)
        .input('role_id', sql.Int, roleId)
        .query('INSERT INTO user_roles (user_id, role_id) VALUES (@user_id, @role_id)');

      if (data.branch_id) {
        await request
            .input('branch_id', sql.Int, data.branch_id)
            .query('INSERT INTO user_branch (user_id, branch_id) VALUES (@user_id, @branch_id)');
      }

      if (data.role_code === 'PT') {
        await request
            .input('spec', sql.NVarChar(200), data.specialization || 'General')
            .input('bio', sql.NVarChar(sql.MAX), data.bio || '')
            .query('INSERT INTO trainer_profiles (user_id, specialization, bio) VALUES (@user_id, @spec, @bio)');
      }

      await transaction.commit(); 
      return newUserId;

    } catch (err) {
      await transaction.rollback(); 
      throw err;
    }
  }

  static async deactivateStaff(userId) {
    const pool = await connectDB();
    await pool.request()
        .input('id', sql.BigInt, userId)
        .query("UPDATE users SET status = 'inactive' WHERE user_id = @id");
  }
}

module.exports = StaffModel;