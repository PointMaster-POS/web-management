import "./styles/LoyalityCardStyle.css";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Drawer , Modal} from "antd";
import IntroDrawerContent from "./IntroDrawerContent";
import AmountSpent from "./AmountSpent";
import VisitAndEarn from "./VisitAndEarn";
import CashForPurchase from "./CashForPurchase";
import { useState } from "react";
// import { DrawerContext } from "../../context/DrowerContext";


const LoyalityCard = (props) => {
  // console.log(props.steps?.[0]);
  const [modelOpen, setModelOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isOkButtonDisabled, setIsOkButtonDisabled] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };


  const showModal = () => {
    setModelOpen(true);
  };

  const getModelContent = () => {
    if (props.title === "Amount Spent") {
      return <AmountSpent />;
    } else if (props.title === "Visit and Earn") {
      return <VisitAndEarn />;
    } else if (props.title === "Cash for Purchase") {
      return <CashForPurchase />;
    }
  };

  const handleOk = () => {
    // setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setModelOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setModelOpen(false);
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
          <button className="loyalityCardButton"  onClick= {showModal}>
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
      <Modal
        title="Title"
        open={modelOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
        
        okButtonProps={{
          style: {
            backgroundColor: `${isOkButtonDisabled ? "grey" : "#0e83b6"}`,
            color: "white",
            borderRadius: "10px",
          },
          disabled: isOkButtonDisabled,
         

         
       
        }}
        
       
      >
       
        {getModelContent()}
        
      </Modal>

      
      
    </>
  );
};

export default LoyalityCard;
