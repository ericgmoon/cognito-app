export const stringifyTime = (datetime: number) =>
  new Date(datetime).toLocaleString('en-US', {
    hour: 'numeric', minute: 'numeric', hour12: true,
  });
