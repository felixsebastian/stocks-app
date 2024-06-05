// From from https://stackoverflow.com/questions/7343890/standard-deviation-javascript

const getStandardDeviation = (array: number[]) => {
  const n = array.length;
  const mean = array.reduce((a, b) => a + b) / n;

  return Math.sqrt(
    array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n,
  );
};

export default getStandardDeviation;
