export type ElementProps<T extends HTMLElement> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>;

export type SoftPartial<T extends { id: string }> = {
  [P in keyof Omit<T, "id">]?: T[P];
} & { id: string };
