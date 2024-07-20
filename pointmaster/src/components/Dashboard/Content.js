import React from 'react'
import OwnerRoutes from '../../pages/Owner Dashboard/OwnerRoutes';
import InventoryRoutes from '../../pages/Inventory Dashboard/InventoryRoutes';
import { Layout } from 'antd';

const { Content: AntContent } = Layout;

const Content = () => {
  return (
    // <div className='content'><OwnerRoutes /></div>
    <AntContent  style={{ minHeight: 360 }}  >
      <OwnerRoutes />
    </AntContent>
  )  
}

export default Content;