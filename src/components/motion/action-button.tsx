"use client";

import type { VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import type { ComponentPropsWithoutRef, ForwardRefExoticComponent, RefAttributes } from "react";

import { buttonVariants } from "@/components/ui/button";
import { type AnimatedIconHandle, useAnimatedIcon } from "@/components/motion/use-animated-icon";
import { lift } from "@/lib/motion";
import { cn } from "@/lib/utils";

type AnimatedIcon = ForwardRefExoticComponent<
  { size?: number; className?: string } & RefAttributes<AnimatedIconHandle>
>;

type Common = VariantProps<typeof buttonVariants> & {
  /** a lucide-animated icon component (from src/components/animated-icons) */
  icon?: AnimatedIcon;
  iconSide?: "start" | "end";
  iconSize?: number;
  iconClassName?: string;
  /** turn off the hover lift (e.g. for icon-only or inline controls) */
  noLift?: boolean;
  className?: string;
  children?: React.ReactNode;
};

type AsLink = Common & { href: string } & Omit<ComponentPropsWithoutRef<typeof motion.a>, keyof Common | "href">;
type AsButton = Common & { href?: undefined } & Omit<ComponentPropsWithoutRef<typeof motion.button>, keyof Common>;

/**
 * shadcn Button look + Framer Motion hover lift + a lucide-animated icon that
 * plays while the whole control is hovered or focused. Renders <a> with `href`,
 * otherwise <button>.
 */
export function ActionButton(props: AsLink | AsButton) {
  const {
    icon: Icon,
    iconSide = "end",
    iconSize = 16,
    iconClassName,
    noLift,
    variant,
    size,
    className,
    children,
    ...rest
  } = props;
  const { ref, triggers } = useAnimatedIcon();

  const icon = Icon && <Icon ref={ref} size={iconSize} className={cn("flex shrink-0", iconClassName)} />;
  const content = (
    <>
      {iconSide === "start" && icon}
      {children}
      {iconSide === "end" && icon}
    </>
  );
  const shared = {
    ...(noLift ? {} : lift),
    ...triggers,
    // motion writes transform inline every frame; a CSS transition on it would lag
    className: cn(buttonVariants({ variant, size }), "transition-[color,background-color,border-color,box-shadow]", className),
  };

  if ("href" in rest && rest.href !== undefined) {
    return (
      <motion.a {...shared} {...(rest as ComponentPropsWithoutRef<typeof motion.a>)}>
        {content}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" {...shared} {...(rest as ComponentPropsWithoutRef<typeof motion.button>)}>
      {content}
    </motion.button>
  );
}
