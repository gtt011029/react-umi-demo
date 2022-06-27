import { history } from 'umi';
import { message } from 'antd';
import { currentUserApi } from './services/user';

const loginPath = '/login';

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const resp = await currentUserApi();
      console.log('user: ', resp);
      if (resp.code === 200) {
        return resp.data;
      } else {
        message.error('请先登录');
        return;
      }
    } catch (error) {
      // window.location.href = window.location.origin + '/admin/login';
    }
    return undefined;
  };

  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }

  return {
    fetchUserInfo,
    settings: {},
  };
}
