function correctResponse(response) {
  let sectionIndex = response.sections.findIndex(
    (section) =>
      section.sectionId == "Section.SiteAssessment.PreceptorCredentials(B3.06)"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (key == "Supervisedclinicalpractice") {
        updatedvalues[`${key}1`] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  return response;
}
