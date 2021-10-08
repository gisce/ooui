declare const parseDomain: ({ domainValue, values, fields, }: {
    domainValue: any;
    values: any;
    fields: any;
}) => any;
declare const transformDomainForChildWidget: ({ domain, widgetFieldName, }: {
    domain: any;
    widgetFieldName: string;
}) => any[];
export { parseDomain, transformDomainForChildWidget };
