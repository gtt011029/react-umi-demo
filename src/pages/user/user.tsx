import React from 'react';
import styles from './index.less';
import {Link} from "umi";

export default function Page() {
  return (
    <div>
      <h1 className={styles.title}>user界面, 为什么umi generate page ...生成的不是ts文件而是js文件呢</h1>
      <Link to="/">go to page</Link>
    </div>
  );
}
