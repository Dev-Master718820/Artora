import { Suspense } from "react";
import { Marketplace } from "@/components/artwork/marketplace";
export const metadata = { title: "Discover Original Artworks" };
export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container page-content">
          <div className="skeleton" />
        </div>
      }
    >
      <Marketplace />
    </Suspense>
  );
}
