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
          image="./LoyalityPrograms/point.png"
          title="Point Based Loyality Program"
          description="Customers earn points for every purchase they make"
        />
        <LoyalityCard
          image="./LoyalityPrograms/point.png"
          title="Loyality Program 1"
          description="This is the description of the Loyality Program 1"
        />
        <LoyalityCard
          image="./LoyalityPrograms/point.png"
          title="Loyality Program 1"
          description="This is the description of the Loyality Program 1"
        />
      </div>
      </div>
    </div>
  );
};

export default LoyalityMenu;
