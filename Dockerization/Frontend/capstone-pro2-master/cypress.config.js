// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   e2e: {
//     baseUrl: 'http://localhost:3000', // Adjust port if needed

//     setupNodeEvents(on, config) {
//       // implement node event listeners here if needed
//     },
//   },
// });

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
});

