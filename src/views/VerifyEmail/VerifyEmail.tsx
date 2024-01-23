import { Button } from "@/shared/UI/Button";
import { Title } from "@/shared/UI/Title";
import Image from "next/image";
import Link from "next/link";

const VerifySuccess = () => {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="w-[400px]">
        <Image
          fill
          className="!relative"
          src="/images/Auth/letter.svg"
          alt="letter"
        />
      </div>
      <Title>Вы успешно подтвердили свою почту.</Title>
      <Button asChild>
        <Link href="/login">Авторизоваться</Link>
      </Button>
    </div>
  );
};

export default VerifySuccess;
