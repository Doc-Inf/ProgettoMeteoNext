type link = { name: string; href: string };

/**
 * Array of objects representing navigation links.
 *
 * @type {link[]}
 * @property {string} name - The name of the link.
 * @property {string} href - The URL of the link.
 *
 * @type {link[]}
 */
export const NAV_LINKS: link[] = [
  {
    name: "Home",
    href: "./",
  },
  {
    name: "Chi siamo",
    href: "./chi-siamo",
  },
  {
    name: "Storico",
    href: "./storico",
  },
  {
    name: "Report",
    href: "./report",
  },
];
