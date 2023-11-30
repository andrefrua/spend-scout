type FooterLink = {
  href: string;
  name: string;
};

export type FooterProps = {
  company?: FooterLink;
  links?: FooterLink[];
  light?: boolean;
};
