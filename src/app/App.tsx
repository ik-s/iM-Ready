import { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";

import { ConsentPage } from "../features/challenge/ConsentPage";
import { PhishingTrainingWarningPage } from "../features/challenge/PhishingTrainingWarningPage";
import { ServiceIntroPage } from "../features/challenge/ServiceIntroPage";
import { ShareLandingPage } from "../features/challenge/ShareLandingPage";
import { TrainingSetupPage } from "../features/challenge/TrainingSetupPage";
import { ActiveIncidentPage } from "../features/golden-time/ActiveIncidentPage";
import { EmergencyStartPage } from "../features/golden-time/EmergencyStartPage";
import { FollowUpPage } from "../features/golden-time/FollowUpPage";
import { GoldenTimeHomePage } from "../features/golden-time/GoldenTimeHomePage";
import { HistoryPage } from "../features/golden-time/HistoryPage";
import { IncidentTimelinePage } from "../features/golden-time/IncidentTimelinePage";
import { PaymentStopPage } from "../features/golden-time/PaymentStopPage";
import { RecordDetailPage } from "../features/golden-time/RecordDetailPage";
import { SituationAssessmentPage } from "../features/golden-time/SituationAssessmentPage";
import { TrainingReviewPage } from "../features/golden-time/TrainingReviewPage";
import { HomeReportPage } from "../features/home/HomeReportPage";

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
          path="/events/phishing-challenge/setup"
          element={<TrainingSetupPage />}
        />
        <Route
          path="/training/phishing/:trainingCode"
          element={<PhishingTrainingWarningPage />}
        />
        <Route path="/home" element={<HomeReportPage />} />
        <Route path="/golden-time" element={<GoldenTimeHomePage />} />
        <Route
          path="/golden-time/start"
          element={<EmergencyStartPage />}
        />
        <Route
          path="/golden-time/assessment"
          element={<SituationAssessmentPage />}
        />
        <Route
          path="/golden-time/payment-stop"
          element={<PaymentStopPage />}
        />
        <Route
          path="/golden-time/follow-up"
          element={<FollowUpPage />}
        />
        <Route
          path="/golden-time/incidents"
          element={<ActiveIncidentPage />}
        />
        <Route
          path="/golden-time/incidents/current"
          element={<IncidentTimelinePage />}
        />
        <Route
          path="/golden-time/history"
          element={<HistoryPage />}
        />
        <Route
          path="/golden-time/history/refund-report"
          element={<RecordDetailPage />}
        />
        <Route
          path="/golden-time/history/training-review"
          element={<TrainingReviewPage />}
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
