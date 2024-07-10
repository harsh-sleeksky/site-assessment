const fs = require("fs");
const path = require("path");

// Function to process each JSON file
const processJsonFile = (filePath, callback) => {
  const data = fs.readFileSync(filePath, "utf8");
  const responses = JSON.parse(data);
  return responses.map(callback);
};

// Function to search for all responses.json files in directories and process them
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
      } else if (file.isFile() && file.name === "response.json") {
        // Find and require the corresponding index.js file
        const indexPath = path.join(dir, "index.js");
        if (fs.existsSync(indexPath)) {
          try {
            const indexModule = require(indexPath);
            const method = indexModule.method; // Assuming the method is named 'method'
            if (typeof method === "function") {
              // Process the responses.json file and call the method with the data
              const updatedResponses = processJsonFile(fullPath, method);

              fs.writeFile(
                path.join(dir, "updated_response.json"),
                JSON.stringify(updatedResponses, null, 2),
                (err) => {
                  if (err) {
                    console.error(
                      "An error occurred while writing to the file:",
                      err
                    );
                  } else {
                    console.log(
                      path.join(dir, "updated_response.json"),
                      "-> Success"
                    );
                  }
                }
              );
            } else {
              console.error(`No valid method exported from ${indexPath}`);
            }
          } catch (requireErr) {
            console.error(`Error requiring file ${indexPath}:`, requireErr);
          }
        }
      }
    });
  });
};

// Start searching from the current directory
const startDir = __dirname;
searchAndProcessFiles(startDir);
