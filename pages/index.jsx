import { decremented, incremented } from "@/src/store/features/counterSlice";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import Login from "./login";
import Register from "./register";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from 'next/router';
import MyHome from "./MyHome";

function Home() {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
     
      return ( router.push("/login"));
    }

    return children
  };

  return (
    <>
          <Head>
        <title>Boilerplate</title>
      </Head>
    {currentUser ? <MyHome /> :<div></div>}
    {!currentUser ? <Login/> : <div></div> }
    {/* <Login /> */}
    {/* <Register /> */}
    </>
  );
}

export default Home;
