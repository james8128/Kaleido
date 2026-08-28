import { createFileRoute } from "@tanstack/react-router";
import { KaleidoApp } from "@/components/kaleido/kaleido-app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <KaleidoApp />;
}
