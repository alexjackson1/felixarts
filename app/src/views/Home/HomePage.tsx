import { useNavigate } from "react-router-dom";

import styled from "@emotion/styled";

import { Button, Space, Tag, Typography } from "antd";

import { User } from "../../app/auth";
import { ElementProps } from "../../app/utils";

import Logo from "../../components/Logo";
import useAuth from "../../hooks/useAuth";
import Example from "../../components/Example";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  background-color: white;
  padding: 30px;

  & > h1 {
    text-align: center;
    margin: 0;
  }
`;

const Title = styled(Typography.Title)`
  color: #096dd9;
`;

const RoleTag = styled(Tag)`
  margin: 0;
`;

function SignOutButtons({ id }: { id: string }) {
  const navigate = useNavigate();
  return (
    <Space>
      <Button type="primary" onClick={() => navigate(`/users/${id}`)}>
        Account
      </Button>
      <Button onClick={() => navigate("/logout")}>Sign Out</Button>
    </Space>
  );
}

function SignInButtons() {
  const navigate = useNavigate();
  return (
    <Space>
      <Button type="primary" onClick={() => navigate("/login")}>
        Sign In
      </Button>
      <Button onClick={() => navigate("/register")}>Register</Button>
    </Space>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  gap: 10px;
`;

function UserProfile({ user }: { user: User }) {
  return (
    <ProfileContainer>
      <Typography.Text strong>{user.fullName}</Typography.Text>
      <RoleTag>{user.authRole}</RoleTag>
    </ProfileContainer>
  );
}

function HomePage(props: ElementProps<HTMLDivElement>) {
  const { user } = useAuth();

  return (
    <Container {...props}>
      <Logo />
      <Title>Felix Arts</Title>
      {user && <UserProfile user={user} />}
      {!!user ? <SignOutButtons id={user.id} /> : <SignInButtons />}

      <Example />
    </Container>
  );
}

export default HomePage;
