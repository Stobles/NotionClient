import Logo from "@/shared/UI/Logo";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-orange-100/10">
      <nav className="w-full max-w-[1300px] py-5 px-4">
        <Logo />
      </nav>
      <main className="w-full max-w-[1200px] px-4 flex flex-1 items-center justify-center pt-4">{children}</main>
    </div>
  );
};
