declare const parseDomain: ({ domainValue, values, fields, }: {
    domainValue: any;
    values: any;
    fields: any;
}) => string | undefined;
declare function combineDomains(domains: any): string;
declare function convertArrayDomainToString(domainValue?: boolean | any): string | undefined;
export { parseDomain, combineDomains, convertArrayDomainToString };
