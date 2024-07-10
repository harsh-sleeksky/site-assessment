function correctResponse(response) {
  let sectionIndex = response.sections.findIndex(
    (section) => section.sectionId == "Section.SiteAssessment.SurveyFlow"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (key == "reason") {
        const parentValue =
          response.sections[sectionIndex].values["Recommendcontinueduse"];
        if (parentValue == "No") updatedvalues[`${key}1`] = value;
        else updatedvalues[key] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  return response;
}

module.exports.method = correctResponse;
