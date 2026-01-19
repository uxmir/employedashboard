import React, { useEffect } from 'react';
import { Form, Input, DatePicker, InputNumber, Button, message, Select } from "antd"; 
import dayjs from 'dayjs'; 
import { useEmploye } from '../DataProvider/EmployeDataProvider';

interface EditEmployeData {
  key: React.Key;
  employe_name: string;
  department: string;
  role: string;
  joining_date: string;
  progress: number;
  status: string;
}

interface EditEmployeProps {
  employeData: EditEmployeData | null; 
  closeDrawer: () => void;
}

const EditEmploye: React.FC<EditEmployeProps> = ({ employeData, closeDrawer }) => {
  const { editEmployeData } = useEmploye();
  const [form] = Form.useForm();

  useEffect(() => {
    if (employeData) {
      form.setFieldsValue({
        ...employeData,
        joining_date: employeData.joining_date ? dayjs(employeData.joining_date, "DD/MM/YYYY") : null,
      });
    }
  }, [employeData, form]);

  const onFinish = (values: any) => {
    try {
      const formattedValues = {
        ...values,
        key: employeData?.key, 
        joining_date: values.joining_date ? values.joining_date.format("DD/MM/YYYY") : "",
      };
      editEmployeData(formattedValues);
      closeDrawer();
      message.success("Employee data updated successfully");
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  return (
    <div className="mt-5">
      <h2 className="mb-4 text-xl font-bold">Edit Employee</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Employee Name" name="employe_name" ><Input /></Form.Item>
        <Form.Item label="Department" name="department" ><Input /></Form.Item>
        <Form.Item label="Role" name="role" ><Input /></Form.Item>
        
        <Form.Item label="Joining Date" name="joining_date" >
          <DatePicker className="w-full" format="DD/MM/YYYY" />
        </Form.Item>

        {/* Status Select Field */}
        <Form.Item label="Status" name="status" >
          <Select>
            <Select.Option value="active">Active</Select.Option>
            <Select.Option value="archive">Archive</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Progress" name="progress">
          <InputNumber style={{ width: "100%" }} min={0} max={100} />
        </Form.Item>

        <Button style={{ width: "100%" }} htmlType="submit" type="primary">
          Update Data
        </Button>
      </Form>
    </div>
  );
};

export default EditEmploye;