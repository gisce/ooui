import ContainerWidget from "../ContainerWidget";
import Widget from "../Widget";

export function flattenContainer(widgets: Widget[][]): Widget[] {
  const flattened: Widget[][] = [];

  function flattenArray(items: Widget[]): void {
    const flatSubArray: Widget[] = [];

    for (const item of items) {
      if (item instanceof ContainerWidget) {
        flattenArray(item._container.rows.flat()); // Recurse into the container
      } else {
        flatSubArray.push(item);
      }
    }

    if (flatSubArray.length > 0) {
      flattened.push(flatSubArray);
    }
  }

  // Iterate through the outer array and process each inner array
  for (const widgetArray of widgets) {
    flattenArray(widgetArray);
  }

  return flattened.flat();
}
