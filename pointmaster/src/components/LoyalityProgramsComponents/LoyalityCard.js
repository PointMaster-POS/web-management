import "./LoyalityCardStyle.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import IntroDrawerContent from "./IntroDrawerContent";

import { useState } from "react";
// import { DrawerContext } from "../../context/DrowerContext";

const LoyalityCard = (props) => {
  // console.log(props.steps?.[0]);

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  // const {showDrawer} = useContext(DrawerContext);
  return (
    <>
      <div className="loyalityCardContainer">
        <div className="loyalityCardImageContainer">
          <img
            src={props.image}
            alt="Loyality Card"
            className="loyalityCardImage"
          />
        </div>
        <div className="loyalityCardTitleContainer">
          <p className="loyalityCardTitle">{props.title}</p>
        </div>
        <div className="loyalityCardDescriptionContainer">
          <p className="loyalityCardDescription">{props.description}</p>
        </div>
        <div className="loyalityDescriptionButtonContainer">
          <p className="loyalityDescriptionText" onClick={showDrawer}>
            How it works
          </p>
          <ArrowRightOutlined />
        </div>
        <div className="loyalityCardButtonContainer">
          <button className="loyalityCardButton">
            <p className="chooseText">Choose and Customize</p>
            <ArrowRightOutlined />
          </button>
        </div>
      </div>
      <Drawer
        title="Introduction of Loyality Program"
        placement="bottom"
        onClose={onClose}
        open={open}
        height={"100%"}
      >
        <IntroDrawerContent  onclose= {onClose} title = {props.title}  image = {props.image} steps = {props.steps}/>
    
      </Drawer>
      
    </>
  );
};

export default LoyalityCard;
