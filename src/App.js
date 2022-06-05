import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Wrapper } from "components-ui";
import useGeoRestriction from "hooks/useGeoRestriction";
import ErrorView from "views/error";
import { links } from "constants/app";

import Credit from "pages/credit";
import Stake from "pages/stake";
import Contacts from "pages/contacts";
import Vouchers from "pages/contacts/trusts-you";
import Governance from "pages/governance";
import Proposals from "pages/governance/proposals";
import Proposal from "pages/governance/proposal";
import Profile from "pages/profile";
import GetStartedPage from "pages/index";

import "./index.css";

function App() {
  const navigate = useNavigate();
  const restricted = useGeoRestriction();

  useEffect(() => {
    if (restricted) navigate("/geo-restricted");
  }, [restricted]);

  return (
    <Wrapper>
      <Routes>
        <Route path="/get-started" element={<GetStartedPage />} />
        <Route path="/credit" element={<Credit />} />
        <Route path="/stake" element={<Stake />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts/trusts-you" element={<Vouchers />} />
        <Route path="/profile/:address" element={<Profile />} />
        <Route path="/governance" element={<Governance />} />
        <Route path="/governance/proposals" element={<Proposals />} />
        <Route path="/governance/proposals/:hash" element={<Proposal />} />
        <Route
          path="/geo-restricted"
          element={
            <ErrorView
              title="Access restricted"
              content="You’re accessing Union from the United States or another restricted jurisdiction. Unfortunately we are unable to grant access to the full Union experience."
              buttons={[
                {
                  label: "Back to website",
                  href: links.website,
                  variant: "primary",
                },
                {
                  label: "Join Discord Community",
                  href: links.discord,
                  variant: "secondary",
                },
              ]}
            />
          }
        />
        <Route
          path="*"
          element={
            <ErrorView
              title="Oh no! You just came across an error."
              content="Something broke while you were using the app. Try reloading the page or use one of the helpful links below."
            />
          }
        />
      </Routes>
    </Wrapper>
  );
}

export default App;
