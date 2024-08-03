import { Outlet, useNavigate } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

const Root = () => {
  // const navigate = useNavigate();
  // console.log(navigate.state);
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigate.state === "loading" && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
};
export default Root;
