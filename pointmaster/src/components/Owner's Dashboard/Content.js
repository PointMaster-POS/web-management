import React from 'react';
import AppRoutes from "./AppRoutes";
import { Layout } from 'antd';

const { Content: AntContent } = Layout;

const Content = () => {
  return (
    // <div className='content'><AppRoutes /></div>
    <AntContent  style={{ paddingTop: 20, minHeight: 360 }}  >
      <AppRoutes />
    </AntContent>
  )
}

export default Content;