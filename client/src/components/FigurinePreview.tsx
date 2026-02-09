import { motion, AnimatePresence } from "framer-motion";

interface FigurinePreviewProps {
  hairStyle: string;
  hairColor: string;
  skinColor: string;
  tuxedoColor: string;
  dressColor: string;
}

const SKIN_HEX: Record<string, string> = {
  light: "#fde4d5",
  medium: "#dcb698",
  tan: "#ae8b6d",
  dark: "#6d4c38",
};

const HAIR_HEX: Record<string, string> = {
  black: "#1a1a1a",
  brown: "#6b4423",
  blonde: "#d4a853",
  red: "#a0522d",
  grey: "#9ca3af",
};

const TUXEDO_HEX: Record<string, string> = {
  black: "#1f2937",
  navy: "#1e3a8a",
  charcoal: "#374151",
  ivory: "#faf5ef",
};

const DRESS_HEX: Record<string, string> = {
  white: "#ffffff",
  ivory: "#fffff0",
  blush: "#fce4ec",
  champagne: "#f5e6d0",
};

function getHairPath(style: string): string {
  switch (style) {
    case "bob": return "M 35,18 Q 25,15 22,25 Q 20,35 25,38 L 35,32 Z M 65,18 Q 75,15 78,25 Q 80,35 75,38 L 65,32 Z";
    case "long": return "M 35,18 Q 20,15 18,30 Q 16,50 25,58 L 32,40 Z M 65,18 Q 80,15 82,30 Q 84,50 75,58 L 68,40 Z";
    case "pixie": return "M 38,16 Q 30,13 28,20 L 35,24 Z M 62,16 Q 70,13 72,20 L 65,24 Z";
    case "bun": return "M 42,8 Q 50,2 58,8 Q 62,12 58,16 Q 50,20 42,16 Q 38,12 42,8 Z";
    case "spiky": return "M 38,15 L 35,5 L 42,14 M 50,13 L 50,3 L 52,13 M 62,15 L 65,5 L 58,14";
    case "smooth": return "";
    default: return "";
  }
}

export default function FigurinePreview({
  hairStyle,
  hairColor,
  skinColor,
  tuxedoColor,
  dressColor,
}: FigurinePreviewProps) {
  const skin = SKIN_HEX[skinColor] || SKIN_HEX.light;
  const hair = HAIR_HEX[hairColor] || HAIR_HEX.brown;
  const tux = TUXEDO_HEX[tuxedoColor] || TUXEDO_HEX.black;
  const dress = DRESS_HEX[dressColor] || DRESS_HEX.white;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="aspect-square bg-gradient-to-b from-secondary/30 to-muted/20 rounded-2xl flex items-center justify-center p-8">
        <AnimatePresence mode="wait">
          <motion.svg
            key={`${hairStyle}-${hairColor}-${skinColor}-${tuxedoColor}-${dressColor}`}
            viewBox="0 0 200 200"
            className="w-full h-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Groom */}
            <g transform="translate(20, 20)">
              <circle cx="50" cy="28" r="14" fill={skin} />
              <path d={getHairPath(hairStyle)} fill={hair} />
              <circle cx="45" cy="26" r="1.5" fill="#333" />
              <circle cx="55" cy="26" r="1.5" fill="#333" />
              <path d="M 46,32 Q 50,36 54,32" fill="none" stroke="#333" strokeWidth="1" />
              <path d="M 35,42 Q 35,55 35,80 Q 35,90 50,90 Q 65,90 65,80 Q 65,55 65,42 Q 58,38 50,38 Q 42,38 35,42 Z" fill={tux} />
              <rect x="47" y="42" width="6" height="25" rx="2" fill="white" opacity="0.9" />
              <path d="M 35,48 Q 25,55 28,65" fill="none" stroke={tux} strokeWidth="6" strokeLinecap="round" />
              <path d="M 65,48 Q 72,52 70,58" fill="none" stroke={tux} strokeWidth="6" strokeLinecap="round" />
              <rect x="40" y="88" width="8" height="22" rx="3" fill={tux} />
              <rect x="52" y="88" width="8" height="22" rx="3" fill={tux} />
              <ellipse cx="44" cy="112" rx="6" ry="3" fill="#1a1a1a" />
              <ellipse cx="56" cy="112" rx="6" ry="3" fill="#1a1a1a" />
            </g>

            {/* Bride */}
            <g transform="translate(95, 20)">
              <circle cx="50" cy="28" r="14" fill={skin} />
              <path d="M 36,20 Q 30,10 35,8 Q 50,2 65,8 Q 70,10 64,20" fill={hair} />
              <path d="M 36,20 Q 32,25 34,35 L 38,28 Z" fill={hair} />
              <path d="M 64,20 Q 68,25 66,35 L 62,28 Z" fill={hair} />
              <path d="M 42,10 Q 50,5 58,10 Q 65,2 70,8 Q 75,20 70,35 L 60,20 Z" fill="white" opacity="0.3" />
              <circle cx="45" cy="26" r="1.5" fill="#333" />
              <circle cx="55" cy="26" r="1.5" fill="#333" />
              <path d="M 43,24 L 42,22" stroke="#333" strokeWidth="0.5" />
              <path d="M 57,24 L 58,22" stroke="#333" strokeWidth="0.5" />
              <path d="M 46,32 Q 50,36 54,32" fill="none" stroke="#c88a93" strokeWidth="1" />
              <path d="M 38,42 Q 30,65 20,100 Q 20,110 50,110 Q 80,110 80,100 Q 70,65 62,42 Q 56,38 50,38 Q 44,38 38,42 Z" fill={dress} />
              <path d="M 42,50 Q 50,55 58,50" fill="none" stroke={skin} strokeWidth="0.5" opacity="0.3" />
              <path d="M 38,48 Q 30,52 32,58" fill="none" stroke={skin} strokeWidth="5" strokeLinecap="round" />
              <path d="M 62,48 Q 72,55 70,60" fill="none" stroke={skin} strokeWidth="5" strokeLinecap="round" />
            </g>

            {/* Holding hands */}
            <path d="M 90,78 Q 95,76 100,78" fill="none" stroke={skin} strokeWidth="4" strokeLinecap="round" />

            {/* Heart */}
            <motion.g
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <text x="95" y="55" fontSize="10" textAnchor="middle" fill="hsl(350, 45%, 65%)">
                &#10084;
              </text>
            </motion.g>
          </motion.svg>
        </AnimatePresence>
      </div>
    </div>
  );
}
