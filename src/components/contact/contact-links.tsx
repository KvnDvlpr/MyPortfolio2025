"use client";

import { Mail } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

import { ArrowUpRightIcon } from "@/components/animated-icons/arrow-up-right";
import { FacebookIcon } from "@/components/animated-icons/facebook";
import { GithubIcon } from "@/components/animated-icons/github";
import { LinkedinIcon } from "@/components/animated-icons/linkedin";
import { MapPinIcon } from "@/components/animated-icons/map-pin";
import { PhoneIcon } from "@/components/animated-icons/phone";
import { type AnimatedIconHandle, useAnimatedIcon } from "@/components/motion/use-animated-icon";
import { transitions } from "@/lib/motion";
import { site } from "@/lib/site";

import { CONTACT_EMAIL } from "./contact-form";

const links = [
  { icon: "mail", label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { icon: "phone", label: "Phone", value: "+63 936 195 5464", href: "tel:+639361955464" },
  {
    icon: "pin",
    label: "Location",
    value: "Rizal, Philippines",
    href: "https://www.google.com/maps/place/Rizal,+Philippines",
    external: true,
  },
] as const;

const socials = [
  { icon: GithubIcon, label: "GitHub", href: site.github },
  { icon: LinkedinIcon, label: "LinkedIn", href: site.linkedin },
  { icon: FacebookIcon, label: "Facebook", href: site.facebook },
];

/** Email / phone / location rows: the whole row drives its icon and the corner arrow. */
export function ContactLinks() {
  return (
    <ul className="grid gap-2">
      {links.map((link) => (
        <li key={link.label}>
          <ContactRow {...link} />
        </li>
      ))}
    </ul>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: (typeof links)[number]["icon"];
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  const iconRef = useRef<AnimatedIconHandle>(null);
  const arrowRef = useRef<AnimatedIconHandle>(null);
  const start = () => {
    iconRef.current?.startAnimation();
    arrowRef.current?.startAnimation();
  };
  const stop = () => {
    iconRef.current?.stopAnimation();
    arrowRef.current?.stopAnimation();
  };

  return (
    <motion.a
      href={href}
      {...(external && { target: "_blank", rel: "noopener" })}
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      whileTap={{ scale: 0.99 }}
      variants={{ rest: { x: 0 }, hover: { x: 4 } }}
      transition={transitions.press}
      onHoverStart={start}
      onHoverEnd={stop}
      onFocus={start}
      onBlur={stop}
      className="contact-link flex items-center gap-3.5 rounded-[14px] border border-white/10 bg-white/6 px-4 py-3 text-white max-[540px]:gap-3 max-[540px]:px-[0.85rem] max-[540px]:py-3"
    >
      <span className="contact-ico grid size-[42px] flex-none place-items-center rounded-xl max-[540px]:size-[38px]">
        {icon === "mail" ? (
          // no animated mail icon exists; the envelope tips up instead
          <motion.span
            className="grid"
            variants={{ rest: { rotate: 0, y: 0 }, hover: { rotate: -10, y: -1 } }}
            transition={transitions.press}
          >
            <Mail className="size-[19px]" />
          </motion.span>
        ) : icon === "phone" ? (
          <PhoneIcon ref={iconRef} size={19} className="grid" />
        ) : (
          <MapPinIcon ref={iconRef} size={19} className="grid" />
        )}
      </span>
      <span className="grid min-w-0 gap-px">
        <span className="text-[0.72rem] tracking-[0.1em] text-sage-2 uppercase">{label}</span>
        <span className="text-[0.95rem] font-medium [overflow-wrap:anywhere] max-[540px]:text-[0.88rem]">{value}</span>
      </span>
      <ArrowUpRightIcon ref={arrowRef} size={16} className="contact-go ml-auto grid text-white/50 max-[540px]:hidden" />
    </motion.a>
  );
}

/** GitHub / LinkedIn / Facebook chips. */
export function SocialLinks() {
  return (
    <ul className="flex flex-wrap gap-2">
      {socials.map((s) => (
        <li key={s.label}>
          <SocialChip {...s} />
        </li>
      ))}
    </ul>
  );
}

function SocialChip({ icon: Icon, label, href }: (typeof socials)[number]) {
  const { ref, triggers } = useAnimatedIcon();
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener"
      whileHover={{ y: -2 }}
      whileFocus={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.97 }}
      transition={transitions.press}
      {...triggers}
      className="contact-social inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 py-2.5 pr-4 pl-3 text-[0.88rem] font-semibold text-white"
    >
      <Icon ref={ref} size={18} className="grid" />
      {label}
    </motion.a>
  );
}
