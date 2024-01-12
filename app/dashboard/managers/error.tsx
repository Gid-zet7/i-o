"use client";
import ErrorPage from "@/components/Error";

export default function ErrorBoundry({ error }: { error: Error }) {
  return (
    <>
      <ErrorPage error={error} />
    </>
  );
}
