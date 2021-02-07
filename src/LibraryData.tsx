import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { ArrowLeftOutlined } from '@ant-design/icons';

interface ParamTypes {
  id: string;
}

interface IProps {
  data: any[] | undefined;
}

interface ILibInfo {
  name: string;
  value: string;
}

const columns: ColumnsType<ILibInfo> = [
  {
    key: "name",
    title: "Name",
    dataIndex: "name",
  },
  {
    key: "value",
    title: "Value",
    dataIndex: "value",
  },
];

export const LibraryData = (props: IProps) => {
  const history = useHistory();
  const { id } = useParams<ParamTypes>();

  const [libInfo, setLibInfo] = useState<any>();
  const [regionName, setRegionName] = useState<string>();
  
  useEffect(() => {
    const info = props.data ? props.data.find((el: any) => el.order === +id) : {};

    setRegionName(info.territory);

    const tableInfo: ILibInfo[] = Object.entries(info).map(el => {
      return { name: el[0], value: el[1] as string };
    });

    setLibInfo(tableInfo);
  }, [id, props.data]);

  if (!libInfo) return <></>;

  const renderBackButton = () => {
   return <Button onClick={() => history.push("/")}><ArrowLeftOutlined />Back</Button> 
  }

  return (
    <Card title={`Region: ${regionName}`} bordered={false}>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {renderBackButton()}
        <Table
          bordered
          dataSource={libInfo}
          columns={columns}
          pagination={false}
          rowKey={row => row.name}
          size="small"
        />
        {renderBackButton()}
      </Space>
    </Card>
  );
};

export default LibraryData;
