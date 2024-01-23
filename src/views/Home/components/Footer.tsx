import { Button } from "@/shared/UI/Button";
import Logo from "@/shared/UI/Logo";

export const Footer = () => {
  return (
    <div className="flex items-center w-full p-2 md:p-6 bg-background z-20 dark:bg-[#1F1F1F]">
      <Logo className="hidden md:flex" />
      <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-2 text-muted-foreground">
        <Button variant="ghost" size="sm" className="text-xs md:text-sm">
          Privacy Policy
        </Button>
        <Button variant="ghost" size="sm" className="text-xs md:text-sm">
          Terms & Conditions
        </Button>
      </div>
    </div>
  );
};
