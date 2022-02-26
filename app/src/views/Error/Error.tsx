import { useNavigate } from "react-router-dom";
import { Button, Result } from "antd";

enum ErrorType {
  NotFound = 404,
  NotAuthorised = 403,
  InternalError = 500,
}

function errorTitle(type: ErrorType) {
  switch (type) {
    case ErrorType.NotAuthorised:
      return "Not Authorised";
    case ErrorType.NotFound:
      return "Not Found";
    case ErrorType.InternalError:
      return "Internal Error";
    default:
      return type;
  }
}

function errorSubTitle(type: ErrorType) {
  switch (type) {
    case ErrorType.NotAuthorised:
      return "Sorry, you are not authorised to access this page.";
    case ErrorType.NotFound:
      return "Sorry, this page could not be found.";
    case ErrorType.InternalError:
      return "Sorry, something went wrong internally. Our bad.";
    default:
      return type;
  }
}

function Error({ type = 404 }: { type: ErrorType }) {
  const navigate = useNavigate();

  const extra = [];
  if (type === ErrorType.NotAuthorised)
    extra.push(
      <Button key="err_login_btn" type="primary">
        Login
      </Button>
    );
  if (type === ErrorType.InternalError)
    extra.push(
      <Button key="err_reload_btn" type="primary">
        Reload
      </Button>
    );
  extra.push(
    <Button key="err_home_btn" onClick={() => navigate("/")}>
      Back Home
    </Button>
  );

  return (
    <Result status={type} title={errorTitle(type)} subTitle={errorSubTitle(type)} extra={extra} />
  );
}

export default Error;
