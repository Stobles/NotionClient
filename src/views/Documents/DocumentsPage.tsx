"use client";

import { useCreateDocument } from "@/features/documents/create";
import { Button } from "@/shared/UI/Button";
import { PlusCircle } from "lucide-react";
import Image from "next/image";

const DocumentsPage = () => {
  const { create } = useCreateDocument();
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        width="300"
        height="300"
        src="/images/Documents/empty.png"
        className=""
        alt="empty"
      ></Image>
      <h2 className="text-lg font-medium">Welcome to yours Stobletion</h2>
      <Button onClick={() => create({ title: "Untitled" })}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
