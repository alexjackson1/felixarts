import React from "react";
import { useNavigate } from "react-router-dom";

import { notification } from "antd";
import { FormInstance, useForm } from "antd/lib/form/Form";

import { logout } from "../../app/api";
import { LoginFormData } from "../../components/Forms/User";
import useAuth from "../../hooks/useAuth";

/**
 * Custom login form React hook that initialises an antd form and defines
 * async callback functions.
 *
 * @returns hook payload
 */
export function useLogout() {
  // Base state: sigining out/loading state
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<unknown | null>(null);
  const { setSignedOut } = useAuth();

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await logout();
        setSignedOut();
        setLoading(false);
        notification.success({
          message: "Successfully signed out!",
          description: `You've signed out of your account.`,
        });
      } catch (e) {
        setError(e || true);
        setLoading(false);
        notification.error({
          message: "Something went wrong signing you out.",
          description: `An internal server error occurred.`,
        });
      }
    })();
  }, []);

  // Return hook payload
  return { loading, error };
}

export default useLogout;
