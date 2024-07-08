function updateResponse(response) {
  let sectionIndex = response.sections.findIndex(
    (section) => section.sectionId == "Section.SiteAssessment.SitePersonnel"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (key == "Email") {
        updatedvalues["Email1"] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  return response;
}
