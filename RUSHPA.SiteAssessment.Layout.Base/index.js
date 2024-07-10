function updateResponse(response) {
  let sectionIndex = response.sections.findIndex(
    (section) =>
      section.sectionId == "Section.SiteAssessment.RUSHPA_ClinicalSite"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (
        key == "LO19" &&
        [
          "Excellent—the rotation site consistently exceeds program expectations. ",
          "Good—the rotation site consistently meets program expectations",
          "Poor—the rotation site consistently does not meet program expectations.",
        ].includes(value)
      ) {
        updatedvalues["LO191"] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  return response;
}

module.exports.method = updateResponse;
