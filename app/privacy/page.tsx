import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-2xl p-6">
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
        >
          ← Back
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="mt-6 space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-sm text-slate-200">
          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              1. Summary
            </h2>
            <p>
              We value your privacy. This policy describes what information we
              collect and how we use it when you use Insulin Days’ Supply with
              Priming.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              2. Information We Collect
            </h2>
            <p className="font-semibold text-slate-100">
              A) We do not collect patient information.
            </p>
            <p className="font-semibold text-slate-100">
              B) We do not sell personal information.
            </p>
            <p>
              If you purchase a subscription, Stripe may collect payment
              information (such as card details) directly. We do not receive
              your full payment card information.
            </p>
            <p>
              If you enter an email address to begin checkout, we use it to
              initiate checkout and to associate your subscription with your
              access. (If you later add login, this may be used for
              authentication.)
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              3. How We Use Information
            </h2>
            <p>We use information only to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-200">
              <li>Provide and maintain access to subscription features</li>
              <li>Process payments through Stripe</li>
              <li>Respond to support requests</li>
              <li>Improve reliability and security</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              4. Sharing
            </h2>
            <p>
              We do not sell user information. We share limited information with
              service providers only as needed to operate the Service (e.g.,
              Stripe for payment processing).
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              5. Data Retention
            </h2>
            <p>
              We retain subscription-related records as needed to provide access
              and comply with legal/accounting requirements. We do not store
              patient data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              6. Security
            </h2>
            <p>
              We take reasonable measures to protect information. However, no
              method of transmission or storage is 100% secure.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              7. Children’s Privacy
            </h2>
            <p>
              The Service is not directed to children under 13 and is intended
              for professional use.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              8. Contact
            </h2>
            <p>
              Questions about this policy? Email:{" "}
              <span className="font-semibold">support@yourdomain.com</span>{" "}
              (replace with your real support email).
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
