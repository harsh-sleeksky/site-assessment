function updateResponse(response) {
  let sectionIndex = response.sections.findIndex(
    (section) =>
      section.sectionId == "Section.SiteAssessment.ClinicalInstructor"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (value.includes(["Prenatal", "Gynecologic"])) {
        updatedvalues["patientPopulation1"] = value;
      } else if (value.includes(["Pre-Op", "Intra-Op", "Post Op"])) {
        updatedvalues["patientPopulation2"] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  sectionIndex = response.sections.findIndex(
    (section) => section.sectionId == "Section.SiteAssessment.OverallSummary"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (key == "knowledgeablePreceptor")
        updatedvalues["knowledgeablePreceptor1"] = value;
      else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  return response;
}

module.exports.method = updateResponse;
