const transformDomainForChildWidget = ({
  domain,
  widgetFieldName,
}: {
  domain: any;
  widgetFieldName: string;
}) => {
  const transformedDomain: any[] = [];

  domain.forEach((domainEntry: any) => {
    if (!Array.isArray(domainEntry)) {
      return;
    }

    const [fieldName, operator, value] = domainEntry;

    let rootFieldName;
    let targetFieldName;

    if (fieldName.indexOf(".") !== -1) {
      rootFieldName = fieldName.substr(0, fieldName.indexOf("."));
      targetFieldName = fieldName.substr(
        fieldName.indexOf(".") + 1,
        fieldName.length - 1,
      );
    } else {
      rootFieldName = fieldName;
      targetFieldName = "id";
    }

    if (rootFieldName === widgetFieldName) {
      transformedDomain.push([targetFieldName, operator, value]);
    }
  });

  return transformedDomain;
};

export const parseDomainFields = (domain: string | boolean): string[] => {
  if (typeof domain !== "string") {
    return [];
  }
  return domain
    .replace(/[()\[\]]/g, "")
    .split(",")
    .map((i) => i.trim())
    .filter((i) => !i.includes("'"));
};

export { transformDomainForChildWidget };
