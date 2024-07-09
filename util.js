const layouts = require("./layouts.json");
function hasDuplicateFields(layout) {
  const fieldIdset = new Set();
  let fieldCount = 0;

  const handleSection = (section) => {
    for (var field of section?.fields) {
      handleField(field);
    }
    for (var section of section?.sections) {
      handleSection(section);
    }
  };

  const handleField = (field) => {
    fieldCount++;
    if (!fieldIdset.has(field.fieldId)) fieldIdset.add(field.fieldId);
    for (var field of field?.fields) {
      handleField(field);
    }

    for (var option of field?.options) {
      handleOption(option);
    }
  };

  const handleOption = (option) => {
    for (var field of option?.fields) {
      handleField(field);
    }
  };
  return fieldIdset.size == fieldCount;
}

const result = layouts
  .filter((layout) => hasDuplicateFields(layout))
  .map((layout) => layout.id);
console.log(result);
console.dir(result);
