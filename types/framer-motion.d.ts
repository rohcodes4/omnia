/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLMotionProps } from "framer-motion";

declare module "framer-motion" {
  export interface MotionProps extends HTMLMotionProps<any> {
    className?: string;
  }
}
