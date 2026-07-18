import { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";

import { ConsentPage } from "../features/challenge/ConsentPage";
import { ServiceIntroPage } from "../features/challenge/ServiceIntroPage";
import { ShareLandingPage } from "../features/challenge/ShareLandingPage";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path="/invites/phishing-challenge/:inviteCode"
          element={<ShareLandingPage />}
        />
        <Route
          path="/events/phishing-challenge/intro"
          element={<ServiceIntroPage />}
        />
        <Route
          path="/events/phishing-challenge/consent"
          element={<ConsentPage />}
        />
        <Route
          path="*"
          element={
            <Navigate to="/invites/phishing-challenge/demo" replace />
          }
        />
      </Routes>
    </>
  );
}
