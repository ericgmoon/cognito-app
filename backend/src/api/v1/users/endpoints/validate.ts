export default async (req: any, res: any) => {
  try {
    return res.json('hello');
  } catch (err) {
    return res.status(400).send();
  }
};
