import Link from "next/link";

const SUPPORT_EMAIL = "support@insulinprimingdayssupply.com";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/app"
          className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Back
        </Link>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-cyan-700">
            Legal
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Terms of Use
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
            These terms govern the use of Insulin Days’ Supply with Priming. By
            using the Service you agree to the following conditions.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">1. Acceptance</h2>

            <p className="mt-3 text-slate-700 leading-7">
              By accessing or using Insulin Days’ Supply with Priming (the
              “Service”), you agree to these Terms of Use. If you do not agree
              with these terms, you should not use the Service.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              2. Intended Use
            </h2>

            <p className="mt-3 text-slate-700 leading-7">
              The Service is a professional support tool designed to assist
              healthcare professionals with calculation estimates related to
              medication day-supply documentation.
            </p>

            <p className="mt-3 text-slate-700 leading-7">
              The Service does not provide medical advice and should not be used
              as a substitute for professional judgment.
            </p>

            <p className="mt-3 text-slate-700 leading-7">
              Users are responsible for verifying all calculations against the
              prescription, manufacturer labeling, payer requirements, and
              applicable regulations.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-bold text-slate-900">
              3. Accuracy & Verification
            </h2>

            <p className="mt-3 text-slate-700 leading-7">
              By using this tool, you acknowledge that final responsibility for
              prescription verification, documentation, and dispensing decisions
              remains with the licensed dispensing professional.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              4. Subscriptions & Billing
            </h2>

            <p className="mt-3 text-slate-700 leading-7">
              If you purchase a subscription, billing and payment processing are
              handled by Stripe.
            </p>

            <p className="mt-3 text-slate-700 leading-7">
              Subscription details shown during checkout control pricing, trial
              duration, renewal terms, and billing intervals.
            </p>

            <p className="mt-3 text-slate-700 leading-7">
              Subscriptions may automatically renew unless canceled prior to the
              renewal date through the billing portal.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              5. Prohibited Uses
            </h2>

            <p className="mt-3 text-slate-700 leading-7">
              You agree not to misuse the Service, interfere with its operation,
              attempt to reverse engineer it, or use it for unlawful purposes.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              6. Limitation of Liability
            </h2>

            <p className="mt-3 text-slate-700 leading-7">
              To the maximum extent permitted by law, the Service is provided
              “as is” without warranties of any kind.
            </p>

            <p className="mt-3 text-slate-700 leading-7">
              The creators of the Service are not liable for damages arising
              from the use or inability to use the Service.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">7. Changes</h2>

            <p className="mt-3 text-slate-700 leading-7">
              We may update these Terms from time to time. Continued use of the
              Service after updates means you accept the revised Terms.
            </p>
          </section>

          <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-2xl font-bold text-amber-900">8. Contact</h2>

            <p className="mt-3 text-amber-800 leading-7">
              For support questions regarding the Service, contact:
              <br />
              <span className="font-semibold">{SUPPORT_EMAIL}</span>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
