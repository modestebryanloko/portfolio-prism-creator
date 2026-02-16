import { Link } from "react-router-dom";
import { ArrowRight, Car, Workflow, Shield, Zap } from "lucide-react";

const projects = [
  {
    title: "Barrière Automatique RFID",
    description: "Conception d'un système de contrôle d'accès automatisé utilisant la technologie RFID pour une gestion sécurisée des entrées/sorties.",
    tags: ["Arduino", "RFID", "C++", "IoT"],
    icon: Shield,
    color: "from-primary to-cyan-400",
    year: "2024",
    slug: "barriere-rfid",
  },
  {
    title: "Voiture Autonome",
    description: "Développement d'une voiture autonome dotée d'un capteur ultrason pour la détection d'obstacles et navigation intelligente.",
    tags: ["Arduino", "Capteur Ultrason", "Servomoteur", "Module Driver"],
    icon: Car,
    color: "from-secondary to-purple-400",
    year: "2024",
    slug: "voiture-telecommandee",
  },
  {
    title: "Automatisation Workflows",
    description: "Mise en place de workflows automatisés pour optimiser les processus répétitifs avec intégration d'APIs et gestion de données.",
    tags: ["n8n", "API", "No-Code", "Automation"],
    icon: Workflow,
    color: "from-emerald-500 to-teal-400",
    year: "2025",
    slug: "automatisation-workflows",
  },
  {
    title: "Réalisation simple",
    description: "Conception et réalisation de circuits électroniques, PCB et systèmes embarqués pour diverses applications IoT et automatisation.",
    tags: ["Arduino", "PCB", "C++", "Électronique"],
    icon: Zap,
    color: "from-yellow-500 to-orange-400",
    year: "2023 - 2026",
    slug: "realisation-electronique",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projets" className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
            Projets
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mes réalisations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Une sélection de projets académiques et personnels qui démontrent 
            ma capacité à transformer des idées en solutions concrètes.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4" />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.title}
              to={`/projet/${project.slug}`}
              className="group project-card block"
            >
              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${project.color}`} />
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} p-0.5`}>
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <project.icon className="w-5 h-5 text-foreground" />
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground code-font">{project.year}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-muted/50 rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action */}
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    <span>Voir les détails</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
