import React from "react";
import { useNavigate } from "react-router-dom";

import { notification } from "antd";
import { FormInstance, useForm } from "antd/lib/form/Form";

import { updateUser } from "../../app/api";
import { ProfileFormData } from "../../components/Forms/User";
import useAuth from "../../hooks/useAuth";

/**
 * Custom login form React hook that initialises an antd form and defines
 * async callback functions.
 *
 * @param defaultForm default form instance
 * @returns hook payload
 */
export function useProfileForm(defaultForm: FormInstance<ProfileFormData>) {
  // Base state: antd form and registering/loading state
  const [form] = useForm<ProfileFormData>(defaultForm);

  const [loading, setLoading] = React.useState(false);
  const { setSignedIn } = useAuth();

  // React router navigation function
  const navigate = useNavigate();

  // Async sign in callback
  const save = async () => {
    setLoading(true);

    try {
      const { fullName, email, password, verified, authRole, id } = form.getFieldsValue();
      const user = await updateUser({
        id,
        fullName,
        email,
        password,
        verified,
        authRole,
      });

      if (!user) {
        notification.error({
          message: "Could not update user!",
          description: "Something went wrong and we couldn't update the user account.",
        });
      } else {
        notification.success({
          message: "Successfully saved changes!",
          description: `Updated user ${fullName}.`,
        });

        setSignedIn(user);
        navigate("/");
      }
    } catch (e) {
      notification.error({
        message: "Could not update user!",
        description: "An internal server error occurred.",
      });
    }

    return () => setLoading(false);
  };

  // Return hook payload
  return { form, loading, save };
}

export default useProfileForm;
