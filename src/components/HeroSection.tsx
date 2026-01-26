import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import profilePhoto from "@/assets/profile-photo.jpg";

const HeroSection = () => {
  return (
    <section id="accueil" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(187_85%_53%/0.1)_0%,transparent_50%)]" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="section-container relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="opacity-0 animate-fade-up">
              <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
                👋 Bienvenue sur mon portfolio
              </span>
            </div>
            
            <h1 className="opacity-0 animate-fade-up stagger-1 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Je suis{" "}
              <span className="text-gradient">Modeste Loko</span>
            </h1>
            
            <p className="opacity-0 animate-fade-up stagger-2 text-lg md:text-xl text-muted-foreground mb-4 code-font">
              <span className="text-primary">{">"}</span> Ingénieur en Génie Électrique & Informatique
            </p>
            
            <p className="opacity-0 animate-fade-up stagger-3 text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8">
              Passionné par l'automatisation, l'IoT et le développement de solutions innovantes. 
              Je transforme les idées en projets concrets et fonctionnels.
            </p>

            {/* CTA Buttons */}
            <div className="opacity-0 animate-fade-up stagger-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                asChild
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 glow-effect"
              >
                <a href="/CV_Modeste_Loko.pdf" download>
                  Télécharger mon CV
                </a>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 border-border hover:bg-muted"
              >
                <a href="#contact">
                  Me contacter
                </a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="opacity-0 animate-fade-up stagger-5 flex gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/modesteloko"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted/50 hover:bg-muted hover:text-primary transition-all duration-300"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/modesteloko"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-muted/50 hover:bg-muted hover:text-primary transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:modestebryanloko@gmail.com"
                className="p-3 rounded-full bg-muted/50 hover:bg-muted hover:text-primary transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="opacity-0 animate-fade-up stagger-3 relative">
            <div className="relative w-72 h-72 md:w-80 md:h-80">
              {/* Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-primary animate-gradient p-1">
                <div className="w-full h-full rounded-full bg-background" />
              </div>
              
              {/* Image */}
              <div className="absolute inset-2 rounded-full overflow-hidden border-2 border-border">
                <img
                  src={profilePhoto}
                  alt="Modeste Loko"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-2 -right-2 px-4 py-2 glass-card rounded-full text-sm font-medium">
                <span className="text-primary">●</span> Disponible
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up stagger-5">
          <a href="#apropos" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <span className="text-sm">Découvrir</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
