import { Row, Card, Divider, Modal } from "antd";
import React, { useState } from "react";
const CusCard = (props) => {
  const [onModal, setOnModal] = useState(false);
  const handleClick = () => {
    console.log(props);
  };
  return (
    <>
      <Row>
        <Card
          hoverable
          style={{
            width: "100%",
            borderRadius: "10px",
            height: 260,
            marginTop: "10px",
          }}
          onClick={handleClick}
        >
          {props.title}
          <Divider></Divider>
        </Card>
      </Row>
    </>
  );
};
export default CusCard;
