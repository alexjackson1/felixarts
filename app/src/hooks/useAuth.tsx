import React from "react";

import { AuthRole, User } from "../app/auth";

/**
 * Auth state interface.
 */
interface AuthState {
  user: User | null;
}

export enum ActionType {
  SetLoggedIn = "SET_LOGGED_IN",
  SetLoggedOut = "SET_LOGGED_OUT",
}

// Related Action Types
type SetLoggedInAction = { type: ActionType.SetLoggedIn; user: User };
type SetLoggedOutAction = { type: ActionType.SetLoggedOut };
type AuthAction = SetLoggedInAction | SetLoggedOutAction;
type AuthReducer = (state: AuthState, action: AuthAction) => AuthState;
type Dispatch = (action: AuthAction) => void;

type ContextState = { state: AuthState; dispatch: Dispatch };
const AuthContext = React.createContext<ContextState | undefined>(undefined);

// Initial state has no user logged in
const initialState: AuthState = { user: null };

/**
 * @param state current state
 * @param action received action
 * @returns next state
 */
function authReducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case ActionType.SetLoggedIn: {
      return { ...state, user: action.user };
    }
    case ActionType.SetLoggedOut: {
      return { ...state, user: null };
    }
    default: {
      throw new Error(`Unhandled action type: ${action}`);
    }
  }
}

/**
 * React component that provides access to authorisation context.
 */
export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer<AuthReducer>(authReducer, initialState);
  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook payload interface.
 */
interface UseAuthPayload {
  user: User | null;
  setSignedIn: (user: User) => void;
  setSignedOut: () => void;
  signedIn: boolean;
  id: string | null;
  role: AuthRole | null;
}

/**
 * Consumes the `AuthProvider` context state and returns currently signed in user and utility
 * functions.
 *
 * @returns hook payload
 */
export function useAuth(): UseAuthPayload {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("Hook `useAuth()` must be used within an `<AuthProvider />`.");

  const { state, dispatch } = context;
  const { user } = state;

  const signedIn = user !== null;
  const role = signedIn ? user.authRole : null;
  const id = signedIn ? user.id : null;

  const setSignedIn = (user: User) => dispatch({ type: ActionType.SetLoggedIn, user });
  const setSignedOut = () => dispatch({ type: ActionType.SetLoggedOut });

  return { user, role, signedIn, id, setSignedOut, setSignedIn };
}

export default useAuth;
