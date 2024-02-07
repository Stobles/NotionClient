import Tippy from "@tippyjs/react";
import { useMediaQuery } from "usehooks-ts";

export declare type Placement =
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "right-start"
  | "right-end"
  | "left-start"
  | "left-end";

export const Tooltip = ({
  children,
  title,
  text,
  placement = "right-start",
}: {
  children: React.ReactElement;
  title: string;
  text?: string;
  placement?: Placement;
}) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  return (
    <>
      {!isMobile ? (
        <Tippy
          content={
            <div className="text-xs">
              <h6>{title}</h6>
              <div className="text-primary-second">{text}</div>
            </div>
          }
          placement={placement}
        >
          {children}
        </Tippy>
      ) : (
        children
      )}
    </>
  );
};
