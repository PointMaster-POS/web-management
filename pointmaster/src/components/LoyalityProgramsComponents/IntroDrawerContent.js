import "./styles/IntroDrawerContent.css";
import { Button, Card, Popover, Steps } from "antd";
import { FileTextOutlined, UserAddOutlined, StarOutlined, MessageOutlined, DollarOutlined } from "@ant-design/icons";

const IntroDrawerContent = (props) => {
console.log(props);
  const content = (
    <div>
      <p>
        When you created a loyality program, your previously registered
        customers will <br />
        receive an email with the details of the loyality program.
      </p>
    </div>
  );

  const handledNavigateToForm = () => {
    props.onclose();
  }

  return (
    <div className="introDrawerContentContainer">
      <div class="introDrawerContentTitleContainer">
        <p class="introDrawerContentTitle">
          How <span class="name">{props.title}</span> works
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
                <img src={props.image} alt="example-image"  />
            </div>
            <div className="stepsTopicContainer">
                <p className="stepsTopic">Know More About <span style={{color:"#0e83b6" }}>{props.title}</span> Loyality Program Type</p>
                </div>
          <Steps
            style={{ width: "50%" }}
            direction="vertical"
            current={5}  
            items={[
              {
                title: "step 1",
                description: `${props.steps[0].step_1}`,
                icon: <FileTextOutlined />
              },
              {
                title: "step 2",
                description: `${props.steps[1].step_2}`,
                icon :<UserAddOutlined />
              },
              {
                title: "step 3",
                description: `${props.steps[2].step_3}`,
                icon : <StarOutlined />
              },
                {
                    title: "step 4",
                    description: `${props.steps[3].step_4}`,
                    icon: <MessageOutlined />
                },
                {
                    title: "step 5",
                    description: `${props.steps[4].step_5}`,
                    icon: <DollarOutlined />
                },
                
            ]}

          />
          <Button type="primary" className="introDrawerContentButton" onClick= {handledNavigateToForm}>
            Create a Loyality Program
            </Button>
        </div>
      </div>
    </div>
  );
};

export default IntroDrawerContent;
