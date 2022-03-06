import { LoadingOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Breadcrumb, Spin } from "antd";
import { Link } from "react-router-dom";
import { Profile as ProfileType } from "../../app/types";
import { ProfileForm } from "../Forms/User";
import useUserProfileForm from "./useUserProfileForm";

/**
 * Styled form container component.
 */
const FormContainer = styled.div`
  background-color: white;
  padding: 24px 24px;
  margin: 0 auto;

  & > form {
    max-width: 800px;
  }
`;

export interface UserProfileProps {
  profile: ProfileType;
}

function UserProfile({ profile }: UserProfileProps) {
  const { form, loading, save, clear } = useUserProfileForm(profile);

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/users">Users</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/profile">{profile.fullName}</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <FormContainer>
        {loading ? (
          <Spin indicator={<LoadingOutlined />}>
            <ProfileForm name={profile.fullName} onSave={save} onClear={clear} form={form} />
          </Spin>
        ) : (
          <ProfileForm name={profile.fullName} onSave={save} onClear={clear} form={form} />
        )}
      </FormContainer>
    </>
  );
}

export default UserProfile;
