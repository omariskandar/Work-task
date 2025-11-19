const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[#020617]/90 backdrop-blur-2xl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">
            Content Manager
          </p>
          <p className="text-white/80">
            Crafting delightfully minimal tooling for modern learning teams.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-white/70 md:flex-row md:items-center">
          <a href="mailto:support@contentmanager.com" className="hover:text-white">
            support@contentmanager.com
          </a>
          <span className="text-white/30">•</span>
          <p>&copy; {currentYear} Content Manager</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
