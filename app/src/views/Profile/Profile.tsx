import { Navigate } from "react-router-dom";

import { Layout, Menu, Spin } from "antd";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";

import styled from "@emotion/styled";

import { Author, Profile as ProfileType } from "../../app/types";
import useAuth from "../../hooks/useAuth";

import ErrorState, { ErrorType } from "../Error";

import useProfileData from "./useProfileData";
import UserProfile from "../../components/Profile/UserProfile";
import AuthorProfile from "../../components/Profile/AuthorProfile";
import useMenuSwitcher, { ProfileKeys } from "./useMenuSwitcher";

const { Sider } = Layout;

const { SubMenu } = Menu;

/**
 * Styled main layout component.
 */
const MainLayout = styled.div`
  padding: 0 24px 24px;
  width: 100%;
  height: 100%;
`;

/**
 * `ContentSwitcher` props.
 */
interface ContentSwitcherProps {
  id: string | undefined;
  selected: string;
  profile: ProfileType;
}

/**
 * Renders either user or author profile components depending on selected keys.
 */
function ContentSwitcher({ id, selected, profile }: ContentSwitcherProps) {
  if (selected === ProfileKeys.UserProfile) return <UserProfile profile={profile} />;
  return <AuthorProfile id={id} profile={profile} />;
}

/**
 * Renders a `MenuItem` given an `Author` object.
 *
 * @param author author
 * @returns menu item node
 */
function renderAuthorItem({ id, name, title }: Author) {
  const label = title ? `${title} ${name}` : name;
  return (
    <Menu.Item key={`author_${id}`} data-authorid={id}>
      {label}
    </Menu.Item>
  );
}

/**
 * Profile view component with a menu-based sider.
 */
export function Profile({ profile }: { profile: ProfileType }) {
  const { menuProps, selected, id } = useMenuSwitcher();
  return (
    <Layout>
      <Sider width={200}>
        <Menu mode="inline" style={{ height: "100%", borderRight: 0 }} {...menuProps}>
          <Menu.Item key={ProfileKeys.UserProfile} icon={<UserOutlined />}>
            {profile.fullName}
          </Menu.Item>
          <SubMenu key={ProfileKeys.AllAuthors} title="Author Profiles" icon={<TeamOutlined />}>
            {profile.authors.map(renderAuthorItem)}
          </SubMenu>
        </Menu>
      </Sider>
      <MainLayout>
        <ContentSwitcher id={id} selected={selected} profile={profile} />
      </MainLayout>
    </Layout>
  );
}

/**
 * Wraps the `ProfileContainer` component in a `UserContainer`.
 *
 * The component will redirect if the current user cannot be identified, and
 * otherwise inject the user's id as props to the `ProfileContainer`
 * component.
 *
 * @returns profile container with user id prop injected
 */
function UserContainer() {
  const { user } = useAuth();

  if (user === null) return <Navigate to="/login" />;

  return <ProfileContainer id={user.id} />;
}

/**
 * Wraps the `Profile` component in a `ProfileContainer`.
 *
 * The component will render a loading state whilst the profile data is being
 * fetched from the REST API via the `useProfileData` hook. If the profile
 * cannot be found (or another error occurs) it will render an error state.
 * Otherwise it will pass the user's profile as props to the `Profile`
 * component.
 *
 * @returns profile with data injected
 */
function ProfileContainer({ id }: { id: string }) {
  const { loading: fetching, profile, error } = useProfileData(id);

  if (fetching) return <Spin tip="Loading Profile Data..." />;
  if (!profile || error) return <ErrorState type={ErrorType.NotFound} />;

  return <Profile profile={profile} />;
}

export default UserContainer;
