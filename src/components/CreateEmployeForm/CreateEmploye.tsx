import {
  Typography,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Button,
  message,
  Select,
} from "antd";
import { useEmploye } from "../DataProvider/EmployeDataProvider";

interface createEmployeProps {
  closeDrawer: () => void;
}

const CreateEmploye: React.FC<createEmployeProps> = ({ closeDrawer }) => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const { createEmployeData } = useEmploye();

  const onFinish = (values: any) => {
    try {
      const formattedValues = {
        ...values,
        joining_date: values.joining_date
          ? values.joining_date.format("DD/MM/YYYY")
          : "",
      };
      createEmployeData(formattedValues);
      closeDrawer();
      form.resetFields();
      message.success("Employee created successfully");
    } catch (error) {
      message.error("Something went wrong");
    }
  };

  return (
    <>
      <Title level={3}> Create Employee</Title>
      <div className="mt-5">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          {/* Employee Name */}
          <Form.Item
            label="Employee Name"
            name="employe_name"
            rules={[{ required: true, message: "Name is Required" }]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>

          {/* Department */}
          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: "Department is required" }]}
          >
            <Input placeholder="Enter Department" />
          </Form.Item>

          {/* Role */}
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Role is required" }]}
          >
            <Input placeholder="Enter Role" />
          </Form.Item>

          {/* Joining Date */}
          <Form.Item
            label="Joining Date"
            name="joining_date"
            rules={[{ required: true, message: "Joining date is required" }]}
          >
            <DatePicker
              className="w-full"
              placeholder="Select Date"
              format="DD/MM/YYYY"
            />
          </Form.Item>

          {/* Status (নতুন যোগ করা হয়েছে) */}
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Status is required" }]}
            initialValue="active"
          >
            <Select placeholder="Select Status">
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="archive">Archive</Select.Option>
            </Select>
          </Form.Item>

          {/* Progress */}
          <Form.Item label="Progress" name="progress">
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              max={100}
              placeholder="Enter Progress"
            />
          </Form.Item>

          <Form.Item>
            <Button style={{ width: "100%" }} htmlType="submit" type="primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CreateEmploye;