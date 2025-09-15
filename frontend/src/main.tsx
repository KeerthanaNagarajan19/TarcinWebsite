// import { createRoot } from "react-dom/client";
// import App from "./App";
// import "./index.css";
// import { I18nProvider } from "./hooks/use-translations";

// createRoot(document.getElementById("root")!).render(
//   <I18nProvider>
//     <App />
//   </I18nProvider>
// );

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { I18nProvider } from "./hooks/use-translations";
import { BrowserRouter } from "react-router-dom"; // ✅ Add this

createRoot(document.getElementById("root")!).render(
  <BrowserRouter> {/* ✅ Wrap here */}
    <I18nProvider>
      <App />
    </I18nProvider>
  </BrowserRouter>
);
