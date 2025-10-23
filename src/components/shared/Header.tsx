// src/components/shared/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="py-4 px-6 md:px-12 border-b">
      <Link href="/" className="text-2xl font-bold tracking-tight">
        SkillSync <span className="text-primary">AI</span>
      </Link>
    </header>
  );
}