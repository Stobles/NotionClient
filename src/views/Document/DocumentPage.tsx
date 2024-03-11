import { Editor } from "@/widgets/Editor";
import { Document } from "./UI/Document";

export const DocumentPage = ({
  params: { id },
}: {
  params: { id: string };
}) => {
  return (
    <>
      <Document id={id} />
    </>
  );
};
