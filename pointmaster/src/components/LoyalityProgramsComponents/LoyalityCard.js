import "./LoyalityCardStyle.css";
import { ArrowRightOutlined } from "@ant-design/icons";
const LoyalityCard = (props) => {
  return (
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
        <p className="loyalityDescriptionText">How it works</p>
        <ArrowRightOutlined />
        
    </div>
    <div className="loyalityCardButtonContainer">
        <button className="loyalityCardButton">
            <p className= "chooseText">Choose and Customize</p>
            <ArrowRightOutlined />
            
        </button>
    </div>
    </div>
  );
};

export default LoyalityCard;
