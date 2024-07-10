const fs = require("fs");
const path = require("path");

const responses = require("./AmericanInternationalCollege Responses.json");

function correctResponse(response) {
  let sectionIndex = response.sections.findIndex(
    (section) =>
      section.sectionId ==
      "Section.SiteAssessment.studentassessmentoftheceandci"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (key == "education") {
        updatedvalues[`${key}1`] = value;
      } else if (key == "Comments3") {
        updatedvalues[`${key}1`] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }
  return response;
}

const updatedResponses = responses.map(correctResponse);

fs.writeFile(
  path.join(__dirname, "AmericanInternationalCollege Responses.json"),
  JSON.stringify(updatedResponses),
  (err) => {
    if (err) {
      console.error("An error occurred while writing to the file:", err);
    } else {
      console.log("File has been written successfully");
    }
  }
);
