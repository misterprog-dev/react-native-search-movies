import React from "react";
import { Provider } from "react-redux";
import Store from "./store/configure-store";
import Navigation from "./navigation/navigation";

export default function App() {
  return (
    <Provider store={Store}>
      <Navigation />
    </Provider>
  );
}
