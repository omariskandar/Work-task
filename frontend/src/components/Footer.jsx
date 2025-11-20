const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E5E7EB] bg-[#111827] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8 text-sm md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/60">
            Content Manager
          </p>
          <p className="text-white">
            Crafting simple workflows for modern learning teams.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-white/80 md:flex-row md:items-center">
          <a href="mailto:support@contentmanager.com" className="hover:text-white">
            support@contentmanager.com
          </a>
          <span className="text-white/40">•</span>
          <p>&copy; {currentYear} Content Manager</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
