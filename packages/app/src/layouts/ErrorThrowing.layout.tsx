import { ErrorThrowingView } from "../views/ErrorThrowing.view";
import { LayoutFallback } from "../fallbacks/Layout.fallback";
import { ErrorBoundary } from "react-error-boundary";

const ErrorThrowingLayout = () => {
  return (
    <ErrorBoundary FallbackComponent={LayoutFallback}>
      <ErrorThrowingView />
    </ErrorBoundary>
  );
};

export default ErrorThrowingLayout;
