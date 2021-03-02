declare type ParsedNode = {
    tag: string;
    tagAttributes: any;
    child: Element;
};
declare const parseNodes: (nodes: NodeListOf<ChildNode>, fields: any) => ParsedNode[];
export { parseNodes };
