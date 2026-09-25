import { Camera, Monitor, Piano, type LucideIcon } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

import { BookTextIcon } from "@/components/animated-icons/book-text";
import { FlameIcon } from "@/components/animated-icons/flame";
import { GraduationCapIcon } from "@/components/animated-icons/graduation-cap";
import { PenToolIcon } from "@/components/animated-icons/pen-tool";
import { UsersIcon } from "@/components/animated-icons/users";
import type { AnimatedIconHandle } from "@/components/motion/use-animated-icon";

export type AnimatedIcon = ForwardRefExoticComponent<
  { size?: number; className?: string } & RefAttributes<AnimatedIconHandle>
>;

/** lucide-animated where a version exists, plain lucide otherwise */
export type DeckIcon = { animated: AnimatedIcon } | { static: LucideIcon };

export type DeckCard = {
  image: string;
  icon: DeckIcon;
  label: string;
  title: string;
  meta?: string;
  text: string;
};

export const deckCards: DeckCard[] = [
  {
    image: "/assets/background/education.jpg",
    icon: { animated: GraduationCapIcon },
    label: "Education",
    title: "BS Electronics Engineering",
    meta: "University of Rizal System Morong · Class of 2025",
    text: "Circuits and signal theory gave me the fundamentals. My thesis, an AI-based eggplant leaf disease detector on a Raspberry Pi, is where software won me over.",
  },
  {
    image: "/assets/background/passion.jpg",
    icon: { animated: FlameIcon },
    label: "What drives me",
    title: "Tools that help people live their days on purpose.",
    text: "Calm design, readable code, products that make ordinary days better. Daywell started as a personal need: one place for work, studies, and my walk with God.",
  },
  {
    image: "/assets/background/leader.jpg",
    icon: { animated: UsersIcon },
    label: "Born to be a leader",
    title: "I step up when a group needs direction.",
    text: "In school projects I was usually the one setting the plan, splitting the work, and making sure everyone crossed the line together. I like owning outcomes, not just tasks.",
  },
  {
    image: "/assets/background/techy.jpg",
    icon: { static: Monitor },
    label: "I love being techy",
    title: "New tools, new gadgets, new ways to build.",
    text: "I read changelogs for fun, try every new framework release, and take things apart to see how they work. Curiosity is the engine behind everything I ship.",
  },
  {
    image: "/assets/background/media.jpg",
    icon: { static: Camera },
    label: "Taking pictures & video",
    title: "I see the frame before I press the shutter.",
    text: "Photos and video taught me composition, light and timing. It is the same eye I bring to a layout: what to show, what to leave out, where the attention should land.",
  },
  {
    image: "/assets/background/piano.jpg",
    icon: { static: Piano },
    label: "Off the keyboard, on the keys",
    title: "I play piano.",
    text: "Music taught me patience and repetition long before code did. Practicing a piece until it flows is the same discipline as refactoring until it reads clean.",
  },
  {
    image: "/assets/background/design.jpg",
    icon: { animated: PenToolIcon },
    label: "The part I enjoy most",
    title: "I love design.",
    text: "Typography, spacing, color. I sketch the interface before I write a line of code, and I care how the empty state looks as much as the happy path.",
  },
  {
    image: "/assets/background/faith.jpg",
    icon: { animated: BookTextIcon },
    label: "Faith & focus",
    title: "Consistency over intensity.",
    text: "A verse in the morning, one clear list for the day, and the discipline to show up again tomorrow. That rhythm is why Daywell exists.",
  },
];
