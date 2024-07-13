import "./loyality-menu-styles.css";
import React, { useEffect} from "react";
import LoyalityCard from "../../components/LoyalityProgramsComponents/LoyalityCard";
import LoyalityData from "./program-details.json";

const LoyalityMenu = () => {

    useEffect(() => {
        console.log(LoyalityData);
    }, []);


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
          title= {LoyalityData.amount_spent.title}
          description={LoyalityData.amount_spent.description}
          image= {LoyalityData.amount_spent.image}
          steps = {LoyalityData.amount_spent.steps}
        />
        <LoyalityCard
          title= {LoyalityData.visit.title}
          description={LoyalityData.visit.description}
          image= {LoyalityData.visit.image}
            steps = {LoyalityData.visit.steps}
        />
        <LoyalityCard
          title={LoyalityData.cash_for_purchase.title}
          description={LoyalityData.cash_for_purchase.description}
          image=    {LoyalityData.cash_for_purchase.image}
            steps = {LoyalityData.cash_for_purchase.steps}

        />
      </div>
      </div>
    </div>
  );
};

export default LoyalityMenu;
