import React, { useEffect, useState } from 'react';
import { Button, Drawer, theme } from 'antd';
const LoyalityIntro = (props) => {
  const { token } = theme.useToken();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);
  
  const onClose = () => {
    setOpen(false);
  };
  const containerStyle = {
    position: 'relative',
    height: 200,
    padding: 48,
    overflow: 'hidden',
    background: token.colorFillAlter,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  return (
    <div style={containerStyle}>
      Render in this
      <div
        style={{
          marginTop: 16,
        }}
      >
       
      </div>
      <Drawer
        title="Basic Drawer"
        placement="top"
        closable={false}
        onClose={onClose}
        open={open}
        getContainer={false}
        size='large'
      >
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};
export default LoyalityIntro;