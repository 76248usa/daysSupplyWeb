import Link from "next/link";

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
            This policy explains what information is collected and how it is
            used when you access Insulin Days’ Supply with Priming.
          </p>
        </section>

        <div className="mt-8 space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">1. Summary</h2>
            <p className="mt-3 text-slate-700 leading-7">
              We value your privacy. This policy describes what information we
              collect and how we use it when you use Insulin Days’ Supply with
              Priming.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              2. Information We Collect
            </h2>

            <div className="mt-4 space-y-4 text-slate-700 leading-7">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="font-semibold text-emerald-900">
                  A) We do not collect patient information.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="font-semibold text-emerald-900">
                  B) We do not sell personal information.
                </p>
              </div>

              <p>
                If you purchase a subscription, Stripe may collect payment
                information, such as card details, directly. We do not receive
                your full payment card information.
              </p>

              <p>
                If you enter an email address to begin checkout, we use it to
                initiate checkout and to associate your subscription with your
                access. If login features are used, this information may also be
                used for authentication.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-2xl font-bold text-slate-900">
              3. How We Use Information
            </h2>

            <p className="mt-3 text-slate-700 leading-7">
              We use information only to:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
              <li>Provide and maintain access to subscription features</li>
              <li>Process payments through Stripe</li>
              <li>Respond to support requests</li>
              <li>Improve reliability and security</li>
            </ul>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">4. Sharing</h2>
            <p className="mt-3 text-slate-700 leading-7">
              We do not sell user information. We share limited information with
              service providers only as needed to operate the Service, such as
              Stripe for payment processing.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              5. Data Retention
            </h2>
            <p className="mt-3 text-slate-700 leading-7">
              We retain subscription-related records as needed to provide access
              and comply with legal or accounting requirements. We do not store
              patient data.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">6. Security</h2>
            <p className="mt-3 text-slate-700 leading-7">
              We take reasonable measures to protect information. However, no
              method of transmission or storage is 100% secure.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              7. Children’s Privacy
            </h2>
            <p className="mt-3 text-slate-700 leading-7">
              The Service is not directed to children under 13 and is intended
              for professional use.
            </p>
          </section>

          <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-2xl font-bold text-amber-900">8. Contact</h2>
            <p className="mt-3 text-amber-800 leading-7">
              Questions about this policy? Email:{" "}
              <span className="font-semibold">
                support@insulinprimingdayssupply.com
              </span>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
