import Dashboard from "../Dashboard";

describe("A Dashboard", () => {
  it("should parse a basic XML with three actions", () => {
    const xml = `<?xml version="1.0"?>
    <dashboard string="My dashboard">
        <action name="1497" parms="{ x: 0, y: 0, w: 1, h: 2, static: true }" />
        <action name="1496" parms="{ x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 }" />
        <action name="1321" parms="{ x: 4, y: 0, w: 1, h: 2 }" />
    </dashboard>
    `;

    const dashboard = new Dashboard(xml);

    expect(dashboard.string).toBe("My dashboard");
    expect(dashboard.actions.length).toBe(3);
    expect(dashboard.actions[0].name).toBe("1497");
    expect(dashboard.actions[1].name).toBe("1496");
    expect(dashboard.actions[2].name).toBe("1321");
    expect(dashboard.actions[0].parms).toBe(
      "{ x: 0, y: 0, w: 1, h: 2, static: true }"
    );
    expect(dashboard.actions[1].parms).toBe(
      "{ x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 }"
    );
    expect(dashboard.actions[2].parms).toBe("{ x: 4, y: 0, w: 1, h: 2 }");
  });
});
