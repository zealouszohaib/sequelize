const sequelize = require("./src/config/sequelize");
const { User } = require("./src/database/models");

async function populateUsers() {
  try {
    // Ensure the database connection is established
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Sync database models (optional)
    await sequelize.sync({ force: true });

    // Define an array to hold 100 users
    const users = [];

    // Generate 100 users
    for (let i = 1; i <= 100; i++) {
      users.push({
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password: `securepassword${i}`,
      });
    }

    // Insert users into the database
    await User.bulkCreate(users);

    console.log("100 users have been populated successfully!");
  } catch (error) {
    console.error("Unable to populate users:", error);
  } finally {
    // Close the database connection
    await sequelize.close();
    console.log("Database connection closed.");
  }
}

// Run the population script
populateUsers();
