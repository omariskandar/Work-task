const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[var(--color-background)] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/50">
            Content Manager
          </p>
          <p className="text-sm text-white/80 mt-1">
            Crafting simple workflows for modern learning teams.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-white/70 md:flex-row md:items-center">
          <a href="mailto:support@contentmanager.com" className="hover:text-white transition-colors">
            support@contentmanager.com
          </a>
          <span className="hidden md:inline text-white/30">•</span>
          <p>&copy; {currentYear} Content Manager</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
