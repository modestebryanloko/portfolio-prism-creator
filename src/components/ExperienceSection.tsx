import { Briefcase, GraduationCap, Award } from "lucide-react";

const experiences = [
  {
    type: "education",
    title: "Licence en Génie Électrique et Informatique",
    organization: "INSTI de Lokossa",
    period: "2022 – Présent",
    description: "Formation approfondie en électronique, automatique, informatique industrielle et programmation. Projets pratiques en IoT et systèmes embarqués.",
    icon: GraduationCap,
  },
  {
    type: "experience",
    title: "Stage - Réseaux Électriques",
    organization: "Energy TOWER Sarl",
    period: "2024",
    description: "Mise en pratique des concepts liés aux réseaux électriques. Analyse et maintenance de systèmes de distribution d'énergie.",
    icon: Briefcase,
  },
  {
    type: "experience",
    title: "Stage - Maintenance Climatisation",
    organization: "GENELEC",
    period: "2023",
    description: "Formation pratique sur la maintenance préventive et corrective des systèmes de climatisation industrielle.",
    icon: Briefcase,
  },
  {
    type: "certification",
    title: "Formation IA & Cybersécurité",
    organization: "HP Life (En ligne)",
    period: "2024",
    description: "Initiation aux fondamentaux de l'intelligence artificielle et aux bonnes pratiques en cybersécurité.",
    icon: Award,
  },
  {
    type: "education",
    title: "Baccalauréat F3 - Électrotechnique",
    organization: "École Saint Jean Bosco, Cotonou",
    period: "2022",
    description: "Formation technique en électrotechnique avec une forte composante pratique sur les installations électriques.",
    icon: GraduationCap,
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="relative py-24">
      {/* Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/5 to-transparent" />
      
      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
            Parcours
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Formation & Expériences
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mon parcours académique et professionnel, une combinaison de théorie 
            et de pratique qui forge mes compétences.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4" />
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent md:-translate-x-px" />

          {experiences.map((exp, idx) => (
            <div
              key={exp.title}
              className={`relative flex items-start gap-6 mb-12 ${
                idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Node */}
              <div className="absolute left-6 md:left-1/2 w-4 h-4 -translate-x-1/2 mt-1">
                <div className="w-full h-full rounded-full bg-primary animate-pulse-glow" />
              </div>

              {/* Content Card */}
              <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${idx % 2 === 0 ? "md:pr-8" : "md:pl-8"}`}>
                <div className="group p-6 glass-card rounded-2xl hover:border-primary/30 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      exp.type === "education" 
                        ? "bg-primary/10 text-primary" 
                        : exp.type === "certification"
                        ? "bg-accent/10 text-accent"
                        : "bg-secondary/10 text-secondary"
                    }`}>
                      <exp.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-primary code-font">{exp.period}</span>
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {exp.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{exp.organization}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
