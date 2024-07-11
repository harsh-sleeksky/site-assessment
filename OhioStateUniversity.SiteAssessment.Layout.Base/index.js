function correctResponse(response) {
  let sectionIndex = response.sections.findIndex(
    (section) => section.sectionId == "Section.SiteAssessment.OTHER"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (key == "Attendsorganized") {
        updatedvalues[`${key}1`] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  sectionIndex = response.sections.findIndex(
    (section) => section.sectionId == "Section.SiteAssessment.SiteInformation"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (key == "Adequatesupervisionchild:") {
        const parentValue =
          response.sections[sectionIndex].values["Adequatesupervision"];
        if (parentValue == "No") updatedvalues[`${key}1`] = value;
        else updatedvalues[key] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  return response;
}

module.exports.method = correctResponse;

const fs = require("fs");
const path = require("path");

const responses = fs.readFileSync(
  path.join(__dirname, "response.json"),
  "utf8"
);

fs.writeFile(
  path.join(__dirname, "response.json"),
  JSON.stringify(
    JSON.parse(responses).map((response) => correctResponse(response)),
    null,
    2
  ),
  (err) => {
    if (err) {
      console.error("An error occurred while writing to the file:", err);
    } else {
      console.log(path.join("updated_response.json"), "-> Success");
    }
  }
);
