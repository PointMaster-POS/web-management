import "./loyality-menu-styles.css";
import LoyalityCard from "../../components/LoyalityProgramsComponents/LoyalityCard";

const LoyalityMenu = () => {
  return (
    <div className="container">
      <div className="titleContainer">
        <p className="title">Loyality Programs</p>
      </div>
      <div className="subtitleContainer">
        <p className="subtitle">Make Loyality Programs for Your Business</p>
      </div>
      <div className="contentContainer">
      <div className="loyalityProgramCardsContainer">
        <LoyalityCard
          title="Loyality Program 1"
          description="This is a description of the Loyality Program 1"
          image="https://via.placeholder.com/150"
            
        />
        <LoyalityCard
          title="Loyality Program 2"
          description="This is a description of the Loyality Program 2"
          image="https://via.placeholder.com/150"
        />
        <LoyalityCard
          title="Loyality Program 3"
          description="This is a description of the Loyality Program 3"
          image="https://via.placeholder.com/150"
        />
        
      </div>
      </div>
    </div>
  );
};

export default LoyalityMenu;
