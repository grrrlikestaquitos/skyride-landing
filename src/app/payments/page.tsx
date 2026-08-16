import type { Metadata } from "next";
import { SiteFooter } from "@/components/cta";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Managing your payment method",
  description: `How ${site.name} stores the card you save, when it is charged, and how to remove it.`,
  alternates: { canonical: "/payments" },
};

/*
  This page exists because Apple requires it.

  When the app saves a card through Apple Pay it asks Apple for a *merchant
  token* rather than the default device-bound one, so the saved method survives
  the rider getting a new iPhone. Asking is `PKDeferredPaymentRequest`
  (SkyRide/Experiences/RiderApp/Payments/ApplePay.swift), and that class has a
  non-optional `managementURL` — a merchant token comes with a promise that the
  holder can find and delete it. This URL is what fills that field.

  Two consequences worth knowing before editing:

  - The URL is stored WITH THE TOKEN in the rider's Wallet, at the moment the
    card is saved. Moving or deleting this page does not update tokens already
    issued; it just breaks the "manage" link for everyone who saved a card
    before the change. Treat /payments as permanent.
  - It is reached by direct link from Wallet, not by browsing the site, which is
    why it is not in the footer nav. It is in the sitemap so it stays crawlable.

  Deliberately NOT a LegalDocument: that component stamps "Legal" and an
  effective date, and this is an instruction page, not a term of service. What
  is binding lives in /terms.

  Every claim below is traceable to code:

  - what is stored     → SkyRideServer database/migrations/…_payments-and-billing.js
                         ('payment-customers': customerId, cardBrand, cardLast4)
  - charge timing      → SkyRideServer src/controllers/driver-controller.ts
                         (off-session charge at ride completion)
  - removal            → SkyRide/Experiences/RiderApp/RiderAccountScreen/PaymentsScreen.swift
  - cancellation fee   → SkyRide/Reusable/TripPricing/CancellationFeePolicy.swift
                         (24 hours, and only once a driver has accepted)
*/

export default function PaymentsPage() {
  return (
    <>
      {/* anchorBase="/" because the header and footer nav point at sections of
          the landing page, which do not exist here. */}
      <SiteHeader anchorBase="/" />

      <main id="main">
        <article className="shell py-16 lg:py-24">
          <header className="max-w-2xl">
            <p className="eyebrow">
              <span className="h-px w-6 bg-line" aria-hidden="true" />
              Payments
            </p>
            <h1 className="mt-5 text-4xl leading-[1.08] font-semibold tracking-[-0.035em] sm:text-5xl">
              Managing your payment method
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted">
              You can see, replace or remove the card saved for {site.name} at
              any time, from inside the app. Here is where it lives and what it
              is used for.
            </p>
          </header>

          <div className="legal mt-16 max-w-2xl">
            <section id="remove">
              <h2>Removing or replacing your card</h2>
              <p>
                Open the {site.name} app and go to{" "}
                <strong>Account → Payments</strong>. Your saved card is listed
                there with its brand and last four digits.
              </p>
              <ul>
                <li>
                  <strong>Remove</strong> takes it off your account. Nothing can
                  be charged to it afterwards.
                </li>
                <li>
                  <strong>Add payment method</strong> replaces it. {site.name}{" "}
                  keeps one card on file, so saving a new one takes over from
                  the old.
                </li>
              </ul>
              <p>
                If you saved your card with Apple Pay, you can also remove it
                from the Wallet app on your iPhone — open the card, then the
                merchant listing for {site.name}. Removing it there stops future
                charges in the same way.
              </p>
            </section>

            <section id="stored">
              <h2>What we store</h2>
              <p>
                Your card number is never sent to {site.name}. It goes to our
                payment processor, Stripe, which returns a token that only works
                for charging your rides. What we keep alongside it is the card
                brand, its last four digits and its expiry — enough to show you
                which card is on file, and not enough to use anywhere else.
              </p>
            </section>

            <section id="charges">
              <h2>When you are charged</h2>
              <p>
                <strong>After your ride ends</strong>, not when you book. The
                amount is the metered fare plus tax, and it appears on your
                receipt in the app under Account → Payments.
              </p>
              <p>
                Saving a card at booking is an authorization to charge it later,
                which is why the Apple Pay sheet shows an estimated fare and a
                date rather than taking payment there and then. The final amount
                can differ from the estimate — a changed destination or a longer
                route than quoted — and the receipt always shows what was
                actually charged.
              </p>
            </section>

            <section id="cancellations">
              <h2>Cancellations</h2>
              <p>
                Cancelling is free until 24 hours before your pickup. Inside
                that window, a cancellation fee applies only if a driver has
                already accepted your trip and set the time aside — the app
                tells you before you confirm, and the fee is charged to the card
                on file. Cancelling a trip no driver has taken is free however
                late it is.
              </p>
              <p>
                The full terms are in our <a href="/terms">Terms of Service</a>.
              </p>
            </section>

            <section id="help">
              <h2>Questions about a charge</h2>
              <p>
                Write to <a href="mailto:support@skyride.app">support@skyride.app</a>{" "}
                with the date of the ride and we will look it up. If you think a
                charge is wrong, say so — we would rather refund a disputed fare
                than argue about one.
              </p>
            </section>
          </div>
        </article>
      </main>

      <SiteFooter anchorBase="/" />
    </>
  );
}
