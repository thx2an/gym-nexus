/**
 * ARTISAN.JS - Custom CLI for GymNexus
 * Mimics Laravel's artisan commands for creating files.
 * 
 * Usage:
 * node artisan make:controller NameController
 * node artisan make:model NameModel
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const command = args[0];
const name = args[1];

if (!command) {
    console.log('Usage: node artisan <command> [name]');
    process.exit(1);
}

if ((command === 'make:controller' || command === 'make:model') && !name) {
    console.log(`Usage: node artisan ${command} <Name>`);
    process.exit(1);
}

const templates = {
    controller: (name) => `const ${name} = {
  // GET /api/${name.replace('Controller', '').toLowerCase()}
  index: async (req, res) => {
    try {
      res.json({ message: 'List ${name.replace('Controller', '')}' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST /api/${name.replace('Controller', '').toLowerCase()}
  store: async (req, res) => {
    try {
      res.json({ message: 'Create ${name.replace('Controller', '')}' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /api/${name.replace('Controller', '').toLowerCase()}/:id
  show: async (req, res) => {
    try {
      res.json({ message: 'Show ${name.replace('Controller', '')}' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // PUT /api/${name.replace('Controller', '').toLowerCase()}/:id
  update: async (req, res) => {
    try {
      res.json({ message: 'Update ${name.replace('Controller', '')}' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // DELETE /api/${name.replace('Controller', '').toLowerCase()}/:id
  destroy: async (req, res) => {
    try {
      res.json({ message: 'Delete ${name.replace('Controller', '')}' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ${name};
`,
    model: (name) => `const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const ${name} = sequelize.define('${name}', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },
    // Add columns here
}, {
    tableName: '${name.toLowerCase()}s',
    timestamps: true,
    createdAt: 'ngay_tao',
    updatedAt: 'ngay_cap_nhat'
});

module.exports = ${name};
`
};

const paths = {
    controller: path.join(__dirname, 'app', 'Http', 'Controllers'),
    model: path.join(__dirname, 'app', 'Models')
};

const run = async () => {
    if (command === 'make:controller') {
        // Ensure dir exists
        if (!fs.existsSync(paths.controller)) {
            fs.mkdirSync(paths.controller, { recursive: true });
        }
        const filePath = path.join(paths.controller, `${name}.js`);
        if (fs.existsSync(filePath)) {
            console.error('File already exists!');
            return;
        }
        fs.writeFileSync(filePath, templates.controller(name));
        console.log(`Controller created: ${filePath}`);
    }
    else if (command === 'make:model') {
        const filePath = path.join(paths.model, `${name}.js`);
        if (fs.existsSync(filePath)) {
            console.error('File already exists!');
            return;
        }
        fs.writeFileSync(filePath, templates.model(name));
        console.log(`Model created: ${filePath}`);
        console.log('REMINDER: Create migration manually or use npx sequelize-cli scripts.');
    }
    else if (command === 'install:api') {
        const routesPath = path.join(__dirname, 'routes');
        if (!fs.existsSync(routesPath)) {
            fs.mkdirSync(routesPath, { recursive: true });
        }

        const apiRoutePath = path.join(routesPath, 'api.js');
        if (!fs.existsSync(apiRoutePath)) {
            const content = `const express = require('express');
const router = express.Router();

// Import Controllers
// const UserController = require('../app/Http/Controllers/UserController');

// Define Routes
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to GymNexus API' });
});

// router.get('/users', UserController.index);

module.exports = router;
`;
            fs.writeFileSync(apiRoutePath, content);
            console.log('Created: routes/api.js');
        } else {
            console.log('Skipped: routes/api.js already exists');
        }

        console.log('API Scaffolding installed successfully.');
        console.log('Next step: Update server.js to use: app.use(\'/api\', require(\'./routes/api\'));');
    }
    else {
        console.log('Unknown command');
    }
};

run();
