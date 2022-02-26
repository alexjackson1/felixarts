import React from "react";
import { useNavigate } from "react-router-dom";

import { notification } from "antd";
import { FormInstance, useForm } from "antd/lib/form/Form";

import { register as apiRegister } from "../../app/api";
import { RegisterFormData } from "../../components/Forms/User";
import useAuth from "../../hooks/useAuth";
import { AuthRole } from "../../app/auth";

/**
 * Custom login form React hook that initialises an antd form and defines
 * async callback functions.
 *
 * @param signIn sign in callback function
 * @param defaultForm default form instance
 * @returns hook payload
 */
export function useRegister(defaultForm?: FormInstance<RegisterFormData>) {
  // Base state: antd form and registering/loading state
  const [form] = useForm(defaultForm);
  const [loading, setLoading] = React.useState(false);
  const { setSignedIn } = useAuth();

  // React router navigation function
  const navigate = useNavigate();

  // Async sign in callback
  const register = async () => {
    setLoading(true);

    try {
      const { fullName, email, password } = form.getFieldsValue();
      const user = await apiRegister({
        fullName,
        email,
        password,
        verified: false,
        authRole: AuthRole.Writer,
      });

      if (!user) {
        notification.error({
          message: "Could not create account!",
          description: "Something went wrong and we couldn't create your account.",
        });
      } else {
        notification.success({
          message: "Successfully created account!",
          description: `You're now signed in as ${user.fullName}.`,
        });

        setSignedIn(user);
        navigate("/");
      }
    } catch (e) {
      notification.error({
        message: "Could not create account!",
        description: "An internal server error occurred.",
      });
    }

    return () => setLoading(false);
  };

  // Return hook payload
  return { form, loading, register };
}

export default useRegister;
