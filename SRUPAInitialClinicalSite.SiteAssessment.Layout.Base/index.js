function updateResponse(response) {
  let sectionIndex = response.sections.findIndex(
    (section) => section.sectionId == "Section.SiteAssessment.Discipline"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (
        key == "B5" &&
        [
          "Outpatient",
          "Inpatient",
          "Emergency Department",
          "Operating Room",
        ].includes(value)
      ) {
        updatedvalues["B51"] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  return response;
}
