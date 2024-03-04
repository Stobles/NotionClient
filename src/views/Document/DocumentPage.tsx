import { Document } from "./components/Document";

export const DocumentPage = ({
  params: { id },
}: {
  params: { id: string };
}) => {
  return (
    <div>
      <Document id={id} />
    </div>
  );
};
