import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-[0_2px_8px_rgba(0,10,8,0.15)] border border-borderColor-light my-8">

      <h1 className="text-2xl font-semibold text-text-strong text-center mb-4">
        Verify Your Email
      </h1>

      <p className="text-text-medium text-center mb-6">
        Thank you for registering with <strong>GymNexus</strong>! <br />
        We have sent a verification link to your email address. <br />
        Please check your inbox (and spam folder) to activate your account.
      </p>

      <div className="text-center mt-8">
        <Link
          href="/auth/login"
          className="inline-block px-6 py-2 rounded-full bg-btnPrimary text-white font-medium hover:bg-btnPrimary-hover transition"
          style={{ backgroundColor: "#8d9cbcff", color: "#ffffff" }}
        >
          Return to Login
        </Link>
      </div>

    </div>
  );
}
