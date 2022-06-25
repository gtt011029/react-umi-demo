import {message, notification} from 'antd';
import {extend} from 'umi-request';

const errorHandler = (error: any) => {
  const {response} = error;
  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常'
    });
  }
  return response;
};

const request = extend({
  errorHandler
})

// 对返回的数据进行拦截
request.interceptors.response.use(async (response, options) => {
  if (options.responseType === 'blob' || response.status === 206) {
    const disposition = response.headers.get('Content-Disposition');
    return {
      blob: await response.blob(), // 将二进制的数据转为blob对象，这一步是异步的因此使用async/await
      fileName: decodeURI(escape(disposition.split(';')[1].split('filename=')[1])), // 处理Content-Disposition，获取header中的文件名
      length: response.headers.get('Content-Length'),
      range: response.headers.get('Content-Range')
    };
  }

  if (response.headers.get('new-token')) {
    localStorage.setItem('access_token', response.headers.get('new-token'));
  }

  const res = await response.clone().json();
  if (res.code === 401) {
    message.error(res.msg);
    // window.location.href = window.location.origin + '/admin/#/login';
  } else if ([200, 201, 204, 420, 403].includes(res.code)) {
    return res;
  } else {
    message.error(res.msg);
  }
})

export default request
