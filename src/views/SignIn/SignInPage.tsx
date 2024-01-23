import { GoogleButton } from "@/features/auth/UI/GoogleButton";
import { SignInForm } from "@/features/auth/UI/SignInForm";
import { Title } from "@/shared/UI/Title";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="w-full h-full flex items-center flex-col">
      <Title className="mb-6 text-center">Вход</Title>
      <div className="w-full max-w-[320px] flex items-center flex-col">
        <div className="w-full">
          <div className="w-full">
            <SignInForm />
          </div>
          <div className="w-full h-[42px] flex items-center justify-center">
            <div className="w-full h-[1px] border-b-[1px] border-slate-300" />
          </div>
        </div>
        <div className="w-full">
          <GoogleButton />
        </div>
        <div className="w-full md:w-[490px] text-center mt-6 text-[12px] text-stone-400">
          <p className="mb-0">
            By clicking “Continue with Google/Email” above, you acknowledge that
            you have read and understood, and agree to Notion&apos;s{" "}
            <Link href="/" className="underline hover:text-red-400">
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link href="/" className="underline hover:text-red-400">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
