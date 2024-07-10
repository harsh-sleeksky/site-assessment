export function correctResponse(response) {
  let sectionIndex = response.sections.findIndex(
    (section) => section.sectionId == "Section.SiteAssessment.interventions"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (
        key == "Education" &&
        Array.isArray(value) &&
        (value.includes("Formal education participation") ||
          value.includes(
            "Informal personal education needs or interests exploration"
          ) ||
          value.includes("Informal personal education participation"))
      ) {
        updatedvalues[`${key}1`] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  return response;
}
