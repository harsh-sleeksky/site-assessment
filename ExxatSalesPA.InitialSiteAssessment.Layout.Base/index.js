function updateResponse(response) {
  const sectionIndex = response.sections.findIndex(
    (section) => section.sectionId == "Section.SiteAssessment.OverallImpression"
  );

  if (sectionIndex !== -1) {
    response.sections[sectionIndex].values["validLicense1"] =
      response.sections[sectionIndex].values["validLicense"];
    delete response.sections[sectionIndex].values["validLicense"];
  }

  return response;
}
