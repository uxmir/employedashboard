import React, { useState } from "react";
import Container from "../Container";
import { Table, Tag, Button, Space, Drawer, Progress } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CreateEmploye from "../CreateEmployeForm/CreateEmploye";
import EditEmploye from "../EditEmployeForm/EditEmploye";
import { useEmploye } from "../DataProvider/EmployeDataProvider";

const Employe: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [createEmployeDrawer, setCreateEmployeDrawer] =
    useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const { employes } = useEmploye();
  const columns = [
    {
      title: "Employe Name",
      dataIndex: "employe_name",
      key: "employe_name",
      // স্ট্রিং এর জন্য localeCompare ব্যবহার করুন
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
          <div className="my-5 flex justify-end">
            <Button onClick={openCreateDrawer} size="middle" type="primary">
              Create Employe
            </Button>
          </div>
          <Table dataSource={employes} columns={columns} scroll={{ x: 800 }} />
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
