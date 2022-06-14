import { transformDomainForChildWidget } from "../helpers/domainParser";

describe("A Domain Parser", () => {
  it("should properly transform domain for inner widgets", () => {
    const prevDomain = [
      ["project_id", "=", 62],
      ["foo", "=", "bar"],
      ["stage_id.name.process", "ilike", "backlog"],
    ];

    const fields = {
      project_id: {
        type: "numeric",
      },
      stage_id: {
        type: "numeric",
      },
    };

    const domainForProjectId = transformDomainForChildWidget({
      domain: prevDomain,
      widgetFieldName: "project_id",
    }) as any;

    expect(domainForProjectId!.length).toBe(1);
    expect(domainForProjectId![0][0]).toBe("id");
    expect(domainForProjectId![0][1]).toBe("=");
    expect(domainForProjectId![0][2]).toBe(62);

    const domainForStageId = transformDomainForChildWidget({
      domain: prevDomain,
      widgetFieldName: "stage_id",
    }) as any;

    expect(domainForStageId!.length).toBe(1);
    expect(domainForStageId![0][0]).toBe("name.process");
    expect(domainForStageId![0][1]).toBe("ilike");
    expect(domainForStageId![0][2]).toBe("backlog");
  });
});
