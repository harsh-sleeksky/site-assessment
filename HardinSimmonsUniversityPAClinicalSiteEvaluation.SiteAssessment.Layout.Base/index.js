let sectionIndex = response.sections.findIndex(
  (section) => section.sectionId == "Section.SiteAssessment.BasicDetails"
);

if (sectionIndex !== -1) {
  const updatedvalues = {};

  for (const [key, value] of Object.entries(
    response.sections[sectionIndex].values
  )) {
    if (key == "BD6" && ["YES", "NO"].includes(value)) {
      updatedvalues[`${key}1`] = value;
    } else updatedvalues[key] = value;
  }

  response.sections[sectionIndex].values = updatedvalues;
}
