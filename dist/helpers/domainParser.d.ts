declare const parseDomain: ({ domainValue, values, fields, }: {
    domainValue: string;
    values: any;
    fields: any;
}) => string;
declare function combineDomains(domains: string[]): string;
declare function convertDomainFromFields(domainValue?: boolean | any): string | undefined;
export { parseDomain, combineDomains, convertDomainFromFields };
