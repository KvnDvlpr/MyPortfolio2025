/**
 * Hand-drawn doodles for the section backgrounds, all on a 120×120 grid and
 * drawn as open strokes so they can "pencil in" with pathLength. `fill` paths
 * are shaded areas (piano black keys, lens glass) rather than outlines.
 */
export type Doodle = { paths: string[]; fill?: string[]; dashed?: string[] };

const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${r * 2} 0 a${r} ${r} 0 1 0 ${-r * 2} 0`;

export const doodles = {
  graduationCap: {
    paths: [
      "M8 44 C 26 36, 44 29, 60 22 C 76 29, 94 36, 112 44 C 94 51, 76 58, 60 64 C 44 58, 26 51, 8 44 Z",
      "M30 53 C 30 60, 30 66, 31 72 C 44 82, 76 82, 89 72 C 90 66, 90 60, 90 53",
      "M60 43 C 74 46, 86 49, 98 52 C 98 62, 98 70, 97 80",
      "M92 80 C 93 86, 95 91, 97 95 C 99 91, 101 86, 102 80 C 99 79, 95 79, 92 80",
    ],
  },
  diploma: {
    paths: [
      "M26 34 C 50 33, 74 33, 96 34 C 104 35, 104 49, 96 50 C 74 51, 50 51, 26 50 C 18 49, 18 35, 26 34 Z",
      "M26 34 C 32 36, 32 48, 26 50",
      "M54 50 C 51 58, 48 66, 46 74 C 50 70, 53 67, 56 64 C 59 67, 62 70, 66 74 C 64 66, 61 58, 58 50",
    ],
  },
  sparkle: {
    paths: [
      "M60 16 C 62 46, 70 56, 104 60 C 70 64, 62 74, 60 104 C 58 74, 50 64, 16 60 C 50 56, 58 46, 60 16 Z",
      "M98 20 C 99 27, 101 29, 108 30 C 101 31, 99 33, 98 40 C 97 33, 95 31, 88 30 C 95 29, 97 27, 98 20 Z",
    ],
  },
  arrowScribble: {
    paths: [
      "M10 30 C 30 20, 46 40, 34 52 C 24 62, 16 44, 32 40 C 56 34, 76 60, 104 84",
      "M88 84 C 94 85, 100 85, 105 85 C 104 79, 102 74, 100 69",
    ],
  },
  musicNotes: {
    paths: [
      "M22 88 C 22 81, 36 78, 38 84 C 40 90, 24 95, 22 88 Z",
      "M38 85 C 38 68, 38 52, 38 36",
      "M38 36 C 50 33, 62 30, 74 27",
      "M38 46 C 50 43, 62 40, 74 37",
      "M74 27 C 74 44, 74 60, 74 76",
      "M58 79 C 58 72, 72 69, 74 75 C 76 81, 60 86, 58 79 Z",
      "M92 58 C 92 53, 101 51, 102 55 C 103 59, 93 62, 92 58 Z",
      "M102 56 C 102 46, 102 36, 102 26 C 107 29, 111 33, 112 39",
    ],
  },
  piano: {
    paths: [
      "M8 34 C 42 33, 78 33, 112 34 C 113 52, 113 72, 112 90 C 78 91, 42 91, 8 90 C 7 72, 7 52, 8 34 Z",
      "M23 34 V90 M38 34 V90 M53 34 V90 M68 34 V90 M83 34 V90 M98 34 V90",
    ],
    fill: [
      "M18 34 H28 V64 H18 Z",
      "M33 34 H43 V64 H33 Z",
      "M63 34 H73 V64 H63 Z",
      "M78 34 H88 V64 H78 Z",
      "M93 34 H103 V64 H93 Z",
    ],
  },
  camera: {
    paths: [
      "M14 42 C 22 42, 32 42, 40 42 C 42 38, 44 34, 47 31 C 56 31, 64 31, 73 31 C 76 34, 78 38, 80 42 C 88 42, 98 42, 106 42 C 107 58, 107 76, 106 92 C 76 93, 44 93, 14 92 C 13 76, 13 58, 14 42 Z",
      circle(60, 66, 17),
      circle(60, 66, 8),
      "M88 50 C 92 50, 96 50, 99 50",
      "M22 36 C 26 36, 30 36, 33 36",
    ],
  },
  filmStrip: {
    paths: [
      "M6 34 C 44 33, 78 33, 114 34 C 115 50, 115 68, 114 84 C 78 85, 44 85, 6 84 C 5 68, 5 50, 6 34 Z",
      "M6 44 H114 M6 74 H114",
      "M44 44 V74 M78 44 V74",
    ],
    fill: [
      "M11 37 h5 v4 h-5z M23 37 h5 v4 h-5z M35 37 h5 v4 h-5z M47 37 h5 v4 h-5z M59 37 h5 v4 h-5z M71 37 h5 v4 h-5z M83 37 h5 v4 h-5z M95 37 h5 v4 h-5z M107 37 h4 v4 h-4z",
      "M11 77 h5 v4 h-5z M23 77 h5 v4 h-5z M35 77 h5 v4 h-5z M47 77 h5 v4 h-5z M59 77 h5 v4 h-5z M71 77 h5 v4 h-5z M83 77 h5 v4 h-5z M95 77 h5 v4 h-5z M107 77 h4 v4 h-4z",
    ],
  },
  penTool: {
    paths: [
      "M14 92 C 36 22, 82 112, 106 30",
      "M14 92 L 40 56",
      "M106 30 L 82 66",
      "M10 88 h8 v8 h-8 Z",
      "M102 26 h8 v8 h-8 Z",
      circle(40, 56, 3.5),
      circle(82, 66, 3.5),
    ],
  },
  cropMarks: {
    paths: [
      "M20 38 V20 H38",
      "M82 20 H100 V38",
      "M100 82 V100 H82",
      "M38 100 H20 V82",
    ],
    dashed: ["M47 20 V100 M73 20 V100 M20 47 H100 M20 73 H100"],
  },
  wireframe: {
    paths: [
      "M12 22 C 44 21, 76 21, 108 22 C 109 48, 109 74, 108 98 C 76 99, 44 99, 12 98 C 11 74, 11 48, 12 22 Z",
      "M12 35 H108",
      "M22 45 H62 V70 H22 Z",
      "M22 45 L62 70 M62 45 L22 70",
      "M72 47 H98 M72 55 H94 M72 63 H88",
      "M22 80 H98 M22 88 H78",
    ],
    fill: ["M18 27 h4 v4 h-4z M26 27 h4 v4 h-4z M34 27 h4 v4 h-4z"],
  },
  codeBrackets: {
    paths: ["M42 34 L 18 60 L 42 86", "M78 34 L 102 60 L 78 86", "M68 28 C 63 48, 58 70, 52 92"],
  },
  circuit: {
    paths: [
      "M6 72 H26 L30 64 L36 80 L42 64 L48 80 L54 64 L58 72 H78",
      "M78 72 H88 M88 58 V86 M95 58 V86 M95 72 H114",
      "M40 72 V40 H70 L80 30 H100",
      circle(40, 40, 3.5),
      circle(100, 30, 4),
      circle(6, 72, 3),
      circle(114, 72, 3),
    ],
  },
  paperPlane: {
    paths: ["M8 58 L 112 18 L 76 102 L 60 72 Z", "M60 72 L 112 18", "M60 72 L 62 92 L 70 84"],
    dashed: ["M8 104 C 20 96, 30 112, 44 100"],
  },
} satisfies Record<string, Doodle>;

export type DoodleName = keyof typeof doodles;
