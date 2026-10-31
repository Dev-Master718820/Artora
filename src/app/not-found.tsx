import { EmptyState } from "@/components/shared/ui";
export default function NotFound() {
  return (
    <div className="container page-content">
      <EmptyState
        title="A little off the beaten path."
        description="This page has wandered out of the gallery. Let's find you something lovely."
        href="/"
        label="Back to Artora"
      />
    </div>
  );
}
