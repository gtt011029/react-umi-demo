export const increaseConstant = 'INCREASE';

const increaseCount = (payload) => {
  return {
    type: 'INCREASE',
    payload,
  };
};
