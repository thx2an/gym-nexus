import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-[0_2px_8px_rgba(0,10,8,0.15)] border border-borderColor-light">

      <h1 className="text-2xl font-semibold text-text-strong text-center mb-4">
        Verify Your Email
      </h1>

      <p className="text-text-medium text-center mb-6">
        We have sent a verification link to your email.
      </p>

      <p className="text-center mt-6">
        <Link href="/auth/login" className="text-accent underline">
          Return to Login
        </Link>
      </p>

    </div>
  );
}
