import FAQ from "@/components/homePageComponents/FAQ";
import Footer from "@/components/homePageComponents/Footer";
import LandingPageNavbar from "@/components/homePageComponents/LandingPageNavbar";
import NewsLetter from "@/components/homePageComponents/NewsLetter";
import HomePage from "@/views/HomePage";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const authenticated = await isAuthenticated();
  const user = await getUser();
  return (
    <main className="">
      <LandingPageNavbar authenticated={authenticated} user={user} />
      <HomePage />
      <FAQ />
      <NewsLetter />
      <Footer />
    </main>
  );
}
