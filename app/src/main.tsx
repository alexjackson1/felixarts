import ReactDOM from "react-dom";
import { ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./hooks/useAuth";
import { client } from "./app/apollo";

ReactDOM.render(
  <AuthProvider>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </AuthProvider>,
  document.getElementById("root")
);
