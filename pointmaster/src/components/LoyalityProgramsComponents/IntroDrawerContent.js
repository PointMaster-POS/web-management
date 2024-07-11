import "./IntroDrawerContent.css";
import { Button, Card, Popover, Steps } from "antd";
import { FileTextOutlined, UserAddOutlined, StarOutlined, MessageOutlined, DollarOutlined } from "@ant-design/icons";
const { Meta } = Card;
const IntroDrawerContent = () => {
  const content = (
    <div>
      <p>
        When you created a loyality program, your previously registered
        customers will <br />
        receive an email with the details of the loyality program.
      </p>
    </div>
  );

  return (
    <div className="introDrawerContentContainer">
      <div class="introDrawerContentTitleContainer">
        <p class="introDrawerContentTitle">
          How <span class="name">Amount Spent</span> works
        </p>
      </div>

      <div className="introDrawerContaintContainer">
        <div className="exampleCardContainer">
          <Card
            className="exampleCard"

            cover={
              <img
                alt="example image"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <p>
              Your customers receive your loyality creation via email{" "}
              <Popover
                content={content}
                title="How e-mail works"
                trigger="click"
                className="seemore"
              >
                see more
              </Popover>
            </p>
          </Card>
        </div>
        <div className="stepsContainer">
            <div className="imageContainer">
                <img src="/LoyalityPrograms/point.png" alt="example image"  />
            </div>
            <div className="stepsTopicContainer">
                <p className="stepsTopic">Know More About <span style={{color:"#0e83b6" }}>Amount Spent</span> Loyality Program Type</p>
                </div>
          <Steps
            style={{ width: "50%" }}
            direction="vertical"
            current={5}  
            items={[
              {
                title: "step 1",
                description: "This is a description.",
                icon: <FileTextOutlined />
              },
              {
                title: "step 2",
                description: "This is a description.",
                icon :<UserAddOutlined />
              },
              {
                title: "step 3",
                description: "This is a description.",
                icon : <StarOutlined />
              },
                {
                    title: "step 4",
                    description: "This is a description.",
                    icon: <MessageOutlined />
                },
                {
                    title: "step 5",
                    description: "This is a description.",
                    icon: <DollarOutlined />
                },
                
            ]}

          />
          <Button type="primary" className="introDrawerContentButton">
            Create a Loyality Program
            </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroDrawerContent;
