"use client";

import { DocumentTitle } from "./DocumentTitle";
import { useDocumentByIdQuery } from "@/entities/document";
import { EmojiPopover } from "@/features/documents/update/UI/EmojiPopover";
import Image from "next/image";
import { UploadCoverButton } from "./UploadCoverButton";
import { Editor } from "@/widgets/Editor";
import { useUpdateDocument } from "@/features/documents/update";
import { useDebounce } from "@/shared/hooks/useDebounce";
import { useEffect, useState } from "react";
import { DocumentEditor } from "./DocumentEditor";

export const Document = ({ id }: { id: string }) => {
  const { data: document, isFetched } = useDocumentByIdQuery(id);

  const title = document?.title || "";

  const isCoverImage = !!document?.coverImage;

  return (
    <div className="w-full h-full">
      {isCoverImage && (
        <div className="relative w-full h-[280px] overflow-hidden z-10">
          <Image
            fill
            className="w-full h-full"
            objectFit="cover"
            objectPosition="center"
            src={document?.coverImage || ""}
            alt="cover_image"
          />
        </div>
      )}
      <div
        className={`relative flex flex-col items-center w-full max-w-[800px] h-full mx-auto z-50 px-2`}
      >
        <div
          className={`flex flex-col gap-2 w-full max-w-[690px] justify-end group -translate-y-10 ${
            isCoverImage ? "h-[150px]" : "h-[250px]"
          }`}
        >
          <div className="flex flex-col items-start gap-2">
            <EmojiPopover size="xl" id={id} icon={document?.icon || ""} />
            <UploadCoverButton documentId={id} />
          </div>
          {title && <DocumentTitle id={id} title={title} />}
        </div>
        <div className="w-full">
          {isFetched && (
            <DocumentEditor id={id} content={document?.content || ""} />
          )}
        </div>
      </div>
    </div>
  );
};
