export const BUTTON = {
  height: "48px",
  borderRadius: "12px",
  paddingX: "16px",
  fontWeight: 600,
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export const CARD = {
  padding: "24px",
  borderRadius: "16px",
  borderWidth: "1px",
  backdropBlur: "16px",
} as const;

export const INPUT = {
  height: "48px",
  borderRadius: "12px",
  paddingX: "16px",
  borderWidth: "1px",
  fontSize: "14px",
} as const;

export const BADGE = {
  height: "24px",
  borderRadius: "9999px",
  paddingX: "8px",
  fontSize: "12px",
  fontWeight: 500,
} as const;

export const MODAL = {
  borderRadius: "24px",
  padding: "24px",
  backdropBlur: "8px",
  shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
} as const;

export const TOAST = {
  borderRadius: "12px",
  padding: "16px",
  shadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
} as const;

export const COMPONENT_TOKENS = {
  button: BUTTON,
  card: CARD,
  input: INPUT,
  badge: BADGE,
  modal: MODAL,
  toast: TOAST,
} as const;
