import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data"; // Hook für Meteor-Daten

const PrivateRoute = () => {
  const user = useTracker(() => Meteor.user());
  const location = useLocation(); // Aktuelle Route ermitteln

  // Falls der Benutzer nicht angemeldet ist, leite ihn zur Login-Seite weiter und speichere die Zielroute
  if (user === null) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Wenn der Benutzer angemeldet ist, render das angeforderte Ziel
  return <Outlet />;
};

export default PrivateRoute;