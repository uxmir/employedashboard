import {
  Typography,
  Form,
  Input,
  DatePicker,
  InputNumber,
  Button,
  message,
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
      message.success("data created successfully");
    } catch (error) {
      message.error("there is somethig wrong");
    }
  };
  return (
    <>
      <Title level={3}> Create employe</Title>
      <div className="mt-5">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Employe Name"
            name="employe_name"
            rules={[{ required: true, message: "Name is Required" }]}
          >
            <Input placeholder="Enter Name" />
          </Form.Item>
          <Form.Item
            label="DepartMent"
            name="department"
            rules={[{ required: true, message: "department is required" }]}
          >
            <Input placeholder="Enter DepartMent" />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "role" }]}
          >
            <Input placeholder="Enter Role" />
          </Form.Item>
          <Form.Item
            label="Joining Date"
            name="joining_date"
            rules={[{ required: true, message: "Joinig date is required" }]}
          >
            <DatePicker
              className="w-full"
              placeholder="Select Date"
              format="DD/MM/YYYY"
            />
          </Form.Item>
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
