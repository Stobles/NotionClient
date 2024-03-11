import { useUpdateDocument } from "@/features/documents/update";
import { UploadButton } from "@/shared/libs/uploadthing";
import { ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { ClientUploadedFileData } from "uploadthing/types";

export const UploadCoverButton = ({ documentId }: { documentId: string }) => {
  const { update } = useUpdateDocument({ id: documentId });
  return (
    <UploadButton
      content={{
        button: ({ ready }) => {
          return (
            <div className="flex gap-1">
              <ImageIcon size={18} /> Change cover
            </div>
          );
        },
      }}
      endpoint="imageUploader"
      onClientUploadComplete={(
        res: ClientUploadedFileData<{ uploadedBy: string }>[],
      ) => {
        const filename = res[0].url;
        update({ coverImage: filename });
        toast.success("Изображение было успешно загружено");
      }}
      onUploadError={(error: Error) => {
        toast.error(error.message);
      }}
      className={`
                lg:opacity-0 lg:group-hover:opacity-100 transition-opacity
                text-sm ut-allowed-content:hidden ut-button:bg-white 
                ut-button:text-primary-second ut-button:h-fit ut-button:w-auto 
                ut-button:p-1 ut-button:rounded-sm ut-button:focus-within:ring-offset-0 ut-button:focus:ring-offset-0 ut-button:hover:bg-accent 
                ut-button:transition-colors ut-button:ut-uploading:after:bg-opacity-0
              `}
      onUploadBegin={(name) => {
        toast.info(`Изображение ${name} загружается. Подождите.`);
      }}
    />
  );
};
