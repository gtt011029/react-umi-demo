import { history } from 'umi';
import { message } from 'antd';
import { currentUserApi } from './services/user';
import React, { useState, useEffect } from 'react';
import webSocket from 'socket.io-client';

const loginPath = '/login';

export async function getInitialState() {
  main();
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

const main = () => {
  console.log('main函数里面');

  const connectWebSocket = () => {
    //開啟
    const ws = webSocket('http://localhost:5000');
    if (ws) {
      ws.on('getMessage', (message) => {
        console.log('getMessage: ', message);
      });
    }
  };
  connectWebSocket();

  // useEffect(()=>{
  //   connectWebSocket()
  //   if(ws){
  //     //連線成功在 console 中打印訊息
  //     console.log('success connect!')
  //     //設定監聽
  //     initWebSocket()
  //   }
  // },[ws])

  // const initWebSocket = () => {
  //   //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
  //   ws.on('getMessage', message => {
  //     console.log(message)
  //   })
  // }

  // const sendMessage = () => {
  //   //以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
  //   ws.emit('getMessage', '只回傳給發送訊息的 client')
  // }

  // return(
  //   <div>
  //     <input type='button' value='連線' onClick={connectWebSocket} />
  //     <input type='button' value='送出訊息' onClick={sendMessage} />
  //   </div>
  // )
};
