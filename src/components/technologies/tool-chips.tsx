"use client";

import { motion, type Variants } from "motion/react";

import { transitions } from "@/lib/motion";
import { toolGroups } from "@/lib/skills";

// dense chips get a smaller lift than buttons; the logo orb tips as feedback
const chip: Variants = { rest: { y: 0 }, hover: { y: -2 } };
const ico: Variants = { rest: { scale: 1, rotate: 0 }, hover: { scale: 1.12, rotate: -6 } };

export function ToolChips() {
  return (
    <div className="tool-groups">
      {toolGroups.map((g) => (
        <div key={g.group} className="tool-group">
          <span className="tool-label">{g.group}</span>
          <ul aria-label={g.group}>
            {g.items.map((t) => (
              <motion.li
                key={t.name}
                className="tool-chip"
                variants={chip}
                initial="rest"
                whileHover="hover"
                transition={transitions.press}
              >
                <motion.span className="tool-ico" variants={ico} transition={{ type: "spring", stiffness: 380, damping: 16 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- small logo */}
                  <img src={`/assets/icons/${t.src}`} alt="" loading="lazy" />
                </motion.span>
                <span className="tool-name">{t.name}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
