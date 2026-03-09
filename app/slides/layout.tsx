import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/dracula.css";
import "./slides.css";

export default function SlidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
