"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useAnimate, useReducedMotion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SendIcon } from "@/components/animated-icons/send";
import { useAnimatedIcon } from "@/components/motion/use-animated-icon";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { duration, easeOutExpo, lift } from "@/lib/motion";
import { cn } from "@/lib/utils";

export const CONTACT_EMAIL = "kvncrlacebuche@gmail.com";

const schema = z.object({
  name: z.string().trim().min(1),
  email: z.email(),
  message: z.string().trim().min(1),
});
type Values = z.infer<typeof schema>;

const NOTE_DEFAULT = "This opens your email app with the message pre-filled.";
const NOTE_ERROR = "Please fill in your name, a valid email, and a message.";
const NOTE_OK = `Opening your email app. If nothing happens, email me directly at ${CONTACT_EMAIL}`;

/** Opens the visitor's email app with a pre-filled message (no backend). */
export function ContactForm() {
  const [note, setNote] = useState<{ text: string; kind?: "error" | "ok" }>({ text: NOTE_DEFAULT });
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema), mode: "onSubmit", reValidateMode: "onSubmit" });
  const { ref: sendRef, triggers: sendTriggers } = useAnimatedIcon();
  const [scope, animate] = useAnimate<HTMLFormElement>();
  const reduceMotion = useReducedMotion();

  // a short, small shake on the fields that failed — skipped under reduced motion
  const onInvalid = () => {
    setNote({ text: NOTE_ERROR, kind: "error" });
    if (reduceMotion) return;
    requestAnimationFrame(() => {
      const bad = scope.current?.querySelectorAll('[aria-invalid="true"]');
      if (bad?.length) animate(bad, { x: [0, -5, 5, -3, 3, 0] }, { duration: 0.3, ease: "easeOut" });
    });
  };

  const onValid = ({ name, email, message }: Values) => {
    const subject = `[Portfolio] Message from ${name}`;
    const body = `${message}\n\n—\n${name}\n${email.trim()}`;
    sendRef.current?.startAnimation();
    window.location.assign(`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setNote({ text: NOTE_OK, kind: "ok" });
  };

  // typing into a flagged field clears its error, like the legacy form
  const field = (name: keyof Values) =>
    register(name, {
      onChange: () => {
        clearErrors(name);
        setNote((n) => (n.kind === "error" ? { text: NOTE_DEFAULT } : n));
      },
    });

  return (
    <form
      ref={scope}
      noValidate
      onSubmit={(e) => handleSubmit(onValid, onInvalid)(e)}
      className="grid gap-4 rounded-card border border-white/12 bg-white/6 p-6 max-[540px]:p-[1.4rem]"
    >
      <div className="grid gap-1.5">
        <Label htmlFor="cf-name" className="contact-label">
          Your name
        </Label>
        <Input
          id="cf-name"
          type="text"
          autoComplete="name"
          placeholder="Juan dela Cruz"
          aria-invalid={!!errors.name || undefined}
          className="contact-input"
          {...field("name")}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="cf-email" className="contact-label">
          Your email
        </Label>
        <Input
          id="cf-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email || undefined}
          className="contact-input"
          {...field("email")}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="cf-message" className="contact-label">
          Message
        </Label>
        <Textarea
          id="cf-message"
          rows={5}
          placeholder="Hi Kevin, I saw Daywell and..."
          aria-invalid={!!errors.message || undefined}
          className="contact-input contact-textarea"
          {...field("message")}
        />
      </div>
      <motion.button
        type="submit"
        {...lift}
        {...sendTriggers}
        className={cn(
          buttonVariants({ variant: "brand", size: "pill" }),
          "w-full bg-white py-[0.95rem] text-brand-deep shadow-none transition-[color,background-color] hover:bg-sage-2"
        )}
      >
        Send email
        <SendIcon ref={sendRef} size={16} className="grid" />
      </motion.button>
      <p aria-live="polite" className="relative min-h-[1.2em] text-center text-[0.8rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={note.text}
            className={cn(
              "block",
              note.kind === "error" ? "text-[#ffb4ad]" : note.kind === "ok" ? "text-[#a8e6c1]" : "text-white/65"
            )}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0, transition: { duration: duration.state, ease: easeOutExpo } }}
            exit={{ opacity: 0, y: -2, transition: { duration: duration.feedback, ease: "easeIn" } }}
          >
            {note.text}
          </motion.span>
        </AnimatePresence>
      </p>
    </form>
  );
}
