function correctResponse(response) {
  let sectionIndex = response.sections.findIndex(
    (section) =>
      section.sectionId == "Section.SiteAssessment.Additionallearning"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (key == "Ruralpopulation") {
        updatedvalues[`${key}1`] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  sectionIndex = response.sections.findIndex(
    (section) =>
      section.sectionId == "Section.SiteAssessment.StudentExpectations"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (key == "Ruralpopulation") {
        updatedvalues[`${key}2`] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  return response;
}
