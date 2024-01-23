import ReactDom from "react-dom";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./Dialog";

type ModalProps = {
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

export const Modal = ({
  children,
  title,
  description,
  isOpen,
  onClose,
}: ModalProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const onChange = () => {
    if (isOpen) {
      onClose();
    }
  };

  return ReactDom.createPortal(
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div>
          {children}
        </div>
      </DialogContent>
    </Dialog>,
    document.body
  );
};
