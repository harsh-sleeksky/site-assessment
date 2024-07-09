function correctResponse(response) {
  let sectionIndex = response.sections.findIndex(
    (section) => section.sectionId == "Section.SiteAssessment.CISection"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (key == "Z1") {
        const parentValue = response.sections[sectionIndex].values["A19"];
        if (parentValue == "No") updatedvalues[`${key}1`] = value;
        else updatedvalues[key] = value;
      } else if (key == "G1") {
        const parentValue = response.sections[sectionIndex].values["A20"];
        if (parentValue == "No") updatedvalues[`${key}1`] = value;
        else updatedvalues[key] = value;
      } else if (key == "Z3") {
        const parentValue = response.sections[sectionIndex].values["A21"];
        if (parentValue == "No") updatedvalues[`${key}1`] = value;
        else updatedvalues[key] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  sectionIndex = response.sections.findIndex(
    (section) => section.sectionId == "Section.SiteAssessment.StudentSection"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (key == "X1") {
        const parentValue = response.sections[sectionIndex].values["A30"];
        if (parentValue == "No") updatedvalues[`${key}1`] = value;
        else updatedvalues[key] = value;
      } else if (key == "X2") {
        const parentValue = response.sections[sectionIndex].values["A31"];
        if (parentValue == "No") updatedvalues[`${key}1`] = value;
        else updatedvalues[key] = value;
      } else if (key == "X3") {
        const parentValue = response.sections[sectionIndex].values["A33"];
        if (parentValue == "No") updatedvalues[`${key}1`] = value;
        else updatedvalues[key] = value;
      } else if (key == "ACB1") {
        const parentValue = response.sections[sectionIndex].values["A34"];
        if (parentValue == "No") updatedvalues[`${key}1`] = value;
        else updatedvalues[key] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  return response;
}
