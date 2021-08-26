export const asyncFunctionWrapper = (callBack) => async (req, res) => {
  try {
    await callBack(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).send('the server encountered an unknown error');
  }
};
