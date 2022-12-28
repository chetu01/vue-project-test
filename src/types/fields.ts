export type Field = {
  id: string;
  type: "INPUT" | "DIVIDER" | "NUMBER" | "CHECKBOX";
  required: boolean;
  checked?: boolean;
  name: string;
  value?: string;
};
