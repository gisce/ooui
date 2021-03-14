declare const parseDomain: (domainValue: any) => string[][];
declare const getParamsForDomain: ({ values, domain, }: {
    values: any;
    domain: Array<any[]>;
}) => any[][];
export { parseDomain, getParamsForDomain };
