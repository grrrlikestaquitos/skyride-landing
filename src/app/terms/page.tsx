import type { Metadata } from "next";
import { LegalDocument, Mail, type LegalSection } from "@/components/legal";
import { legal, takeRatePercent } from "@/lib/legal";
import { pricing, site, usd } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The agreement between you and ${legal.entity} for using the ${site.name} app — fares, cancellations, driver and rider responsibilities, and dispute resolution.`,
  alternates: { canonical: "/terms" },
};

/*
  As with the Privacy Policy, every operational claim here is traceable to
  code, and the fare figures are imported from `site.ts` rather than typed in,
  so the Terms cannot quote a rate the app does not charge:

  - fare formula        → SkyRideServer src/util/trip-pricing.ts
  - tax                 → SkyRideServer src/controllers/payout-controller.ts
  - driver pay + floor  → SkyRideServer src/util/revenue-split.ts,
                          src/util/driver-pay-standard.ts
  - cancellation rules  → SkyRideServer src/controllers/ride-controller.ts,
                          src/controllers/driver-controller.ts
  - no payment movement → no payment provider is wired up in either codebase
*/

const sections: readonly LegalSection[] = [
  {
    id: "agreement",
    title: "This agreement",
    body: (
      <>
        <p>
          These Terms of Service are a contract between you and{" "}
          <strong>{legal.entityLong}</strong> (“Sky Ride”, “we”, “us”). They
          govern your use of the {site.name} app and this website.
        </p>
        <p>
          By creating an account or using {site.name}, you accept these Terms
          and our <a href="/privacy">Privacy Policy</a>. If you do not accept
          them, do not use the service.
        </p>
        <p>
          Please read <a href="#disputes">Resolving disputes</a> carefully. It
          requires most disputes to be resolved by individual arbitration and
          waives your right to a jury trial and to participate in a class
          action. You can opt out within 30 days.
        </p>
      </>
    ),
  },
  {
    id: "what-sky-ride-is",
    title: "What Sky Ride is — and is not",
    body: (
      <>
        <p>
          {site.name} is a technology platform. It lets riders schedule airport
          trips in advance and lets independent drivers claim the trips they
          want.
        </p>
        <p>
          <strong>
            We are not a transportation carrier, a taxi service, or a common
            carrier.
          </strong>{" "}
          We do not own vehicles and we do not employ drivers. When a driver
          accepts your trip, the agreement to carry you is between you and that
          driver. Our role is to introduce you, price the trip, and keep the
          record.
        </p>
      </>
    ),
  },
  {
    id: "beta",
    title: "The beta",
    body: (
      <>
        <p>
          {site.name} is currently distributed as a pre-release build through
          Apple’s TestFlight. It is a beta: features will change, things will
          break, and data may be reset. Availability is limited to the{" "}
          {site.region} and is not guaranteed.
        </p>
        <p>
          We may change, suspend or discontinue any part of the service at any
          time during the beta without liability to you.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Who may use it",
    body: (
      <>
        <p>To hold a {site.name} account you must:</p>
        <ul>
          <li>be at least 18 years old;</li>
          <li>be able to enter a binding contract;</li>
          <li>
            provide accurate information and keep it current — particularly, if
            you drive, your licence and vehicle details;
          </li>
          <li>hold one account, and not let anyone else use it.</li>
        </ul>
        <p>
          Children may travel as passengers on a trip booked by an adult account
          holder, who is responsible for them throughout.
        </p>
      </>
    ),
  },
  {
    id: "accounts",
    title: "Your account",
    body: (
      <>
        <p>
          You sign in with Apple. You are responsible for what happens under
          your account and for keeping access to your Apple ID and device
          secure. Tell us at <Mail address={legal.legalEmail} /> if you believe
          your account has been compromised.
        </p>
        <p>
          You can close your account at any time — see{" "}
          <a href="/privacy#deleting-your-account">the Privacy Policy</a>.
        </p>
      </>
    ),
  },
  {
    id: "booking",
    title: "Booking a trip",
    body: (
      <>
        <p>
          Trips are scheduled in advance, not hailed on demand. You choose the
          pickup and drop-off, the pickup time, and how many passengers, child
          seats and suitcases are coming. We show you the full fare before you
          confirm.
        </p>
        <p>
          A confirmed booking goes into an open pool where any eligible driver
          can claim it. <strong>A booking is not a guarantee that a driver will
          claim it</strong>, though we will tell you as soon as one does.
        </p>
        <p>
          You can edit a trip while it is still unclaimed. Editing re-prices the
          trip, so a change of address or timing may change the fare. Once a
          driver has claimed a trip, its details are fixed.
        </p>
      </>
    ),
  },
  {
    id: "fares",
    title: "Fares and taxes",
    body: (
      <>
        <p>
          Fares are calculated by the server, not estimated on your phone. The
          formula is:
        </p>
        <ul>
          <li>
            a distance charge of {usd(pricing.ratePerMile)} per mile, plus
          </li>
          <li>
            a time charge of {usd(pricing.ratePerMinute)} per minute, multiplied
            by a traffic factor that is <strong>capped</strong> between{" "}
            {pricing.minTrafficMultiplier.toFixed(1)}× and{" "}
            {pricing.maxTrafficMultiplier.toFixed(1)}×,
          </li>
          <li>
            with a minimum fare of {usd(pricing.minimumFare)} for any trip.
          </li>
        </ul>
        <p>
          There is no surge pricing. The capped traffic factor is the only thing
          that varies with conditions, and it can never more than double a
          trip’s time charge. Rates are set per region and may change, but{" "}
          <strong>
            the fare you are shown before confirming is the fare for that trip
          </strong>{" "}
          — it does not move afterwards unless you edit the booking.
        </p>
        <p>
          A fare may be raised above the formula where necessary to meet a legal
          minimum payment to the driver — see{" "}
          <a href="#driver-pay">Driver earnings</a>.
        </p>
        <h3>Tax</h3>
        <p>
          Where the pickup location falls in a jurisdiction that taxes these
          trips, tax is added on top of the fare at the rate in force when you
          book, and shown to you separately. We collect it in order to remit it;
          it is not our revenue. Where we cannot determine a taxing jurisdiction
          for a pickup, no tax is charged.
        </p>
        <p>All amounts are in US dollars.</p>
      </>
    ),
  },
  {
    id: "payment",
    title: "Payment",
    body: (
      <>
        <p>
          <strong>
            {site.name} does not currently process payments. The app does not
            collect card details and no charge is made through it.
          </strong>{" "}
          The fare shown is what the trip is priced at; settling it is arranged
          directly between the rider and the driver, and Sky Ride is not a party
          to that settlement and does not hold, transmit or guarantee any money
          between you.
        </p>
        <p>
          We intend to add in-app payment through a third-party payment
          processor. When we do, we will update these Terms and the{" "}
          <a href="/privacy">Privacy Policy</a> first, and you will be asked to
          accept the payment terms before any charge is made.{" "}
          <strong>
            Even then, card details will be held by the processor and not by us.
          </strong>
        </p>
      </>
    ),
  },
  {
    id: "cancellations",
    title: "Cancellations and no-shows",
    body: (
      <>
        <ul>
          <li>
            <strong>Riders</strong> can cancel a trip at any point before the
            driver starts it. <strong>There is no cancellation fee today.</strong>{" "}
            Once a trip is under way it cannot be cancelled in the app —
            speak to your driver, and contact us afterwards if something went
            wrong.
          </li>
          <li>
            <strong>Drivers</strong> can release a claimed trip back into the
            pool before starting it, which frees another driver to take it. A
            driver who has started a trip can cancel it if they must, for
            example for a safety reason or a breakdown.
          </li>
          <li>
            <strong>We</strong> can cancel a trip for safety, fraud, legal or
            operational reasons.
          </li>
        </ul>
        <p>
          Repeatedly cancelling late, or not being at the pickup, may cost you
          access to the service. If we later introduce cancellation, wait-time
          or no-show fees, we will tell you before they apply to you.
        </p>
      </>
    ),
  },
  {
    id: "rider-responsibilities",
    title: "If you ride",
    body: (
      <>
        <p>You agree to:</p>
        <ul>
          <li>
            give an accurate pickup address and be there at the scheduled time;
          </li>
          <li>
            book for the number of passengers and bags actually travelling — a
            driver may decline a trip that does not fit the vehicle;
          </li>
          <li>wear a seat belt and follow the law while in the vehicle;</li>
          <li>
            treat the driver and their vehicle with respect: no smoking, no
            damage, no illegal items, no threatening or discriminatory
            behaviour;
          </li>
          <li>
            pay for cleaning or repair if you damage or soil a vehicle.
          </li>
        </ul>
        <h3>Child seats</h3>
        <p>
          If you ask for child seats when booking, the driver is expected to
          bring them.{" "}
          <strong>
            You remain responsible for your child’s safety, for satisfying
            yourself that any seat is appropriate and correctly installed, and
            for complying with child-restraint law.
          </strong>{" "}
          If a suitable seat is not present, do not travel.
        </p>
      </>
    ),
  },
  {
    id: "driver-responsibilities",
    title: "If you drive",
    body: (
      <>
        <p>
          You are an <strong>independent contractor</strong>. You are not an
          employee, agent or partner of Sky Ride. You decide whether, when and
          which trips to accept, you supply your own vehicle, and you bear your
          own costs. Nothing here creates an employment relationship.
        </p>
        <p>You represent and warrant, on every trip, that you:</p>
        <ul>
          <li>
            hold a current, valid driver’s licence and are lawfully permitted to
            drive for hire;
          </li>
          <li>
            hold and maintain all insurance the law requires for carrying
            passengers for compensation, in the amounts required;
          </li>
          <li>
            hold every permit, licence or registration your city, county or
            state requires for this kind of work, including any
            transportation-network-company requirements;
          </li>
          <li>
            drive a registered, roadworthy, properly maintained vehicle that
            matches the one on your profile;
          </li>
          <li>
            have entered your licence and vehicle details truthfully and will
            keep them current;
          </li>
          <li>
            are not under the influence of alcohol or drugs, and will carry only
            the booked passengers.
          </li>
        </ul>
        <p>
          <strong>
            Driver information is self-reported. Sky Ride does not currently
            verify licences, insurance or driving records independently, and
            does not run criminal background checks.
          </strong>{" "}
          We may suspend or remove any driver at any time, including for expired
          or invalid credentials, safety reports, or a pattern of poor ratings.
        </p>
      </>
    ),
  },
  {
    id: "insurance",
    title: "Insurance",
    body: (
      <>
        <p>
          <strong>
            Sky Ride does not provide commercial automobile liability insurance
            or any other insurance covering trips arranged through the app.
          </strong>
        </p>
        <p>
          Drivers are solely responsible for carrying the insurance the law
          requires for transporting passengers for compensation. Drivers should
          be aware that a personal auto policy commonly excludes driving for
          hire. Riders should understand that any claim arising from a trip lies
          against the driver and their insurer.
        </p>
      </>
    ),
  },
  {
    id: "driver-pay",
    title: "Driver earnings",
    body: (
      <>
        <p>
          For each completed trip, a driver earns the fare less a platform fee,
          currently <strong>{takeRatePercent}</strong> of the fare. The fee can
          vary by market and may change over time; the one that applies is the
          one in force when the trip completes, and every trip’s fee is itemised
          in the driver’s earnings. Tax collected from the rider is never part
          of that split — it is held for remittance.
        </p>
        <p>
          Where the law sets a minimum payment per trip — as Washington does,
          per passenger minute and mile with a floor per trip — the driver
          receives at least that minimum. If the fare formula would not clear
          it, the rider’s fare is raised at booking so that it does, and if the
          trip runs longer than estimated, we absorb the difference rather than
          reduce the driver’s pay.
        </p>
        <p>
          Earnings appear in the app as they accrue and are batched for payout.{" "}
          <strong>
            No payouts are disbursed today: with no payment processor connected,
            the ledger records what is owed but no money moves.
          </strong>{" "}
          Disbursement begins when in-app payments launch, and we will give
          drivers notice and terms before it does.
        </p>
        <p>
          Drivers are responsible for their own taxes on what they earn. We do
          not withhold.
        </p>
      </>
    ),
  },
  {
    id: "ratings-and-content",
    title: "Ratings and comments",
    body: (
      <>
        <p>
          Riders can rate a trip and leave a comment. You keep ownership of what
          you write, and you grant us a worldwide, royalty-free licence to host,
          store, display and use it to operate and improve the service —
          including showing a driver’s aggregate rating to riders.
        </p>
        <p>You must not post anything that is:</p>
        <ul>
          <li>false, defamatory, harassing, threatening or abusive;</li>
          <li>
            discriminatory on the basis of race, religion, sex, gender identity,
            sexual orientation, disability, age or national origin;
          </li>
          <li>
            someone’s personal information — an address, phone number or licence
            plate;
          </li>
          <li>unlawful, obscene, or an infringement of anyone’s rights.</li>
        </ul>
        <p>
          <strong>
            We do not tolerate objectionable content or abusive users.
          </strong>{" "}
          Report anything that breaks these rules to{" "}
          <Mail address={legal.legalEmail} />. We review reports and act within
          24 hours, removing content and ejecting the user who posted it where
          the report is well-founded. We may remove content or suspend an
          account at our discretion.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: (
      <>
        <p>You must not:</p>
        <ul>
          <li>use {site.name} for anything unlawful, or to transport anything unlawful;</li>
          <li>
            impersonate anyone, use another person’s account, or let another
            person drive on your account;
          </li>
          <li>
            book trips you do not intend to take, or manipulate fares, ratings,
            earnings or the trip pool;
          </li>
          <li>
            scrape, reverse engineer, decompile, or attempt to gain unauthorised
            access to any part of the service;
          </li>
          <li>
            interfere with the service’s operation, security or availability;
          </li>
          <li>
            record another person in the vehicle without their consent where the
            law requires it.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "suspension",
    title: "Suspension and termination",
    body: (
      <>
        <p>
          You may stop using {site.name} and close your account at any time. We
          may suspend or terminate your access, with notice where practical and
          immediately where a safety, fraud or legal risk requires it, if you
          breach these Terms or if we discontinue the service.
        </p>
        <p>
          Terminating your account does not cancel obligations already incurred
          — a fare owed, or a payout due — and the sections that by their nature
          should survive do survive: <a href="#disclaimers">Disclaimers</a>,{" "}
          <a href="#liability">Limitation of liability</a>,{" "}
          <a href="#indemnity">Indemnity</a>,{" "}
          <a href="#disputes">Resolving disputes</a> and{" "}
          <a href="#governing-law">Governing law</a>.
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    title: "Apple and other third parties",
    body: (
      <>
        <p>
          The app is distributed through Apple.{" "}
          <strong>
            Apple is not a party to these Terms and has no responsibility for
            the app or its content.
          </strong>{" "}
          Apple has no obligation to provide any maintenance or support for it.
          If the app fails to conform to any applicable warranty, you may notify
          Apple and Apple will refund the purchase price, if any; Apple has no
          other warranty obligation. Apple is not responsible for addressing any
          claim relating to the app, including product liability, regulatory
          compliance, or intellectual-property claims. Apple and its
          subsidiaries are third-party beneficiaries of these Terms and may
          enforce them against you.
        </p>
        <p>
          You must also comply with any applicable third-party terms —
          including Apple’s App Store and TestFlight terms — and you confirm you
          are not located in a country subject to a US embargo or on a
          prohibited-parties list.
        </p>
        <p>
          The app uses Apple Maps for addresses and routing, and Google’s
          Firebase for push notifications. Your carrier’s data charges are yours.
        </p>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: (
      <>
        <p>
          <strong>
            {site.name} is provided “as is” and “as available”, without warranty
            of any kind.
          </strong>{" "}
          To the fullest extent the law allows, we disclaim all warranties,
          express or implied, including merchantability, fitness for a
          particular purpose, and non-infringement.
        </p>
        <p>In particular, we do not warrant that:</p>
        <ul>
          <li>a driver will be available for any trip you book;</li>
          <li>
            a driver will arrive at the scheduled time, or that any trip will
            take the estimated time;
          </li>
          <li>
            <strong>you will reach the airport in time for your flight.</strong>{" "}
            Traffic, weather and road conditions are outside our control. Build
            in the margin you would build in for any other journey, and do not
            rely on {site.name} as your only means of making a flight;
          </li>
          <li>
            the service will be uninterrupted, secure or error-free, or that
            estimates of distance, duration or arrival are accurate.
          </li>
        </ul>
        <p>
          <strong>
            We do not screen drivers or riders beyond what is described in these
            Terms.
          </strong>{" "}
          You are responsible for exercising your own judgement about the people
          you travel with.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: (
      <>
        <p>
          To the fullest extent permitted by law, Sky Ride and its members,
          officers and employees will not be liable for any indirect,
          incidental, special, consequential, exemplary or punitive damages,
          including lost profits, lost data,{" "}
          <strong>missed flights, missed connections, or lost baggage</strong>,
          whether or not we were told such damages were possible.
        </p>
        <p>
          To the fullest extent permitted by law, our total liability to you for
          all claims arising out of or relating to these Terms or the service is
          limited to the greater of{" "}
          <strong>
            one hundred US dollars ($100) or the total fares you paid through
            the service in the six months before the event giving rise to the
            claim
          </strong>
          .
        </p>
        <p>
          We are not liable for the acts or omissions of any driver or rider, or
          for anything that happens during a trip. Some jurisdictions do not
          allow the exclusion of certain warranties or liabilities, so parts of
          this section may not apply to you; nothing here limits liability for
          death or personal injury caused by our negligence, or for fraud, where
          the law does not permit that limit.
        </p>
      </>
    ),
  },
  {
    id: "indemnity",
    title: "Indemnity",
    body: (
      <p>
        You agree to indemnify and hold Sky Ride harmless from any claim,
        liability, loss or expense (including reasonable legal fees) arising out
        of your use of the service, your breach of these Terms, your violation
        of any law or of anyone’s rights, or — if you drive — your operation of
        a vehicle and the transportation you provide.
      </p>
    ),
  },
  {
    id: "disputes",
    title: "Resolving disputes",
    body: (
      <>
        <h3>Talk to us first</h3>
        <p>
          If you have a problem, email <Mail address={legal.legalEmail} /> and
          describe it. Most things are fixable. Neither of us may start
          arbitration until 30 days after that first written notice.
        </p>
        <h3>Arbitration</h3>
        <p>
          If we cannot resolve it, you and Sky Ride agree that any dispute
          arising out of or relating to these Terms or the service will be
          resolved by <strong>binding individual arbitration</strong>,
          administered by the American Arbitration Association under its
          Consumer Arbitration Rules, before one arbitrator. Arbitration will
          take place in {legal.jurisdiction} or, at your election, in the county
          where you live, or by telephone or video.{" "}
          <strong>
            You and we are each giving up the right to a jury trial.
          </strong>
        </p>
        <h3>No class actions</h3>
        <p>
          <strong>
            Claims may be brought only in your individual capacity, not as a
            plaintiff or class member in any class, collective or representative
            proceeding.
          </strong>{" "}
          The arbitrator may not consolidate claims or preside over a class. If
          this paragraph is found unenforceable, the whole of this “Resolving
          disputes” section is void.
        </p>
        <h3>Small claims</h3>
        <p>
          Either of us may instead bring an individual claim in small-claims
          court if it qualifies.
        </p>
        <h3>How to opt out</h3>
        <p>
          <strong>
            You can opt out of arbitration and the class-action waiver.
          </strong>{" "}
          Email <Mail address={legal.legalEmail} /> within 30 days of first
          accepting these Terms, saying that you opt out and giving the name on
          your account. Opting out costs you nothing and changes nothing else.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: (
      <p>
        These Terms are governed by the laws of the State of{" "}
        {legal.jurisdiction}, without regard to its conflict-of-laws rules. For
        any dispute not subject to arbitration, you and we submit to the
        exclusive jurisdiction of the state and federal courts located in{" "}
        {legal.jurisdiction}. None of this deprives you of the protection of
        mandatory consumer-protection law in the state where you live.
      </p>
    ),
  },
  {
    id: "general",
    title: "General",
    body: (
      <ul>
        <li>
          These Terms and the <a href="/privacy">Privacy Policy</a> are the
          entire agreement between us about the service.
        </li>
        <li>
          If any provision is unenforceable, the rest stays in force.
        </li>
        <li>
          Our not enforcing a provision is not a waiver of it.
        </li>
        <li>
          You may not assign these Terms; we may assign them in connection with
          a merger, acquisition or sale of assets.
        </li>
        <li>
          Nothing here makes either of us the other’s agent, partner, employee
          or joint venturer.
        </li>
      </ul>
    ),
  },
  {
    id: "changes",
    title: "Changes to these Terms",
    body: (
      <p>
        We may update these Terms as the product changes, and will change the
        effective date at the top when we do. If a change is material — a new
        fee, a change to how fares or payouts work, a change to how{" "}
        <a href="#disputes">disputes are resolved</a> — we will give you notice
        in the app or by email before it takes effect. Continuing to use{" "}
        {site.name} after that means you accept the updated Terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <>
        <p>
          Legal notices, disputes and reports of objectionable content:{" "}
          <Mail address={legal.legalEmail} />
        </p>
        <p>
          Privacy requests: <Mail address={legal.privacyEmail} />
        </p>
        <p>{legal.entityLong}</p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      lead={`The agreement between you and ${legal.entity} — what we do, what we don't, how fares work, and who is responsible for what.`}
      summary={
        <ul>
          <li>
            We connect riders with independent drivers. We are not a
            transportation carrier and we do not employ drivers.
          </li>
          <li>
            The fare you are quoted is the fare you pay. No surge, and the
            traffic factor is capped at{" "}
            {pricing.maxTrafficMultiplier.toFixed(1)}×.
          </li>
          <li>
            The app does not take payment yet, and no payouts are disbursed yet.
          </li>
          <li>
            Riders can cancel free of charge until the driver starts the trip.
          </li>
          <li>
            Disputes go to individual arbitration, with no class actions — and
            you can opt out within 30 days.
          </li>
        </ul>
      }
      sections={sections}
    />
  );
}
