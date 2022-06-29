// dva 通过 model 的概念把一个领域的模型管理起来，包含同步更新 state 的 reducers，处理异步逻辑的 effects，订阅数据源的 subscriptions 。
import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { currentUserApi } from '@/services/user';
import { HttpCommResponse } from '@/utils';

export interface IndexModelState {
  name: string;
}

export interface IndexModelType {
  namespace: string;
  state: IndexModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<IndexModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
  namespace: 'index', // 如果不定义namespace，就以文件名作为namespace

  state: {
    name: '未命名',
  },

  // 如果是异步行为会先触发effects，然后流向reducers最终改变state
  // 在我们的应用中， 最常见的就是异步操作。它来自与函数编程的概念，
  // 之所以叫做副作用， 是因为他使得我们的函数变得不纯， 同样的输入， 不一定得到相同的结果
  // ps: 感觉就像redux中的thunk
  effects: {
    *query({ payload }, { call, put }) {
      const resp: HttpCommResponse = yield call(currentUserApi);
      yield put({
        type: 'save',
        payload: {
          data: resp.data,
        },
      });
    },
  },
  reducers: {
    // 同redux里面的reducer， 接收action 同步更新state
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
};

export default IndexModel;
