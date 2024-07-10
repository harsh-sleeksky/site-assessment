const fs = require("fs");
const path = require("path");

const responses = require("./responses.json");

function hasDuplicateFields(layout) {
  const fieldIdset = new Set();
  let fieldCount = 0;

  const handleSection = (section) => {
    for (var field of section?.fields) {
      handleField(field);
    }
    for (var section of section?.sections) {
      handleSection(section);
    }
  };

  const handleField = (field) => {
    fieldCount++;
    if (!fieldIdset.has(field.fieldId)) fieldIdset.add(field.fieldId);
    for (var field of field?.fields) {
      handleField(field);
    }

    for (var option of field?.options) {
      handleOption(option);
    }
  };

  const handleOption = (option) => {
    for (var field of option?.fields) {
      handleField(field);
    }
  };
  return fieldIdset.size != fieldCount;
}

let count = 0;

// Function to process each JSON file
const processJsonFile = (filePath) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }
    try {
      const jsonData = JSON.parse(data);
      // Your processing logic here
      console.log(jsonData.id, hasDuplicateFields(jsonData));
    } catch (jsonErr) {
      console.error(`Error parsing JSON from file ${filePath}:`, jsonErr);
    }
  });
};

// Function to search for all 1.json files in directories
const searchAndProcessFiles = (dir) => {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach((file) => {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        // Recursively search in subdirectories
        searchAndProcessFiles(fullPath);
      } else if (file.isFile() && file.name === "1.json") {
        // Process the 1.json file
        processJsonFile(fullPath);
      }
    });
  });
};

// Start searching from the current directory
// const startDir = __dirname;
// searchAndProcessFiles(startDir);
