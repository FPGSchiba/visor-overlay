import * as React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";

/*
Sentry.init({
    dsn: "https://b31050ea98c627dd0cf7bb5d75b7967a@o4507794910543872.ingest.de.sentry.io/4507804268036176",
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
    ],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    release: `home-automations-frontend@${project.version}`,
    environment: 'development',
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
*/

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
