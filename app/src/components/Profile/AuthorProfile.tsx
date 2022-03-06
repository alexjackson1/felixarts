import { Link } from "react-router-dom";

import { Breadcrumb, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";
import { Profile as ProfileType } from "../../app/types";

import { ProfileForm } from "../Forms/Author";

import ErrorState, { ErrorType } from "../../views/Error";
import useAuthorProfileForm from "./useAuthorProfileForm";

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

export interface AuthorProfileProps {
  id: string | undefined;
  profile: ProfileType;
}

function AuthorProfile({ id, profile }: AuthorProfileProps) {
  if (!id) return <ErrorState type={ErrorType.NotFound} />;
  const author = profile.authors.find((author) => author.id === id);
  if (!author) return <ErrorState type={ErrorType.NotFound} />;
  const { form, loading, save, clear } = useAuthorProfileForm(author);

  const name = author.title ? `${author.title} ${author.name}` : author.name;

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/authors">Authors</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/profile">{author.name}</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      <FormContainer>
        {loading ? (
          <Spin indicator={<LoadingOutlined />}>
            <ProfileForm name={name} onSave={save} onClear={clear} form={form} />
          </Spin>
        ) : (
          <ProfileForm name={name} onSave={save} onClear={clear} form={form} />
        )}
      </FormContainer>
    </>
  );
}

export default AuthorProfile;
