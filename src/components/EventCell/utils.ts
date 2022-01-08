export const stringifyTime = (datetime: number) =>
  new Date(datetime).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3');
