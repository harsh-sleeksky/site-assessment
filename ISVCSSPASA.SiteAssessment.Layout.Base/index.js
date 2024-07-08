function updateResponse(response) {
  let sectionIndex = response.sections.findIndex(
    (section) => section.sectionId == "Section.SiteAssessment.SiteSection"
  );

  if (sectionIndex !== -1) {
    const values = response.sections[sectionIndex].values;

    if (values["Site2"] != "Surgical Care" && values["Site6"] == "Other") {
      values["Site6C"] = values["Site2C"];
      delete values["Site2C"];
    }

    response.sections[sectionIndex].values = values;
  }

  return response;
}
