let sectionIndex = response.sections.findIndex(
  (section) => section.sectionId == "Section.SiteAssessment.SiteSection"
);

if (sectionIndex !== -1) {
  const updatedvalues = {};

  for (const [key, value] of Object.entries(
    response.sections[sectionIndex].values
  )) {
    if (["P1C", "P2C", "P3C", "P4C", "P5C", "P6C", "P7C"].includes(key)) {
      const parentValue =
        response.sections[sectionIndex].values[key.slice(0, -1)];
      if (parentValue == "No") updatedvalues[`${key}1`] = value;
      else updatedvalues[key] = value;
    } else updatedvalues[key] = value;
  }

  response.sections[sectionIndex].values = updatedvalues;
}
