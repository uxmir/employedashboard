import React, { useState, useEffect } from "react";
import Container from "../Container";
import {
  Typography,
  Table,
  Tag,
  Button,
  Space,
  Drawer,
  Progress,
  Select,
  Input,
  Row,
  Col,
  Spin,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CreateEmploye from "../CreateEmployeForm/CreateEmploye";
import EditEmploye from "../EditEmployeForm/EditEmploye";
import { useEmploye,EmployeData } from "../DataProvider/EmployeDataProvider";
//for selectinput in department
interface departmentSectors {
  id: number;
  value: string;
}
const Employe: React.FC = () => {
  const { Title } = Typography;
  const { Search } = Input;
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [createEmployeDrawer, setCreateEmployeDrawer] =
    useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { employes } = useEmploye();
  const columns = [
    {
      title: "Employe Name",
      dataIndex: "employe_name",
      key: "employe_name",
      sorter: (a: any, b: any) => a.employe_name.localeCompare(b.employe_name),
      render: (employe_name: string) => (
        <b className="text-gray-600 capitalize font-medium text-base">
          {employe_name}
        </b>
      ),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      sorter: (a: any, b: any) => a.department.localeCompare(b.department),
      render: (department: string) => (
        <span className="text-gray-600 capitalize font-medium text-base">
          {department}
        </span>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a: any, b: any) => a.role.localeCompare(b.role),
      render: (role: string) => (
        <span className="text-gray-600 capitalize font-medium text-base">
          {role}
        </span>
      ),
    },
    {
      title: "Joining Date",
      dataIndex: "joining_date",
      key: "joining_date",
      sorter: (a: any, b: any) => {
        const dateA = a.joining_date.split("/").reverse().join("");
        const dateB = b.joining_date.split("/").reverse().join("");
        return dateA.localeCompare(dateB);
      },
      render: (joining_date: string) => (
        <span className="text-gray-600 capitalize font-medium text-base">
          {joining_date}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: (a: any, b: any) => a.status.localeCompare(b.status),
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      sorter: (a: any, b: any) => a.progress - b.progress,
      render: (progress: number) => (
        <Progress
          percent={progress}
          status={progress > 70 ? "success" : "exception"}
          showInfo={true}
          format={(percent) => `${percent}%`}
        />
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: any) => (
        <Space size={"middle"}>
          <Button
            onClick={() => opneEditDrawer(record)}
            size="small"
            icon={<EditOutlined />}
          />
          <Button size="small" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];
  const departmentData: departmentSectors[] = [
    { id: 1, value: "hr" },
    { id: 2, value: "software" },
    { id: 3, value: "creative" },
  ];
  //filter logic
  const filteredData:EmployeData[] = employes.filter((item:EmployeData) => {
    const searchMached =
      item.employe_name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.department.toLowerCase().includes(searchText.toLowerCase()) ||
      item.role.toLowerCase().includes(searchText.toLowerCase());
    const filterDepartment = departmentFilter
      ? departmentFilter === item.department
      : true;
    const filterStatus = statusFilter ? statusFilter === item.status : true;
    return searchMached && filterDepartment && filterStatus;
  });
  //loding logic in filter
  useEffect(() => {
    setLoading(true);
    const timeoOut = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeoOut);
  }, [searchText, departmentFilter, statusFilter]);

  const opneEditDrawer = (record: any) => {
    setSelectedEmployee(record);
    setOpenDrawer(true);
  };
  const closeEditDrawer = () => {
    setOpenDrawer(false);
  };
  const openCreateDrawer = () => {
    setCreateEmployeDrawer(true);
  };
  const closeCreateDrawer = () => {
    setCreateEmployeDrawer(false);
  };
  return (
    <div>
      <Container>
        <div className="mt-30">
          <Title level={1}>Employe Dashboard</Title>
          <div className="my-6 p-4 bg-gray-50 rounded-lg">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={8}>
                <Search
                  placeholder="Search Name, Dept or Role"
                  allowClear
                  onChange={(e: any) => setSearchText(e.target.value)}
                />
              </Col>
              <Col xs={12} md={6}>
                <Select
                  placeholder="Filter by Dept"
                  className="w-full"
                  allowClear
                  onChange={(value) => setDepartmentFilter(value)}
                >
                  {departmentData.map((data) => (
                    <Select.Option
                      key={data.id}
                      value={data.value}
                      style={{ textTransform: "capitalize" }}
                    >
                      {data.value}
                    </Select.Option>
                  ))}
                </Select>
              </Col>
              <Col xs={12} md={6}>
                <Select
                  placeholder="Filter by Status"
                  className="w-full"
                  allowClear
                  onChange={(value) => setStatusFilter(value)}
                >
                  <Select.Option value="active">Active</Select.Option>
                  <Select.Option value="archive">Archive</Select.Option>
                </Select>
              </Col>

              <Col xs={24} md={4} className="text-right">
                <Button onClick={openCreateDrawer} type="primary" block>
                  Create Employe
                </Button>
              </Col>
            </Row>
          </div>

          <Spin spinning={loading} tip="Filtering Data..." >
            <Table
              dataSource={filteredData}
              columns={columns}
              scroll={{ x: 800 }}
            />
          </Spin>
        </div>
      </Container>
      <Drawer
        styles={{
          wrapper: {
            width: window.innerWidth < 640 ? "100%" : 700,
          },
        }}
        open={openDrawer}
        onClose={closeEditDrawer}
      >
        <EditEmploye
          employeData={selectedEmployee}
          closeDrawer={closeEditDrawer}
        />
      </Drawer>
      {/*createdata */}
      <Drawer
        styles={{
          wrapper: {
            width: window.innerWidth < 640 ? "100%" : 600,
          },
        }}
        open={createEmployeDrawer}
        onClose={closeCreateDrawer}
      >
        <CreateEmploye closeDrawer={closeCreateDrawer} />
      </Drawer>
    </div>
  );
};

export default Employe;
