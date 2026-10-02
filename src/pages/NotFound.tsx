import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex min-h-screen items-center justify-center bg-background">
    <div className="text-center">
      <h1 className="font-display mb-4 text-4xl font-bold">404</h1>
      <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
      <Link to="/" className="text-primary underline hover:text-primary/80">
        Return to Home
      </Link>
    </div>
  </div>
);

export default NotFound;
