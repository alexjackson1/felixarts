import { gql, useQuery } from "@apollo/client";
import { Card, Typography } from "antd";
import useAuth from "../hooks/useAuth";

const GET_USER = (id: string) => gql`
  query UserQuery {
    user(id: "${id}") {
      id
      fullName
      authRole
      verified
      createdAt
      updatedAt
    }
  }
`;

function Parent() {
  const { user } = useAuth();
  if (user === null) return <span>{"Not signed in"}</span>;

  return <Example id={user.id} />;
}

export function Example({ id }: { id: string }) {
  const { loading, error, data } = useQuery(GET_USER(id));

  if (loading) return <span>{"Loading..."}</span>;
  if (error) return <span>{`Error! ${error.message}`}</span>;

  return (
    <Card>
      <Typography.Title>SOmething</Typography.Title>
      <pre>{JSON.stringify(data, null, "  ")}</pre>
    </Card>
  );
}

export default Parent;
