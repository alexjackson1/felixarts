import React from "react";
import { useNavigate } from "react-router-dom";

import { notification } from "antd";
import { FormInstance, useForm } from "antd/lib/form/Form";

import { login } from "../../app/api";
import { LoginFormData } from "../../components/Forms/User";
import useAuth from "../../hooks/useAuth";

/**
 * Custom login form React hook that initialises an antd form and defines
 * async callback functions.
 *
 * @param signIn sign in callback function
 * @param defaultForm default form instance
 * @returns hook payload
 */
export function useLoginFormProps(defaultForm?: FormInstance<LoginFormData>) {
  // Base state: antd form and sigining in/loading state
  const [form] = useForm(defaultForm);
  const [loading, setLoading] = React.useState(false);
  const { setSignedIn } = useAuth();

  // React router navigation function
  const navigate = useNavigate();

  // Async sign in callback
  const signIn = async () => {
    setLoading(true);

    try {
      const { email, password } = form.getFieldsValue();
      const user = await login({ email, password });

      if (!user) {
        notification.error({
          message: "Could not sign in!",
          description: "Your email and/or password were not recognised or incorrect.",
        });
      } else {
        notification.success({
          message: "Successfully signed in!",
          description: `Welcome back ${user.displayName}.`,
        });

        setSignedIn(user);
        navigate("/profile");
      }
    } catch (e) {
      notification.error({
        message: "Could not sign in!",
        description: "An internal server error occurred.",
      });
    }

    return () => setLoading(false);
  };

  // Navigate to register on click register, passing form state
  const register = () => navigate("/register", { state: form.getFieldsValue() });

  // Return hook payload
  return { form, loading, signIn, register };
}

export default useLoginFormProps;
