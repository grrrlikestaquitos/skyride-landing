import { JoinBeta, SiteFooter } from "@/components/cta";
import { Hero } from "@/components/hero";
import { Pricing } from "@/components/pricing";
import {
  Coverage,
  Drivers,
  HowItWorks,
  Riders,
  Stack,
} from "@/components/sections";
import { SiteHeader } from "@/components/site-header";

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <HowItWorks />
        <Riders />
        <Drivers />
        <Pricing />
        <Coverage />
        <Stack />
        <JoinBeta />
      </main>
      <SiteFooter />
    </>
  );
}
