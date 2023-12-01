import "regenerator-runtime"; // TODO: Try to add this in some other way. Check vite configs or babel or something else...

import ReactDOM from "react-dom/client";

import App from "App";

import GlobalProvider from "context/GlobalProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
);
