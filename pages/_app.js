import store from "@/src/store";
import { Provider } from "react-redux";
import "@/styles/globals.scss";
import { AuthContextProvider } from "../context/AuthContext";
import { ChatContextProvider } from "../context/ChatContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ChatContextProvider>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
    </ChatContextProvider>
    </AuthContextProvider>
  );
}
