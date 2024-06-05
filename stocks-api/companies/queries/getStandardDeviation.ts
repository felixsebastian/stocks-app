// ripped from https://stackoverflow.com/questions/7343890/standard-deviation-javascript
export default (array: number[]) => {
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;

  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n,
  );
};
