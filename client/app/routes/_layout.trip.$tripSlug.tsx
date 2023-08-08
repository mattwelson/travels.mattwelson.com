import { Outlet } from "@remix-run/react";

// Renders the "page" type or the "country" type
export default function TripPage() {
  return <Outlet />;
}
