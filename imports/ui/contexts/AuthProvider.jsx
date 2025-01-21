/**
 * Provides the AuthContext to all components in the app.
 */

import React, { createContext, useCallback, useMemo, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";

/**
 * AuthContext is the context that provides the current user to all components in the app.
 */
export const AuthContext = createContext();

/**
 * Hook to get the current user from the AuthContext
 * @returns { user, logout } The current user and the logout function
 */
export const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
};

/**
 * Provides the AuthContext to all child components. Also provides
 * the logout funtionality.
 *
 * Inside of your componets you can use the useAuthContext hook to get the user and logout function like so:
 *
 * @example
 * const { user, logout } = useAuthContext();
 *
 * @param {*} param0
 * @param {*} param0.children Child components
 * @returns AuthContext.Provider
 */
export const AuthProvider = ({ children }) => {
  const user = useTracker(() => Meteor.user(), []);
  const logout = useCallback(() => Meteor.logout(), []);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
