import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'

const Foo = forwardRef((props, myRef) => {
  console.log(myRef)
  return (
    <div>
      我是Foo
      <input type='text' defaultValue='ref 成功转发到Foo组件内部的input节点上' ref={myRef} />
    </div>
  )
})

export default Foo
