import Link from "next/link";

const SUPPORT_EMAIL = "elsabecrous@gmail.com";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-2xl p-6">
        <Link
          href="/app"
          className="select-none active:scale-[0.97] transition-transform px-4 py-2 rounded border border-slate-600 text-slate-100 hover:bg-slate-900"
        >
          Back
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
              The Service is a professional support tool that provides
              calculation estimates. It does not provide medical advice.
            </p>
            <p>
              You are responsible for verifying results against the
              prescription, labeling, payer rules, and professional judgment.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              3. Accuracy & Verification
            </h2>
            <p>
              By using this tool, you acknowledge that final responsibility for
              prescription verification and documentation remains with the
              dispensing professional.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              4. Subscriptions & Billing
            </h2>
            <p>
              If you purchase a subscription, billing is processed by Stripe.
              Terms shown at checkout control trial length, renewal, and price.
              Subscriptions may auto-renew unless canceled before renewal.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              5. Prohibited Uses
            </h2>
            <p>
              You agree not to misuse the Service, disrupt it, reverse engineer
              it, or use it unlawfully.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              6. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, the Service is provided
              “as is” without warranties of any kind. We are not liable for
              damages arising from use of the Service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              7. Changes
            </h2>
            <p>
              We may update these Terms from time to time. Continued use means
              you accept the updated Terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-extrabold text-slate-100">
              8. Contact
            </h2>
            <p>
              For support:{" "}
              <span className="font-semibold">{SUPPORT_EMAIL}</span>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
