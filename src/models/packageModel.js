const { sql, connectDB } = require('../config/dbConfig');

class PackageModel {
  
  static async getAllPackages(onlyActive = false) {
    try {
      const pool = await connectDB();
      let query = 'SELECT * FROM membership_packages';
      
      if (onlyActive) {
        query += ' WHERE is_active = 1';
      }
      
      const result = await pool.request().query(query);
      return result.recordset;
    } catch (error) {
      throw error;
    }
  }

  static async getPackageById(id) {
    try {
      const pool = await connectDB();
      const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM membership_packages WHERE package_id = @id');
      
      return result.recordset[0];
    } catch (error) {
      throw error;
    }
  }

  static async createPackage(data) {
    try {
      const pool = await connectDB();
      const result = await pool.request()
        .input('code', sql.NVarChar(50), data.code)
        .input('name', sql.NVarChar(100), data.name)
        .input('description', sql.NVarChar(sql.MAX), data.description)
        .input('duration_days', sql.Int, data.duration_days)
        .input('price', sql.Decimal(18, 2), data.price)
        .input('benefits', sql.NVarChar(sql.MAX), data.benefits)
        .input('is_active', sql.Bit, 1) 
        .query(`
          INSERT INTO membership_packages 
          (code, name, description, duration_days, price, benefits, is_active)
          VALUES 
          (@code, @name, @description, @duration_days, @price, @benefits, @is_active);
          SELECT SCOPE_IDENTITY() AS id;
        `);
      
      return result.recordset[0].id;
    } catch (error) {
      throw error;
    }
  }

  static async updatePackage(id, data) {
    try {
      const pool = await connectDB();
      await pool.request()
        .input('id', sql.Int, id)
        .input('name', sql.NVarChar(100), data.name)
        .input('description', sql.NVarChar(sql.MAX), data.description)
        .input('duration_days', sql.Int, data.duration_days)
        .input('price', sql.Decimal(18, 2), data.price)
        .input('benefits', sql.NVarChar(sql.MAX), data.benefits)
        .query(`
          UPDATE membership_packages
          SET name = @name, 
              description = @description, 
              duration_days = @duration_days, 
              price = @price, 
              benefits = @benefits
          WHERE package_id = @id
        `);
      return true;
    } catch (error) {
      throw error;
    }
  }

  static async softDeletePackage(id) {
    try {
      const pool = await connectDB();
      await pool.request()
        .input('id', sql.Int, id)
        .query('UPDATE membership_packages SET is_active = 0 WHERE package_id = @id');
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PackageModel;
