import React from 'react'
import OwnerRoutes from '../../pages/Owner Dashboard/OwnerRoutes';

/* import { Layout } from 'antd';
import InventoryRoutes from '../../pages/Inventory Dashboard/InventoryRoutes'; */

//const { Content: AntContent } = Layout;

const Content = () => {
  return (
    <div >
      {/* <InventoryRoutes /> */}
      <OwnerRoutes />
    </div>
  )
}

export default Content;