import Link from "next/link";

export default function TermsPage() {
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
          Terms of Use
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="mt-6 space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-sm text-slate-200">
          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              1. Acceptance
            </h2>
            <p>
              By accessing or using Insulin Days’ Supply with Priming (the
              “Service”), you agree to these Terms of Use. If you do not agree,
              do not use the Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              2. Intended Use
            </h2>
            <p>
              The Service is intended for informational and professional support
              purposes only. It provides calculation estimates that may assist
              pharmacists and other healthcare professionals.
            </p>
            <p>
              <span className="font-semibold text-amber-200">
                No medical advice:
              </span>{" "}
              The Service does not provide medical advice and is not a
              substitute for clinical judgment, professional counseling, product
              labeling, or payer requirements.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              3. Accuracy & Verification
            </h2>
            <p>
              You are responsible for verifying all results against the
              prescription directions, product labeling, and applicable payer
              rules. You acknowledge that calculation results are estimates and
              may not apply to all scenarios.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              4. Subscriptions & Billing
            </h2>
            <p>
              If you purchase a subscription, billing is processed by Stripe.
              Subscription terms shown at checkout control the trial length,
              renewal period, and price. Subscriptions may auto-renew unless
              canceled before the renewal date.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              5. Prohibited Uses
            </h2>
            <p>
              You agree not to misuse the Service, attempt to disrupt it,
              reverse engineer it, or use it in a way that violates applicable
              laws or regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              6. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, the Service is provided
              “as is” without warranties of any kind. We are not liable for any
              damages arising from your use of the Service, including but not
              limited to indirect, incidental, or consequential damages.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              7. Changes
            </h2>
            <p>
              We may update these Terms from time to time. Continued use of the
              Service after changes means you accept the updated Terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              8. Contact
            </h2>
            <p>
              For support or questions, contact:{" "}
              <span className="font-semibold">support@yourdomain.com</span>{" "}
              (replace with your real support email).
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
