import { GraduationCap, Target, Zap, Heart } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "Formation",
    description: "Licence en Génie Électrique et Informatique à l'INSTI de Lokossa",
  },
  {
    icon: Target,
    title: "Objectif",
    description: "Créer des solutions technologiques innovantes qui font la différence",
  },
  {
    icon: Zap,
    title: "Spécialités",
    description: "Automatisation, IoT, Intelligence Artificielle et Développement Web",
  },
  {
    icon: Heart,
    title: "Passion",
    description: "Transformer les idées complexes en projets simples et efficaces",
  },
];

const AboutSection = () => {
  return (
    <section id="apropos" className="relative py-24 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/5 to-transparent" />
      
      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
            À propos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Qui suis-je ?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Bio Text */}
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Je suis <span className="text-foreground font-semibold">Modeste Bryan Loko</span>, 
              étudiant passionné en Génie Électrique et Informatique à l'INSTI de Lokossa. 
              Mon parcours a débuté avec un Baccalauréat F3 en Électrotechnique à l'École 
              Saint Jean Bosco de Cotonou.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Ma curiosité pour la technologie m'a poussé à explorer divers domaines : 
              de la conception de systèmes embarqués à l'automatisation de workflows, 
              en passant par l'intelligence artificielle et le développement d'applications.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              Je crois fermement que la technologie doit servir à simplifier la vie quotidienne. 
              C'est pourquoi je m'efforce de créer des solutions pratiques, innovantes et 
              accessibles à tous.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6">
              <div className="text-center p-4 glass-card rounded-xl">
                <div className="text-3xl font-bold text-gradient">5+</div>
                <div className="text-sm text-muted-foreground">Projets réalisés</div>
              </div>
              <div className="text-center p-4 glass-card rounded-xl">
                <div className="text-3xl font-bold text-gradient">3+</div>
                <div className="text-sm text-muted-foreground">Stages effectués</div>
              </div>
              <div className="text-center p-4 glass-card rounded-xl">
                <div className="text-3xl font-bold text-gradient">10+</div>
                <div className="text-sm text-muted-foreground">Compétences</div>
              </div>
            </div>
          </div>

          {/* Highlights Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="group p-6 glass-card rounded-2xl hover:border-primary/30 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
