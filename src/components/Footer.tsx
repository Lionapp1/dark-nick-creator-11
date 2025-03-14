
const Footer = () => {
  return (
    <footer className="py-6 border-t border-white/5 bg-dark-surface/80 backdrop-blur-xl mb-16 md:mb-0">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-foreground/60">
          © {new Date().getFullYear()} NeoNick Pro - Tüm hakları saklıdır
        </div>
      </div>
    </footer>
  );
};

export default Footer;
