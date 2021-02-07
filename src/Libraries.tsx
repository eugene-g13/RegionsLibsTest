import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Input, Space, Card } from "antd";
import { ColumnsType } from "antd/es/table";

interface ILibrary {
  order: number;
  territory: string;
  libraries: number;
}

interface IProps {
  data: any[] | undefined;
}

const columns: ColumnsType<ILibrary> = [
  {
    key: "territory",
    title: "Region",
    dataIndex: "territory",
    render: (text, record) => <Link to={`/order/${record.order}`}>{text}</Link>,
  },
  {
    key: "libraries",
    title: "Libraries",
    dataIndex: "libraries",
    sorter: {
      compare: (a, b) => a.libraries - b.libraries,
      multiple: 1,
    },
  },
];

export const Libraries = (props: IProps) => {
  const { data } = props;
  
  const [libraries, setLibraries] = useState<ILibrary[]>([]);
  const [filteredLibs, setFiltredLibs] = useState<ILibrary[]>([]);

  useEffect(() => {
    setLibraries(data ? data : []);
    setFiltredLibs(data ? data : []);
  }, [data]);

  const handleSearch = (searchText: string) => {
    let filtered: ILibrary[] = [];

    if (libraries && libraries.length) {
      filtered = libraries.filter(item =>
        item.territory.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFiltredLibs(filtered);
  };

  return (
    <Card title="Libraries by location" bordered={false}>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input.Search
          placeholder="Search..."
          allowClear
          style={{ maxWidth: "300px" }}
          onSearch={handleSearch}
        />
        <Table<ILibrary>
          bordered
          dataSource={filteredLibs}
          columns={columns}
          rowKey="order"
          size="small"
          summary={() => (
            <Table.Summary.Row className="table-summary-row">
              <Table.Summary.Cell index={0} colSpan={2}>
                Total rows in table: {filteredLibs ? filteredLibs.length : 0}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )}
          pagination={{
            pageSizeOptions: ["10", "15", "20", "30"],
            defaultPageSize: 15,
            showSizeChanger: true,
            position: ["bottomCenter"],
            size: "default",
            locale: { items_per_page: "" },
          }}
        />
      </Space>
    </Card>
  );
};

export default Libraries;
