import React from "react";
import { useNavigate } from "react-router-dom";

import { notification } from "antd";
import { FormInstance, useForm } from "antd/lib/form/Form";

import { getUserById, validate } from "../../app/api";
import { ProfileFormData } from "../../components/Forms/User";
import useAuth from "../../hooks/useAuth";

/**
 * Custom login form React hook that initialises an antd form and defines
 * async callback functions.
 *
 * @param defaultForm default form instance
 * @returns hook payload
 */
export function useProfileForm(id: string) {
  const [loading, setLoading] = React.useState(false);
  const [profile, setProfile] = React.useState<ProfileFormData | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      const user = await getUserById(id);
      if (!user) {
        setError("User undefined");
        setProfile(null);
        setLoading(false);
      } else {
        setError(null);
        // setProfile();
      }
    })();
  }, []);

  return { loading, profile, error };
}

export default useProfileForm;
