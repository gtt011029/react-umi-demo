import styles from './index.less';
import { ConnectProps, Loading, connect, history } from 'umi';
import { testApi } from '@/services';
import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Link } from 'umi';
import Foo from './Foo';
import Baz from './Baz';
import { stringTest, extendsInterface, extendsType } from 'src/utils';
import { IndexModelState } from '@/models';

const IndexPage = ({ index, dispatch }) => {
  const input = useRef();
  const [testType, setTestType] = useState<stringTest>('haha');
  type B = typeof testType;
  const [testTypeof, setTestTypeof] = useState<B>('heh');
  const obj = {
    id: 8,
    poster: { id: 10, nickname: '马晨功', avatar: 'test-image', is_active: 1 },
    create_time: 1655978421573,
    update_time: 1656294224912,
    text: '第8个帖子',
    pictures: [
      {
        thumbnail_url: '9a82444b5d4a4a37af71b5288f7f98f0.png',
        original_url: '4328494d28c94e738642a938e8d226e9.png',
      },
      {
        thumbnail_url: '10e9842cae9f4ac3be48f0fa8466ab62.jpg',
        original_url: '93dd21b5a473452baa32088b79949d3e.jpg',
      },
    ],
    attachments: [
      {
        name: 'sendcloud.pdf',
        size: 0,
        origin_url: '746aeb082cf048ddbf20300c6e030f7b.pdf',
      },
    ],
    pinned_time: 1656293900000,
    likes: { top_n: [{ id: 10, nickname: '马晨功' }], total_num: 1, liked: 1 },
    course: { id: 62, name: '晨功的测试课程0311' },
    comments: [
      {
        id: 1,
        update_time: 1656294775496,
        text: 'true',
        from_id: 10,
        from_name: '马晨功',
        pinned: 0,
        replies: [
          {
            id: 3,
            from_id: 10,
            from_name: '马晨功',
            to_id: 10,
            to_name: '马晨功',
            text: 'true',
          },
          {
            id: 4,
            from_id: 10,
            from_name: '马晨功',
            to_id: 10,
            to_name: '马晨功',
            text: 'false',
          },
          {
            id: 5,
            from_id: 10,
            from_name: '马晨功',
            to_id: 10,
            to_name: '马晨功',
            text: '测试回复',
          },
          {
            id: 6,
            from_id: 10,
            from_name: '马晨功',
            to_id: 10,
            to_name: '马晨功',
            text: '测试回复',
          },
          {
            id: 7,
            from_id: 10,
            from_name: '马晨功',
            to_id: 10,
            to_name: '马晨功',
            text: '测试回复',
          },
        ],
      },
      {
        id: 3,
        update_time: 1656405976118,
        text: '测试评论',
        from_id: 10,
        from_name: '马晨功',
        pinned: 0,
        replies: [],
      },
      {
        id: 4,
        update_time: 1656408463125,
        text: '测试评论111',
        from_id: 10,
        from_name: '马晨功',
        pinned: 0,
        replies: [],
      },
      {
        id: 5,
        update_time: 1656914735225,
        text: '测试评论111',
        from_id: 10,
        from_name: '马晨功',
        pinned: 0,
        replies: [],
      },
      {
        id: 6,
        update_time: 1656914765579,
        text: '测试评论123',
        from_id: 10,
        from_name: '马晨功',
        pinned: 0,
        replies: [],
      },
      {
        id: 7,
        update_time: 1656914909273,
        text: '测试评论123',
        from_id: 15,
        from_name: '马晨功2',
        pinned: 0,
        replies: [],
      },
    ],
  };
  const [tina, setTina] = useState<extendsInterface>({
    name: 'tina',
    age: 18,
    gender: 'woman',
  });
  const [post, setPost] = useState<any>(null);

  // const handleClick = () => {
  //   const inputValue = input.current;
  //   console.log(inputValue);
  //   console.log(inputValue.value);
  //   inputValue.focus();
  // }

  useEffect(() => {
    setPost(obj);
    console.log('window: ', window.test);
    // promiseDemo()
    // test()
    // promiseTest()
    // promiseAllSettledTest()
    // run(g);
  }, []);
  const promiseTest2 = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('promise resp');
        resolve('promise resp');
      }, 0);
    });
  };

  useEffect(() => {
    setTimeout(() => {
      console.log('settimeout 1');
      Promise.resolve('promise').then((resp) => {
        console.log(resp);
      });
      // testApi().then((resp) => {
      //   console.log('promise: ', resp)
      // })
    }, 0);
    setTimeout(() => {
      console.log('settimeout 2');
    }, 0);
  }, []);

  const task = async () => {
    promiseTest2();
    const resp = await testApi();
    console.log('await: ', resp);
  };

  const tongbuTest = async () => {
    await tongbu(1);
    await tongbu(2);
  };

  const tongbu = (num) => {
    setTimeout(() => {
      console.log('num: ', num);
    }, 1000);
  };

  const yibu = async () => {
    return await testApi();
  };

  const test = () => {
    const executor = (resolve: any, reject: any) => {
      let rand = Math.random();
      if (rand > 0.5) {
        resolve('true');
      } else {
        reject('false');
      }
    };

    var p0 = new Promise(executor)
      .then((value) => {
        console.log('succeed-1');
        return new Promise(executor);
      })
      .then((value) => {
        console.log('succeed-2');
        return new Promise(executor);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const promiseDemo = () => {
    const promise = new Promise(function (resolve, reject) {
      resolve('ok');
      throw new Error('test');
    });
    promise
      .then(function (value) {
        console.log(value);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const promiseTest = () => {
    const b = new Promise((resolve, reject) => {
      resolve('这是成功返回的数据', x + 2); // state一旦改变了就不会重回pending
      // setTimeout(() => {
      //   throw new Error('这是报错的数据，在resolve后面')
      // }, 0)
      // reject('reject test')
    });

    b.catch((err) => {
      console.log('catch: ', err);
    })
      .then((data) => {
        console.log(data);
      })
      .finally(() => {
        console.log('这是最后结束了');
      });

    setTimeout(() => {
      console.log('123233');
    }, 1000);
  };

  const promiseAllSettledTest = () => {
    const a = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('woshi a');
      });
    });

    const b = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('woshi b reject');
      }, 5000);
    });

    Promise.allSettled([a, b]).catch((data) => {
      console.log(data);
    });
  };

  function getFoo() {
    return new Promise(function (resolve, reject) {
      resolve('foo');
      // reject('reject test')
    });
  }

  const g = function* () {
    try {
      const foo = yield getFoo();
      console.log(foo); // 'foo'
    } catch (e) {
      console.log(e); // 'reject test'
    }
  };

  function run(generator) {
    const it = generator();
    // it.next()

    function go(result) {
      // 递归， 直到done为true结束
      console.log('result: ', result); // {done: false, value: Promise}  // {done: true, value: undefined}
      if (result.done) return result.value;

      return result.value.then(
        function (value) {
          return go(it.next(value)); // run(g.next('foo'))
        },
        function (error) {
          return go(it.throw(error));
        },
      );
    }

    go(it.next());
  }

  // const promiseTryTest = () => {
  //   Promise.try(() => {
  //     console.log('try')
  //   }).then(() => {
  //
  //   }).catch(() => {
  //
  //   })
  // }

  function* generatorTest() {
    console.log('一开始');
    yield '1';
    console.log('第二步');
    yield '2';
    return;
  }

  const haha = () => {
    console.log('haha');
    const test = generatorTest();
    // setInterval(() => {
    //   let res = test.next()
    //   console.log('res: ', res)
    // }, 2000)
  };

  const regExpTest = () => {
    // 参数一： 字符差串， 参数二： 正则表达式修饰符
    let regex = new RegExp('xyz', 'i');
    let regex2 = new RegExp(/xyz/i);
  };

  const getData = () => {
    testApi().then((resp) => {
      if (resp.code) {
        // action是一个对象，执行描述了一个行为， 简单的说就是描述了待会要干嘛， 是一个名词
        // dispatch里面包的就是这个action，触发这个行为（action）的方式， 动词
        // action 改变state的唯一途径
        // action中有type， 表明你要执行reducers中的哪个方法，指明具体行为
        // payload是你要传递的数据
        const respDispatch = dispatch({
          type: 'index/save',
          payload: resp.data, // 需要传递的数据
        });
        console.log('respDispatch: ', respDispatch);
      }
    });
  };

  return (
    <div>
      <h1 className={styles.title}>这是我的主页面</h1>
      <button
        onClick={() => {
          console.log('这是我的click');
        }}
      >
        按钮
      </button>
      <Link to="/user">去user那里</Link>
      <button onClick={getData}>获取数据</button>
      <button onClick={tongbuTest}>测试同步的async</button>
      <button onClick={task}>测试任务队列</button>
      <button onClick={() => haha()}>下一步</button>
      <button onClick={() => history.push('/reducer')}>go to reducer</button>
      <button onClick={() => history.push('/count')}>go to count</button>
      <button onClick={() => history.push('/redux')}> go to redux </button>
      <button onClick={() => history.push('/ele')}> go to electron </button>
      <hr />
      <h1>Hello World!</h1>
      We are using Node.js <span id="node-version"></span>, Chromium{' '}
      <span id="chrome-version"></span>, and Electron{' '}
      <span id="electron-version"></span>.
    </div>
  );
};

export default connect((data: any) => {
  console.log('connect:', data);
  // 这个里面有所有models里面的数据，loading ，还包括的当前路由
  return data;
})(IndexPage);
