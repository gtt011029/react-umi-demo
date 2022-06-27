import { Effect, Reducer, Subscription } from 'umi';

const testModel = {
  namespace: 'test',

  state: {
    id: 3,
    title: '题目备注',
    content: '题目jlljlljl',
    create_time: 1652758330314,
    type: 2,
    answer: '["A"]',
    score: 5,
    option_type: 0,
  },

  reducers: {
    add: (state, action) => {
      return {
        ...action.payload,
      };
    },
  },
};

export default testModel;
