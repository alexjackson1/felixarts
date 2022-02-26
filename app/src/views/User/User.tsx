import { HeroContent, HeroLayout } from "../common";
import useAuth from "../../hooks/useAuth";
import { Navigate, useParams } from "react-router-dom";
import useProfileForm from "./useProfileForm";
import { useForm } from "antd/lib/form/Form";
import { ProfileFormData } from "../../components/Forms/User";

function User() {
  const { id } = useParams();
  const { user } = useAuth();
  if (user === null) return <Navigate to="/login" />;
  return (
    <HeroLayout>
      <HeroContent>{user.fullName}</HeroContent>
    </HeroLayout>
  );
}

export default User;
