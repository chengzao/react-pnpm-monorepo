import { useRouteError, Link } from 'react-router-dom';

export default function ErrorPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const error: any = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <Link to="/">CLick Me to Go Home!</Link>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
}
