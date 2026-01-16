import React, { useState } from "react";
import Container from "../Container";
import { Table, Tag, Button, Space, Drawer, } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CreateEmploye from '../CreateEmployeForm/CreateEmploye'
interface Employe {
  key: number;
  employe_name: string;
  department: string;
  role: string;
  joining_date: string;
  status: "archived" | "active";
  progress:number
}
const Employe: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [employe, setEmploye] = useState<Employe | null>(null);
  const [createEmployeDrawer,setCreateEmployeDrawer]=useState<boolean>(false)
  const employeData: Employe[] = [
    {
      key: 1,
      employe_name: "mirmonir",
      department: "engineering",
      role: "fontendDeveloper",
      joining_date: "10/2/2025",
      status: "active",
      progress:70
    },
    {
      key: 2,
      employe_name: "mirmonir",
      department: "engineering",
      role: "fontendDeveloper",
      joining_date: "10/2/2025",
      status: "archived",
      progress:50
    },
    {
      key: 3,
      employe_name: "mirmonir",
      department: "engineering",
      role: "fontendDeveloper",
      joining_date: "10/2/2025",
      status: "active",
      progress:40
    },
  ];
  const columns = [
    {
      title: "Employe Name",
      dataIndex: "employe_name",
      key: "employe_name",
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
      render: (status: string) => (
        <Tag color={`${status === "active" ? "green" : "red"}`}>{status}</Tag>
      ),
    },
       {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (progress:number) => (
      <span className={`${progress>60?'text-green-600':'text-red-600'}`}>{progress}%</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_: any, record: Employe) => (
        <Space size={"middle"}>
          <Button
            onClick={() => openEditDrawer(record)}
            size="small"
            icon={<EditOutlined />}
          />
          <Button size="small" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];
  const openEditDrawer = (record: Employe) => {
    setOpenDrawer(true);
    setEmploye(record);
  };
  const closeEditDrawer = () => {
    setOpenDrawer(false);
  };
  const openCreateDrawer=()=>{
    setCreateEmployeDrawer(true)
  }
    const closeCreateDrawer=()=>{
    setCreateEmployeDrawer(false)
  }
  return (
    <div>
      <Container>
        <div className="mt-30">
        <div className="my-5 flex justify-end">
             <Button onClick={openCreateDrawer} size="middle" type="primary">
            Create Employe
          </Button>
        </div>
          <Table
            dataSource={employeData}
            columns={columns}
            scroll={{ x: 800 }}
          />
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
      {/* <EditEmploye /> */}
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
      <CreateEmploye/>
      </Drawer>
    </div>
  );
};

export default Employe;

//create formValue
// import { Typography,Form, Input,DatePicker,InputNumber, } from "antd";
// const CreateEmploye:React.FC=()=>{
//   const {Title}=Typography
//   const onFinish=(values:any)=>{
//    const formattedValues={
//     ...values,
//     joining_date:values.joining_date?values.joining_date.format("DD/MM/YYYY"):''
//    }
//   }
//   return(
//     <>
//      <Title level={3}> Create employe</Title>
//      <div className="mt-5">
//      <Form 
//      layout="vertical"
//      onFinish={onFinish}
//      autoComplete="off"
//      >
//     <Form.Item
//     label="Employe Name"
//     name="employe_name"
//     rules={[{required:true,message:'Name is Required'}]}
//     >
//       <Input placeholder="Enter Name"/>
//     </Form.Item>
//     <Form.Item
//     label="DepartMent"
//     name="department"
//     rules={[{required:true,message:'department is required'}]}
//     >
//       <Input placeholder="Enter DepartMent"/>
//     </Form.Item>
//        <Form.Item
//     label="Role"
//     name="role"
//     rules={[{required:true,message:'role'}]}
//     >
//       <Input placeholder="Enter Role"/>
//     </Form.Item>
//     <Form.Item
//     label="Joining Date"
//     name="joining_date"
//     rules={[{required:true,message:'Joinig date is required'}]}
//     >
//      <DatePicker
//      className="w-full"
//      placeholder="Select Date"
//      format="DD/MM/YYYY"
//      />
//     </Form.Item>
//     <Form.Item
//     label="Progress"
//     name="progress"
//     >
//   <InputNumber
//    style={{width:'100%'}}
//   min={0}
//   max={100}
//   placeholder="Enter Progress"
//   />
//     </Form.Item>
//         <Form.Item
//     >
//    <Button style={{width:'100%'}} htmlType="submit" type="primary">Submit</Button>
//     </Form.Item>
//      </Form>
//      </div>
//     </>
//   )
// }

// interface EditProps {
//   employe_name: string;
//   department: string;
//   role: string;
//   joining_date: string;
//   status: "archived" | "active";
// }
// const EditEmploye: React.FC<EditProps> = ({employe_name,department,role,joining_date,status}) => {
//   return (
//     <>
//     <p>{employe_name}</p>
//     </>
//   )
// };
