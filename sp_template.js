function correctForLayoutId() {
  var collection = getContext().getCollection();
  var collectionLink = collection.getSelfLink();
  var response = getContext().getResponse();
  var responseOptions = {
    pageSize: 5000,
    continuation: true,
  };
  var updatedDocsCounter = 0;
  var counter = 0;

  tryQueryAndUpdate(true);

  function tryQueryAndUpdate(continuation) {
    var query = {
      query:
        "select * from c where c.entityName = 'Exxat.Forms.Entity.Response.Data' and c.contextIds.layoutId = '' order by c.id asc offset 0 limit 400",
    };

    var requestOptions = {
      pageSize: 5000,
    };

    var isAccepted = collection.queryDocuments(
      collectionLink,
      query,
      requestOptions,
      function queryCallback(err, documents, responseOptions) {
        if (err) throw err;

        if (documents.length > 0) {
          // If at least one document is found, update it.
          for (var i = 0; i < documents.length; i++) {
            tryUpdate(documents[i]);
          }
          response.setBody(
            "Documents fetched: " +
              documents.length +
              ", Updated " +
              updatedDocsCounter +
              " documents"
          );
        } else if (responseOptions.continuation) {
          // Else if the query came back empty, but with a continuation token;
          // repeat the query w/ the token.
          tryQueryAndUpdate(responseOptions.continuation);
        } else {
          throw new Error("No documents found." + typeof err);
        }
      }
    );

    if (!isAccepted) {
      throw new Error("The stored procedure timed out");
    }
  }

  function tryUpdate(document) {
    //Optimistic concurrency control via HTTP ETag.

    var requestOptions = { etag: document._etag };

    // start of updates:
    var isDocumentUpdated = false;

    var correctedForPMHNP = convertToMultipleSelectForPMHNP(document);

    var correctedPreceptorSpeciality =
      convertToMultipleSelectPreceptorSpeciality(document);

    var correctedForClinicalSite = correctForClinicalSite(document);

    isDocumentUpdated =
      correctedForPMHNP ||
      correctedPreceptorSpeciality ||
      correctedForClinicalSite;

    if (isDocumentUpdated) updatedDocsCounter++;
    else return;

    // end of updates

    var isAccepted = collection.replaceDocument(
      document._self,
      document,
      requestOptions,
      function replaceCallback(err, updatedDocument, responseOptions) {
        if (err) throw err;
        counter++;
      }
    );

    // If we hit execution bounds - throw an exception.
    if (!isAccepted) {
      throw new Error("The stored procedure timed out");
    }
  }
}

function updateResponse(response) {
  const sectionIndex = response.sections.findIndex(
    (section) => section.sectionId == "Section.SiteAssessment.OverallImpression"
  );

  if (sectionIndex !== -1) {
    response.sections[sectionIndex]["validLicense1"] =
      response.sections[sectionIndex]["validLicense"];
    delete response.sections[sectionIndex]["validLicense"];
  }

  return response;
}
