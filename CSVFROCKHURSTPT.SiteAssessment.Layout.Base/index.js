function updateResponse(response) {
  let sectionIndex = response.sections.findIndex(
    (section) => section.sectionId == "Section.SiteAssessment.CISection"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (["CIEC", "CISC"].includes(key)) {
        const parentValue =
          response.sections[sectionIndex].values[key.slice(0, -1)];
        if (parentValue == "No") updatedvalues[`${key}1`] = value;
        else updatedvalues[key] = value;
      } else if (
        [
          "CIHC",
          "CIIC",
          "CIJC",
          "CIKC",
          "CILC",
          "CIMC",
          "CINC",
          "CIOC",
          "CIPC",
        ].includes(key)
      ) {
        const parentValue =
          response.sections[sectionIndex].values[key.slice(0, -1)];
        if (parentValue == "Needs Improvement")
          updatedvalues[`${key}1`] = value;
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
      if (
        [
          "student1c",
          "student2c",
          "student3c",
          "student5c",
          "student6c",
          "student7c",
          "student8c",
          "student11c",
          "student12c",
        ].includes(key)
      ) {
        const parentValue =
          response.sections[sectionIndex].values[key.slice(0, -1)];
        if (parentValue == "Needs Improvement")
          updatedvalues[`${key}1`] = value;
        else updatedvalues[key] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  return response;
}
