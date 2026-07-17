import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/600.css";
import "./globals.css";

export const metadata = {
  title: "Links Time Co. \u2014 The Dimple Dial",
  description:
    "A hand-built watch with a genuine golf ball dial. Made to order, one at a time. Built in two weeks, worn for a lifetime.",
  openGraph: {
    title: "Links Time Co. \u2014 The Dimple Dial",
    description:
      "A hand-built watch with a genuine golf ball dial. Made to order, one at a time.",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
