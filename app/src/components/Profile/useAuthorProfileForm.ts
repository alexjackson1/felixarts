import React from "react";
import { useNavigate } from "react-router-dom";

import { notification } from "antd";
import { useForm } from "antd/lib/form/Form";

import { updateAuthor } from "../../app/api";
import { Author } from "../../app/types";

export function useAuthorProfileForm({ id, ...initialValues }: Author) {
  const [form] = useForm<Author>();
  const [loading, setLoading] = React.useState(false);

  // Set initial form values
  form.setFieldsValue(initialValues);

  // React router navigation function
  const navigate = useNavigate();

  // Async update user callback
  const save = async (values: Partial<Omit<Author, "id">>) => {
    setLoading(true);

    try {
      const update = { ...values, id };
      const response = await updateAuthor(update);

      if (response === false) {
        const message = "Could not save author profile!";
        notification.error({
          message,
          description: "You lack the necessary privileges to update author profile.",
        });

        navigate("/login");
      } else {
        if (!response) throw new Error();
        notification.success({
          message: "Successfully updated author!",
          description: `Thanks for keeping your profile up-to-date.`,
        });
      }
    } catch (e) {
      console.error(e);
      notification.error({
        message: "Could not update author!",
        description: "An internal server error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  const clear = () => form.setFieldsValue(initialValues);

  // Return hook payload
  return { form, loading, save, clear };
}

export default useAuthorProfileForm;
