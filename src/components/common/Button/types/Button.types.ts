import { PropsWithChildren } from "react";

export type ButtonProps = PropsWithChildren & {
  buttonClass?: string;
  onClick?: () => void;
};
