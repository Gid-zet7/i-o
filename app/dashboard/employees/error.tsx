"use client";
import ErrorPage from "@/components/Error";

export default function ErrorBoundry({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <>
      <ErrorPage error={error} />
    </>
  );
}
