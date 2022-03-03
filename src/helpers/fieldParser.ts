export function getValueForField({
  values = {},
  fieldName,
  fields = {},
}: {
  values: any;
  fieldName: string;
  fields: any;
}) {
  const fieldType = fields[fieldName]?.type || "passthrough";

  if (fieldType === "many2one") {
    return values[fieldName] ? values[fieldName][0] || null : false;
  } else if (fieldType === "one2many" || fieldType === "many2many") {
    return values[fieldName].map((item: any) => item.id);
  } else {
    if (values?.[fieldName]) {
      return values?.[fieldName];
    }

    if (fieldName.indexOf("'") !== -1) {
      return fieldName;
    } else {
      return parseInt(fieldName);
    }
  }
}
