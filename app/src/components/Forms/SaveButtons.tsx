import { ClearOutlined, SaveOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Form, Space } from "antd";

const Buttons = styled(Space)`
  width: 100%;
`;

function SaveButtons() {
  return (
    <Form.Item>
      <Buttons style={{ flexDirection: "row-reverse" }}>
        <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
          Save Changes
        </Button>
        <Button type="default" htmlType="reset" icon={<ClearOutlined />}>
          Clear Changes
        </Button>
      </Buttons>
    </Form.Item>
  );
}

export default SaveButtons;
