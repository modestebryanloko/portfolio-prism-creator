import { Heart, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a href="#accueil" className="text-2xl font-bold mb-2 inline-block">
              <span className="text-gradient">Modeste Loko</span>
            </a>
            <p className="text-sm text-muted-foreground">
              © {currentYear} • Tous droits réservés
            </p>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Fait avec</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>au Bénin</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/modesteloko"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/modesteloko"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:modestebryanloko@gmail.com"
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
