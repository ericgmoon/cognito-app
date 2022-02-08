export const stringifyTime = (datetime: number) =>
  new Date(datetime).toLocaleString('en-US', {
    hour: 'numeric', minute: 'numeric', hour12: true,
  });

export const stringifyDate = (datetime: number) =>
  new Date(datetime).toLocaleDateString('en-AU', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
