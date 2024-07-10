function updateResponse(response) {
  const sectionIndex = response.sections.findIndex(
    (section) =>
      section.sectionId == "Section.SiteAssessment.DiscussionInstructor"
  );

  if (sectionIndex !== -1) {
    const updatedvalues = {};

    for (const [key, value] of Object.entries(
      response.sections[sectionIndex].values
    )) {
      if (key == "safety") {
        if (["Yes", "No"].includes(value)) updatedvalues["safety1"] = value;
        else updatedvalues["safety2"] = value;
      } else updatedvalues[key] = value;
    }

    response.sections[sectionIndex].values = updatedvalues;
  }

  return response;
}

module.exports.method = updateResponse;
