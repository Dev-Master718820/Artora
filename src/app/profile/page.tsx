import { PortfolioArtistProfile } from "@/components/artists/portfolio-profile";
import { mainArtist } from "@/data/alpana-barthakur";
export const metadata = {
  title: "Alpana Barthakur — Artist Profile",
  description:
    "Explore paintings by Alpana Barthakur, an artist based in Hillsborough, New Jersey.",
};
export default function Page() {
  return <PortfolioArtistProfile artist={mainArtist} ownProfile />;
}
