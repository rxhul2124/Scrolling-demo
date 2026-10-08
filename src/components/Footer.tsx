"use client";

/**
 * Footer — A minimal footer with branding and links.
 */
export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-12"
      style={{
        background: "var(--color-bg)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-bg)",
            }}
          >
            IF
          </div>
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: "var(--color-fg)" }}
          >
            ITZFIZZ
          </span>
        </div>

        {/* Links */}
        <div className="flex gap-8">
          {["GitHub", "Portfolio", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs tracking-wider uppercase transition-colors duration-200 hover:opacity-100"
              style={{ color: "var(--color-muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-muted)")
              }
            >
              {link}
            </a>
          ))}
        </div>

        {/* Tech badges */}
        <div className="flex gap-3">
          {["Next.js", "GSAP", "Tailwind"].map((tech) => (
            <span
              key={tech}
              className="rounded-full px-3 py-1 text-[10px] font-medium tracking-wider uppercase"
              style={{
                background: "var(--color-accent-dim)",
                color: "var(--color-accent)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <p
        className="mt-8 text-center text-xs"
        style={{ color: "var(--color-muted)" }}
      >
        © {new Date().getFullYear()} Scroll-Driven Hero Demo. Built with ❤️
        using Next.js, GSAP & Tailwind CSS.
      </p>
    </footer>
  );
}
