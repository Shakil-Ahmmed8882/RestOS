import { VariantProps } from "class-variance-authority";
import { headingVariants } from "../Heading";
import { HTMLAttributes } from "react";

export type HeadingProps = {
	children: React.ReactNode;
	className?: string;
} & VariantProps<typeof headingVariants> &
	Omit<HTMLAttributes<HTMLHeadingElement>, "color">;
