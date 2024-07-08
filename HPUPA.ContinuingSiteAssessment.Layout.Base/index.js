function updateResponse(response) {
  const sectionIndex = response.sections.findIndex(
    (section) => section.sectionId == "Section.SiteAssessment.SCPEINFO"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (key == "Care1") updatedvalues["Care2"] = value;
      else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  return response;
}
