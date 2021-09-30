import py from "./py";

export const parseColors = (colorExpression: string) => {
  const replaceHtml = colorExpression
    .replace(/\&gt\;/g, ">")
    .replace(/\&lt\;/g, "<");
  const colorsExpressions = replaceHtml
    .split(";")
    .filter((item) => item.length > 3);
  const colors: any = [];
  colorsExpressions.forEach((colorExpression) => {
    const [color, test] = colorExpression.split(":");
    colors.push({ color, test });
  });
  return colors;
};

export const getEvaluatedColor = ({
  colorExpressions,
  values,
}: {
  colorExpressions: [];
  values: any;
}) => {
  const evaluatedColors = colorExpressions
    .map((colorExpression: any) => {
      const value = testExpression({
        testExpression: colorExpression.test,
        values,
      });
      if (value) {
        return colorExpression.color;
      }
    })
    .filter((color) => color !== undefined);

  if (evaluatedColors.length > 0) {
    return evaluatedColors[0];
  } else {
    return "default";
  }
};

export const testExpression = ({
  testExpression,
  values,
}: {
  testExpression: string;
  values: any;
}) => {
  const value = py.eval(testExpression, {
    ...values,
    current_date: new Date().toISOString().split("T")[0],
  });
  return value;
};
