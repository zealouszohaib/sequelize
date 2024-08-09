const { User } = require("../database/models");
const { Op } = require('sequelize');


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0; 

    const { name, email } = req.query;

    // Build the where condition dynamically based on query parameters
    const whereCondition = {};

    if (name) {
      whereCondition.name = { [Op.like]: `%${name}%` };
    }

    if (email) {
      whereCondition.email = { [Op.like]: `%${email}%` };
    }

    const users = await User.findAll({
      limit: limit,
      offset: offset,
      where: whereCondition,
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.checkEmailExists = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: 'Email query parameter is required' });
    }

    const user = await User.findOne({
      where: { email: email },
    });

    const emailExists = !!user; // Convert the user object to a boolean (true if exists, false otherwise)

    res.status(200).json({ emailExists });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
