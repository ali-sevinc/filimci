import { ValueType, WatchedType } from "./types";

export const KEY = import.meta.env.apikey;

export function avgCalculator(arry: WatchedType[], value: keyof ValueType) {
  const result =
    arry.reduce((acc, item) => acc + Number(item[value]), 0) / arry.length;
  return result.toFixed(2);
}

export function avgRuntime(arry: WatchedType[]) {
  const runtimes = arry.map((item) =>
    parseInt(item.Runtime.replace(" min", "")),
  );
  const result = runtimes.reduce((acc, item) => acc + item, 0) / arry?.length;
  return result.toFixed(2);
}
