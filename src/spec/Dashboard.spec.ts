import Dashboard from "../Dashboard";

describe("A Dashboard", () => {
  it("should parse a basic XML with three actions", () => {
    const xml = `<?xml version="1.0"?>
    <dashboard string="My dashboard">
        <dashboard_item action_id="1497" position="{ x: 0, y: 0, w: 1, h: 2, static: true }" />
        <dashboard_item action_id="1496" position="{ x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 }" />
        <dashboard_item action_id="1321" position="{ x: 4, y: 0, w: 1, h: 2 }" />
    </dashboard>
    `;

    const dashboard = new Dashboard(xml);

    expect(dashboard.string).toBe("My dashboard");
    expect(dashboard.items.length).toBe(3);
    expect(dashboard.items[0].action_id).toBe("1497");
    expect(dashboard.items[1].action_id).toBe("1496");
    expect(dashboard.items[2].action_id).toBe("1321");
    expect(dashboard.items[0].position).toBe(
      "{ x: 0, y: 0, w: 1, h: 2, static: true }"
    );
    expect(dashboard.items[1].position).toBe(
      "{ x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 }"
    );
    expect(dashboard.items[2].position).toBe("{ x: 4, y: 0, w: 1, h: 2 }");
  });
});
