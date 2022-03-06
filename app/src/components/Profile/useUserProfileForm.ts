import React from "react";
import { useNavigate } from "react-router-dom";

import { notification } from "antd";
import { useForm } from "antd/lib/form/Form";

import { updateUser } from "../../app/api";
import { User, WithPassword } from "../../app/auth";
import useAuth from "../../hooks/useAuth";

export function useUserProfileForm({ id, ...initialValues }: User) {
  const [form] = useForm<WithPassword<User>>();
  const [loading, setLoading] = React.useState(false);
  const { setSignedIn } = useAuth();

  // Set initial form values
  form.setFieldsValue(initialValues);

  // React router navigation function
  const navigate = useNavigate();

  // Async update user callback
  const save = async (values: Partial<WithPassword<Omit<User, "id">>>) => {
    setLoading(true);

    try {
      const update = { ...values, id };
      const response = await updateUser(update);

      if (response === false) {
        const message = "Could not save user profile!";
        notification.error({
          message,
          description: "You lack the necessary privileges to update your profile.",
        });

        navigate("/login");
      } else {
        if (!response) throw new Error();
        setSignedIn(response);
        notification.success({
          message: "Successfully updated user!",
          description: `Thanks for keeping your profile up-to-date, ${values.displayName}.`,
        });
      }
    } catch (e) {
      console.error(e);
      notification.error({
        message: "Could not sign in!",
        description: "An internal server error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Navigate to register on click register, passing form state
  const clear = () => form.setFieldsValue(initialValues);

  // Return hook payload
  return { form, loading, save, clear };
}

export default useUserProfileForm;
