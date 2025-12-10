const PackageModel = require('../models/packageModel');

const getPackages = async (req, res) => {
  try {
    const onlyActive = req.query.active === 'true';
    const packages = await PackageModel.getAllPackages(onlyActive);
    
    res.status(200).json({ success: true, count: packages.length, data: packages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPackageDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const pkg = await PackageModel.getPackageById(id);
    
    if (!pkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }
    
    res.status(200).json({ success: true, data: pkg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createNewPackage = async (req, res) => {
  try {
    const { code, name, description, duration_days, price, benefits } = req.body;

    if (!code || !name || !duration_days || !price) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    if (price < 0) {
      return res.status(400).json({ success: false, message: 'Price must be positive' });
    }

    const newPackageId = await PackageModel.createPackage({
      code, name, description, duration_days, price, benefits
    });

    res.status(201).json({ 
      success: true, 
      message: 'Package created successfully', 
      packageId: newPackageId 
    });
  } catch (error) {
    if (error.number === 2627) { 
        return res.status(409).json({ success: false, message: 'Package Code already exists' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

const updatePackageInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, duration_days, price, benefits } = req.body;

    const existingPkg = await PackageModel.getPackageById(id);
    if (!existingPkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }

    await PackageModel.updatePackage(id, { name, description, duration_days, price, benefits });
    
    res.status(200).json({ success: true, message: 'Package updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    
    const existingPkg = await PackageModel.getPackageById(id);
    if (!existingPkg) {
      return res.status(404).json({ success: false, message: 'Package not found' });
    }

    await PackageModel.softDeletePackage(id);
    
    res.status(200).json({ success: true, message: 'Package deactivated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getPackages,
  getPackageDetail,
  createNewPackage,
  updatePackageInfo,
  deletePackage
};