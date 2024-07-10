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

module.exports.method = correctResponse;
