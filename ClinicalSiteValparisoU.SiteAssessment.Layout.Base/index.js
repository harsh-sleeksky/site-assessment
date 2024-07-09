function updateResponse(response) {
  let sectionIndex = response.sections.findIndex(
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
        if (parentValue == "No")
          updatedvalues["Adequatesupervisionchild1:"] = value;
        else updatedvalues[key] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  sectionIndex = response.sections.findIndex(
    (section) => section.sectionId == "Section.SiteAssessment.OTHER"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (key == "Attendsorganized") {
        updatedvalues["Attendsorganized1"] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  return response;
}
