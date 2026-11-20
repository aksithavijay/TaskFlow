import "./globals.css";

export const metadata = {
  title: "TaskFlow",
  description: "Stay organized, one task at a time.",
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
