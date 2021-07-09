export function getValueForField({
  values,
  fieldName,
  fields,
}: {
  values: any;
  fieldName: string;
  fields: any;
}) {
  if (!fields) {
    return undefined;
  }

  if (!fields[fieldName]) {
    return values[fieldName] || undefined;
  }

  const fieldType = fields[fieldName].type;

  if (fieldType === "many2one") {
    return values[fieldName][0] || null;
  } else if (fieldType === "one2many" || fieldType === "many2many") {
    return values[fieldName].map((item: any) => item.id);
  } else {
    return values[fieldName];
  }
}
