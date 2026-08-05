import type { Metadata } from "next";
import { LegalDocument, Mail, type LegalSection } from "@/components/legal";
import { legal } from "@/lib/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, shares and retains personal information, and how to exercise your privacy rights.`,
  alternates: { canonical: "/privacy" },
};

/*
  Written against what the software actually does, not against a template.
  Every claim below is traceable to code:

  - collection      → SkyRide/Networking/DTOs.swift, SkyRideServer database/migrations/
  - location        → SkyRide/Reusable/Location/DriverLocationProvider.swift
                      SkyRideServer src/stores/ride-store.ts (appendLocationHistory)
  - what each party → DriverProfileSummaryDTO / RiderProfileSummaryDTO
    sees
  - sharing         → SkyRideServer src/services/notification-service.ts (FCM)
                      SkyRideServer src/api-interfaces/apple-auth.ts (JWKS only)
  - no payments     → no payment SDK exists in either codebase

  If one of those changes, this document is wrong until it is changed too.
*/

const sections: readonly LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          {site.name} is operated by <strong>{legal.entityLong}</strong> (“Sky
          Ride”, “we”, “us”). We run a scheduled airport-ride platform serving
          the {site.region}.
        </p>
        <p>
          This policy covers the {site.name} iOS app and this website. It
          explains what we collect, why we collect it, who else sees it, how
          long we keep it, and what you can ask us to do about it. Questions or
          requests go to <Mail address={legal.privacyEmail} />.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: (
      <>
        <h3>Account information</h3>
        <p>
          You sign in with Apple. We receive and store the stable identifier
          Apple issues for your account, your first and last name, and your
          email address. If you use Apple’s Hide My Email, we only ever see the
          relay address, and that is fine — we do not need your real one.
        </p>
        <p>
          Riders can also set a preferred in-car temperature, which is shown to
          the driver so the car is comfortable when it arrives.
        </p>

        <h3>Driver information</h3>
        <p>If you drive, we additionally collect:</p>
        <ul>
          <li>
            your driver’s licence number, issuing state and expiry date, as you
            enter them;
          </li>
          <li>
            your vehicle’s make, model, year, colour and licence plate, and
            which vehicle is your default;
          </li>
          <li>
            your availability status and your average rating from completed
            trips.
          </li>
        </ul>

        <h3>Trip information</h3>
        <p>
          For every ride you book or accept we store the pickup and drop-off
          place name, full street address and coordinates, the postal code of
          the pickup, the scheduled pickup time, the number of passengers,
          child seats and suitcases, the estimated distance and duration, and
          the fare, tax and total.
        </p>

        <h3>Driver location while driving</h3>
        <p>
          <strong>Only drivers’ locations are collected, and only during a
          trip.</strong> When a driver opens an accepted trip, the app reports
          latitude, longitude, altitude, accuracy, speed, heading and a
          timestamp so the rider can watch the car approach the curb. See{" "}
          <a href="#location">Location, in detail</a> below, including why the
          app asks for “Always” permission.
        </p>
        <p>
          <strong>We never read a rider’s device location.</strong> Pickup and
          drop-off addresses come from what the rider types and picks from
          search results, not from the phone’s GPS.
        </p>

        <h3>Ratings and comments</h3>
        <p>
          After a trip a rider can leave a 1–5 star rating and an optional
          written comment. Both are stored against the trip, the rider and the
          driver.
        </p>

        <h3>Device and notification data</h3>
        <p>
          If you allow notifications, we store the push token your device
          issues and the platform it belongs to, so we can tell you a driver
          has claimed your ride or that your pickup is an hour away.
        </p>

        <h3>Server logs</h3>
        <p>
          Our servers keep operational logs of requests and errors. These can
          include a trip’s pickup postal code or coordinates — for example when
          a pickup falls outside every tax jurisdiction we know about and we
          need to find out why.
        </p>

        <h3>Diagnostics from the Firebase SDK</h3>
        <p>
          The app embeds Google’s Firebase SDK to deliver push notifications.
          The measurement component bundled with that SDK can collect
          app-instance diagnostics such as a per-install identifier, device
          model, operating system version, and app opens. We do not use this
          data to build a profile of you, we do not use it for advertising, and
          we do not join it to your ride history.
        </p>
      </>
    ),
  },
  {
    id: "what-we-dont-collect",
    title: "What we don’t collect",
    body: (
      <>
        <p>
          It is worth being specific, because a ride-hailing app could
          reasonably be assumed to collect all of this and we do not:
        </p>
        <ul>
          <li>
            <strong>No payment details.</strong> The app does not process
            payments today, so we have never held a card number, a bank
            account, or a payout account. See{" "}
            <a href="/terms#payment">the Terms</a> for how fares work in the
            meantime.
          </li>
          <li>
            <strong>No government identifiers</strong> beyond a driver’s
            licence number — no Social Security or tax identification number,
            no passport, no date of birth.
          </li>
          <li>
            <strong>No photographs or documents.</strong> The app never asks
            for camera or photo library access; profile pictures are drawn from
            your initials.
          </li>
          <li>
            <strong>No contacts, microphone, calendar, or health data.</strong>{" "}
            We do not collect consumer health data as defined by the Washington
            My Health My Data Act.
          </li>
          <li>
            <strong>No advertising identifiers and no ad tracking.</strong> The
            app does not ask for permission to track you across other companies’
            apps and websites, because it does not.
          </li>
          <li>
            <strong>No rider location.</strong> As above — a rider’s device
            location is never requested or read.
          </li>
          <li>
            <strong>No information about children.</strong> A rider says how
            many child seats a trip needs. That is a number; we collect no name,
            age or other detail about anyone riding with you.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "How we use it",
    body: (
      <>
        <p>We use the information above to:</p>
        <ul>
          <li>
            create and maintain your account, and let you sign back in to the
            same one;
          </li>
          <li>
            quote a fare, apply the correct tax for the pickup location, book a
            trip, and offer it to drivers;
          </li>
          <li>
            show a rider where their driver is, and tell each side what the
            other needs to know to meet at the curb;
          </li>
          <li>
            send trip notifications and reminders before a scheduled pickup;
          </li>
          <li>
            calculate what a driver earned, including any legally required
            per-trip minimum, and keep the earnings record;
          </li>
          <li>
            investigate safety reports, disputed trips, fraud and abuse, and
            enforce <a href="/terms">our Terms</a>;
          </li>
          <li>
            meet tax, accounting and other legal obligations;
          </li>
          <li>
            fix problems and improve the service.
          </li>
        </ul>
        <p>
          Where the law requires a legal basis for processing, ours is the
          performance of our contract with you, our legitimate interest in
          operating and securing the service, and compliance with legal
          obligations.
        </p>
      </>
    ),
  },
  {
    id: "what-the-other-party-sees",
    title: "What the other party in your trip sees",
    body: (
      <>
        <p>
          Riders and drivers see deliberately little of each other. The app
          shares only what getting into the right car requires.
        </p>
        <ul>
          <li>
            <strong>A rider sees</strong> their driver’s first name and last
            initial, their rating, and the vehicle’s make, model, colour and
            plate — plus the driver’s live position once the trip is under way.
          </li>
          <li>
            <strong>A driver sees</strong> the rider’s first name and last
            initial, their preferred in-car temperature, the pickup and
            drop-off addresses, and the passenger, child-seat and luggage
            counts.
          </li>
        </ul>
        <p>
          Full names, email addresses, licence numbers and account identifiers
          are never shown to the other party.
        </p>
      </>
    ),
  },
  {
    id: "who-we-share-with",
    title: "Who else we share with",
    body: (
      <>
        <p>
          <strong>
            We do not sell your personal information, and we do not share it for
            cross-context behavioural advertising.
          </strong>{" "}
          We have never done either, and there is no advertising business here
          to tempt us. Outside the trip itself, information leaves us in only
          these circumstances:
        </p>
        <ul>
          <li>
            <strong>Google (Firebase Cloud Messaging)</strong> delivers our push
            notifications. Google receives your device’s push token, the text of
            the notification and the trip’s identifier. Notification text is
            kept short and generic, though a notification offering a new trip to
            drivers does name the pickup place.
          </li>
          <li>
            <strong>Apple.</strong> Sign in with Apple is verified against
            Apple’s public keys — we send Apple nothing about you in the
            process. Separately, when you search for an address or the app draws
            a route, your device talks to Apple Maps directly, under Apple’s
            privacy policy rather than ours.
          </li>
          <li>
            <strong>Our hosting and database providers</strong>, who store the
            data on our behalf under contract and may not use it for their own
            purposes.
          </li>
          <li>
            <strong>A payment processor</strong>, once in-app payments launch.
            We will update this policy before that happens.
          </li>
          <li>
            <strong>Law enforcement, regulators or other parties</strong> where
            we are legally required to, or where we believe in good faith it is
            necessary to protect someone’s safety or investigate fraud or a
            serious violation of our Terms.
          </li>
          <li>
            <strong>An acquirer</strong>, if the business or its assets are
            merged, acquired or transferred. We will tell you before your
            information becomes subject to a different policy.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "location",
    title: "Location, in detail",
    body: (
      <>
        <p>
          This is the most sensitive thing we handle, so here is exactly how it
          works.
        </p>
        <h3>Whose location</h3>
        <p>
          Drivers’ only, and only while they are working a trip. The app asks a
          driver for location access the first time they open an accepted trip
          — never at launch, and never of a rider.
        </p>
        <h3>Why “Always”</h3>
        <p>
          iOS offers “While Using the App” and “Always”. A driver’s phone
          spends most of a trip locked, in a cradle, or showing turn-by-turn
          directions in another app. Under “While Using the App” the rider’s map
          would freeze the moment that happened. The app therefore asks for
          “Always” so tracking survives the screen locking — not so we can
          follow drivers around off the clock. Reporting starts when a trip is
          opened and stops when it ends.
        </p>
        <h3>What is stored</h3>
        <p>
          Two things: the driver’s current position, which is overwritten with
          each update and is what the rider’s map reads; and a trail of the
          reported points for the trip. The trail exists so that we can
          reconstruct what happened if there is a safety incident, a disputed
          fare, or an insurance claim. <strong>Riders are shown the current
          position only, never the trail.</strong>
        </p>
        <h3>Your control</h3>
        <p>
          You can revoke location permission at any time in iOS Settings.
          Drivers who do so can still use the app, but riders will not be able
          to see them approaching, and we may not be able to resolve a dispute
          in the driver’s favour without it.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <>
        <p>Our retention schedule:</p>
        <ul>
          <li>
            <strong>Account record</strong> — for as long as your account is
            open, then deleted or de-identified within 30 days of a verified
            deletion request, except where a category below requires otherwise.
          </li>
          <li>
            <strong>Trip records</strong>, including addresses, coordinates,
            fares and tax — <strong>seven years</strong>, because they are tax
            and business records.
          </li>
          <li>
            <strong>Driver earnings and payout records</strong> — seven years,
            for the same reason.
          </li>
          <li>
            <strong>Driver location trails</strong> —{" "}
            <strong>twelve months</strong> from the end of the trip, then
            deleted.
          </li>
          <li>
            <strong>Ratings and comments</strong> — for the life of the account.
            After an account is deleted we may keep the rating in a form that no
            longer identifies who left it, so a driver’s average is not
            retroactively distorted.
          </li>
          <li>
            <strong>Push tokens</strong> — until you sign out, uninstall the
            app, or the token goes stale.
          </li>
          <li>
            <strong>Server logs</strong> — up to 90 days, other than logs
            preserved for a specific security or legal investigation.
          </li>
        </ul>
        <p>
          Where we are required to keep something for a legal, tax, audit or
          dispute-resolution reason, we keep only that, and only for as long as
          the obligation lasts.
        </p>
      </>
    ),
  },
  {
    id: "your-choices",
    title: "Your choices",
    body: (
      <>
        <ul>
          <li>
            <strong>Location and notifications</strong> are permissions you grant
            and can withdraw in iOS Settings at any time.
          </li>
          <li>
            <strong>Hide My Email.</strong> Sign in with Apple lets you keep your
            real address from us entirely. We support the relay address as a
            first-class one.
          </li>
          <li>
            <strong>Your profile</strong> — name, temperature preference, vehicles
            — is editable in the app.
          </li>
          <li>
            <strong>Notifications about trips</strong> are the only messages we
            send. We do not send marketing email.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your privacy rights",
    body: (
      <>
        <p>
          Depending on where you live — including California, Colorado,
          Connecticut, Virginia and Washington — you may have the right to:
        </p>
        <ul>
          <li>know what personal information we hold about you and get a copy;</li>
          <li>correct information that is wrong;</li>
          <li>delete your information;</li>
          <li>receive it in a portable format;</li>
          <li>
            not be discriminated against for exercising any of these rights;
          </li>
          <li>appeal if we turn a request down.</li>
        </ul>
        <p>
          Email <Mail address={legal.privacyEmail} /> from the address on your
          account, or tell us enough to match your request to it. We will
          confirm receipt promptly and respond within 45 days, and will tell you
          if we need a further 45 days. We do not charge for this, and we will
          not ask you for more information than we need to verify who you are.
        </p>
        <p>
          If we decline a request we will say why, and you can appeal by
          replying to that email. If you are still unsatisfied you may complain
          to your state attorney general.
        </p>
        <p>
          An authorised agent may act for you if they provide written proof of
          authority.
        </p>
      </>
    ),
  },
  {
    id: "deleting-your-account",
    title: "Deleting your account",
    body: (
      <>
        <p>
          Email <Mail address={legal.privacyEmail} /> from the address on your
          account and ask us to delete it. We will confirm and complete the
          deletion within 30 days.
        </p>
        <p>What deletion does:</p>
        <ul>
          <li>your account, profile and driver details are removed;</li>
          <li>
            you can no longer sign in, and signing in with Apple again creates a
            new, empty account;
          </li>
          <li>your push tokens are deleted and notifications stop;</li>
          <li>
            trip and earnings records are retained for the periods set out in{" "}
            <a href="#retention">How long we keep it</a>, with your identity
            removed from them wherever the record does not legally require it;
          </li>
          <li>
            ratings you left may remain, no longer attributed to you.
          </li>
        </ul>
        <p>
          If you would rather step away without deleting, ask us to deactivate
          instead — signing in again reactivates the account with everything
          intact.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    body: (
      <>
        <p>
          Traffic between the app and our servers is encrypted in transit.
          Sign-in tokens are held in the iOS Keychain, and the token that
          authorises requests is short-lived. Access to production data is
          limited to those who need it to run the service. The app is built to
          hand each side of a trip the minimum it needs about the other, which
          is a security measure as much as a privacy one.
        </p>
        <p>
          No system is perfectly secure, and we will not pretend otherwise. If
          we discover a breach affecting your personal information we will
          notify you and the relevant regulators as the law requires. If you
          believe you have found a vulnerability, please write to{" "}
          <Mail address={legal.privacyEmail} /> — we would rather hear it from
          you.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: (
      <>
        <p>
          {site.name} is for adults. You must be 18 or older to hold an account,
          and the service is not directed to children. We do not knowingly
          collect personal information from anyone under 18; if we learn we
          have, we delete it.
        </p>
        <p>
          Children may of course travel as passengers on a trip booked by an
          adult account holder, who remains responsible for them. We collect
          nothing about those passengers beyond the number of child seats
          required.
        </p>
        <p>
          If you believe a child has given us personal information, contact{" "}
          <Mail address={legal.privacyEmail} />.
        </p>
      </>
    ),
  },
  {
    id: "where-data-lives",
    title: "Where your data lives",
    body: (
      <p>
        {site.name} operates in the United States and our service providers
        store data there. If you use the app from outside the United States,
        you are sending your information to the United States, where privacy
        law differs from your own country’s.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We will update this policy when the product changes, and we will change
        the effective date at the top when we do. If a change materially affects
        how we handle your information, we will tell you in the app or by email
        before it takes effect. Continuing to use {site.name} after that means
        you accept the updated policy.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact us",
    body: (
      <>
        <p>
          Privacy questions and requests: <Mail address={legal.privacyEmail} />
        </p>
        <p>
          Everything else, including legal notices:{" "}
          <Mail address={legal.legalEmail} />
        </p>
        <p>{legal.entityLong}</p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      lead={`What ${site.name} collects, why, who else sees it, and how to make us delete it.`}
      summary={
        <ul>
          <li>
            We collect what a ride needs: who you are, where you are going, and
            — for drivers — licence, vehicle and location while driving.
          </li>
          <li>
            We do not sell your information, run advertising, or track you
            across other apps.
          </li>
          <li>
            We do not process payments yet, so we have never held your card
            details.
          </li>
          <li>
            A rider’s device location is never read. A driver’s is, but only
            during a trip.
          </li>
          <li>
            Sign in with Apple works with Hide My Email — we do not need your
            real address.
          </li>
        </ul>
      }
      sections={sections}
    />
  );
}
