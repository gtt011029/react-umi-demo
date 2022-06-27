export const increaseConstant = 'INCREASE';

const reducer = {
  count(state, action) {
    const { type, payload } = action;
    switch (type) {
      case increaseConstant:
        return payload + 1;
      default:
        break;
    }
  },
};
