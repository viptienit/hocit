import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
const ErrorPage = () => {
  const error = useRouteError();
  let title = "An error occurred !";
  let message = "Something went wrong !";
  if (error.status === 500) {
    message = error.data.message;
  }
  if (error.status === 404) {
    title = "not found!";
    message = "Could not find reaource or page.";
  }
  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};
export default ErrorPage;
