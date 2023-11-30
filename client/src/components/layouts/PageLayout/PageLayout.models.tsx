type PageLayoutBackground = "white" | "light" | "default";

export type PageLayoutProps = {
  background?: PageLayoutBackground;
  children: React.ReactNode;
};
