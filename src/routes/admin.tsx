import { createFileRoute } from "@tanstack/react-router";
import { AdminRatingsPage } from "./admin-ratings";

export const Route = createFileRoute("/admin")({ component: AdminRatingsPage });