

import {  EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;
const CustomerCard = ({customer}) => {
    return (
        <Card
    style={{
      width: 240,
      
   
    
}}
    cover={
      <img style = {{cursor: "pointer"}}
        alt="example"
        src = {customer.image}
      />
    }
    actions={[
     
      <p style = {pointsStyle}> Points: {customer.points} </p>,
      <EllipsisOutlined key="ellipsis" />,
    ]}
  >
    <Meta
      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
      title= {customer.name}
      description= {customer.mail}
    />
  </Card>
    );
}

const pointsStyle = {
    cursor: "pointer",
}



export default CustomerCard;