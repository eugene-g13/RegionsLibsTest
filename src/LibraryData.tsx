import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, Space } from "antd";

interface ParamTypes {
  id: string;
}

interface IProps {
  data: any[] | undefined;
}

export const LibraryData = (props: IProps) => {
  const { id } = useParams<ParamTypes>();
  const history = useHistory();
  const [libInfo, setLibInfo] = useState<any>();

  useEffect(() => {
    const info = props.data ? props.data.find((el: any) => el.order === +id) : {};

    setLibInfo(info);
  }, [id, props.data]);

  //TODO: переделать на Table

  if (!libInfo) return <></>;

  return (
    <Card title={`Region: ${libInfo.territory}`} bordered={false}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Button onClick={() => history.push("/")}>Back</Button>
        {Object.entries(libInfo).map((el, index) => {
          const name = el[0];
          const value = el[1];
          return (
            <div key={name} style={{ width: "100%" }}>
              {name}: {value}
            </div>
          );
        })}
      </Space>
    </Card>
  );
};

export default LibraryData;
