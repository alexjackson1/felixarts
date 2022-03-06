import { findUserProfileById } from "../../app/api";
import { Profile } from "../../app/types";

import useAPIQuery from "../../hooks/useAPIQuery";

/**
 * Payload of the `useProfileData` hook.
 *
 * It should always be the case that if `!loading && !error` then profile is
 * well defined.
 */
export interface UseProfileDataHookPayload {
  loading: boolean;
  error: Error | null;
  profile: Profile | null;
}

/**
 * Queries the REST API for user profile data by id, returning loading and
 * error states, and profile data.
 *
 * @param id user id
 * @returns hook payload
 */
export function useProfileData(id: string): UseProfileDataHookPayload {
  const { payload: profile, loading, error } = useAPIQuery(() => findUserProfileById(id));

  if (profile === undefined) {
    return {
      loading: false,
      profile: null,
      error: new Error(`Could not find user profile with id ${id}`),
    };
  }

  return { loading, profile, error };
}

export default useProfileData;
