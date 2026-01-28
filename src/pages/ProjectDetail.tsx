import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Calendar, Code, Car, Bot, Workflow, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const projectsData = {
  "barriere-rfid": {
    title: "Barrière Automatique RFID",
    description: "Conception d'un système de contrôle d'accès automatisé utilisant la technologie RFID pour une gestion sécurisée des entrées/sorties.",
    longDescription: `Ce projet consiste en la conception et la réalisation d'un système de contrôle d'accès automatisé basé sur la technologie RFID (Radio-Frequency Identification).

Le système permet de gérer de manière sécurisée les entrées et sorties d'un parking ou d'un bâtiment en identifiant automatiquement les utilisateurs autorisés grâce à leurs badges RFID.

Lorsqu'un badge valide est détecté, la barrière s'ouvre automatiquement et se referme après le passage du véhicule ou de la personne.`,
    tags: ["Arduino", "RFID", "C++", "IoT"],
    icon: Shield,
    color: "from-primary to-cyan-400",
    year: "2024",
    githubLink: "https://github.com/modeste-loko",
    features: [
      "Lecture de badges RFID avec module RC522",
      "Contrôle de servo-moteur pour la barrière",
      "Affichage LCD pour les messages d'état",
      "Stockage des badges autorisés en mémoire EEPROM",
      "LED indicatrices (vert/rouge) pour le statut"
    ],
    technologies: [
      { name: "Arduino Uno", description: "Microcontrôleur principal" },
      { name: "Module RFID RC522", description: "Lecteur de badges RFID" },
      { name: "Servo-moteur SG90", description: "Actionnement de la barrière" },
      { name: "Écran LCD 16x2", description: "Affichage des informations" }
    ]
  },
  "voiture-telecommandee": {
    title: "Voiture Télécommandée",
    description: "Développement d'une voiture autonome contrôlable via application mobile avec communication Bluetooth.",
    longDescription: `Projet de robotique mobile consistant en la conception d'une voiture télécommandée contrôlable via une application mobile développée avec Flutter.

La communication entre le smartphone et la voiture se fait via Bluetooth, permettant un contrôle en temps réel des mouvements (avant, arrière, gauche, droite) ainsi que de la vitesse.

L'application mobile offre une interface intuitive avec des commandes tactiles et un joystick virtuel pour une expérience de conduite optimale.`,
    tags: ["Flutter", "Arduino", "Bluetooth", "Mobile"],
    icon: Car,
    color: "from-secondary to-purple-400",
    year: "2024",
    githubLink: "https://github.com/modeste-loko",
    features: [
      "Contrôle directionnel complet (4 directions)",
      "Réglage de la vitesse en temps réel",
      "Joystick virtuel sur l'application",
      "Connexion Bluetooth stable",
      "Interface utilisateur moderne et intuitive"
    ],
    technologies: [
      { name: "Flutter", description: "Développement de l'application mobile" },
      { name: "Arduino Nano", description: "Contrôleur embarqué" },
      { name: "Module HC-05", description: "Communication Bluetooth" },
      { name: "Pont H L298N", description: "Contrôle des moteurs DC" }
    ]
  },
  "voiture-ia": {
    title: "Voiture IA Autonome",
    description: "Création d'un véhicule autonome utilisant l'intelligence artificielle pour la détection d'obstacles et la navigation.",
    longDescription: `Projet avancé de robotique et d'intelligence artificielle visant à créer un véhicule capable de naviguer de manière autonome dans son environnement.

Le système utilise une caméra couplée à des algorithmes de vision par ordinateur (OpenCV) pour détecter les obstacles, les lignes de route et prendre des décisions de navigation en temps réel.

Un modèle de machine learning entraîné permet à la voiture d'apprendre et d'améliorer ses capacités de conduite au fil du temps.`,
    tags: ["Python", "OpenCV", "Machine Learning", "Raspberry Pi"],
    icon: Bot,
    color: "from-accent to-orange-400",
    year: "2025",
    githubLink: "https://github.com/modeste-loko",
    features: [
      "Détection d'obstacles en temps réel",
      "Suivi de ligne automatique",
      "Prise de décision autonome",
      "Évitement d'obstacles intelligent",
      "Mode d'apprentissage continu"
    ],
    technologies: [
      { name: "Raspberry Pi 4", description: "Ordinateur embarqué principal" },
      { name: "OpenCV", description: "Traitement d'images et vision" },
      { name: "TensorFlow Lite", description: "Modèle de machine learning" },
      { name: "Caméra Pi", description: "Capture vidéo en temps réel" }
    ]
  },
  "automatisation-workflows": {
    title: "Automatisation Workflows",
    description: "Mise en place de workflows automatisés pour optimiser les processus répétitifs avec intégration d'APIs et gestion de données.",
    longDescription: `Projet d'automatisation utilisant la plateforme n8n pour créer des workflows intelligents qui automatisent les tâches répétitives et optimisent les processus métier.

Les workflows développés permettent d'intégrer différentes APIs et services (Google Sheets, Slack, email, bases de données) pour créer des pipelines de données automatisés.

Cette approche no-code/low-code permet de gagner un temps précieux et de réduire les erreurs humaines dans les processus quotidiens.`,
    tags: ["n8n", "API", "No-Code", "Automation"],
    icon: Workflow,
    color: "from-emerald-500 to-teal-400",
    year: "2025",
    githubLink: "https://github.com/modeste-loko",
    features: [
      "Intégration multi-services (Slack, Gmail, etc.)",
      "Synchronisation automatique de données",
      "Alertes et notifications automatisées",
      "Traitement et transformation de données",
      "Scheduling et déclencheurs personnalisés"
    ],
    technologies: [
      { name: "n8n", description: "Plateforme d'automatisation" },
      { name: "REST APIs", description: "Communication entre services" },
      { name: "Webhooks", description: "Déclencheurs en temps réel" },
      { name: "JSON", description: "Format d'échange de données" }
    ]
  }
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectsData[slug as keyof typeof projectsData] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Projet non trouvé</h1>
          <Button asChild>
            <Link to="/#projets">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux projets
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const IconComponent = project.icon;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className={`relative py-20 bg-gradient-to-br ${project.color} overflow-hidden`}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Link 
            to="/#projets" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux projets
          </Link>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <span className="flex items-center gap-2 text-white/80">
              <Calendar className="w-4 h-4" />
              {project.year}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 text-sm bg-white/10 backdrop-blur-sm rounded-full text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Description */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Code className="w-6 h-6 text-primary" />
            Description du projet
          </h2>
          <div className="prose prose-invert max-w-none">
            {project.longDescription.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="text-muted-foreground leading-relaxed mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Fonctionnalités principales</h2>
          <ul className="grid gap-3">
            {project.features.map((feature, idx) => (
              <li 
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
              >
                <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color} mt-2 flex-shrink-0`} />
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Technologies */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Technologies utilisées</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {project.technologies.map((tech, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <h3 className="font-semibold text-foreground mb-1">{tech.name}</h3>
                <p className="text-sm text-muted-foreground">{tech.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-wrap gap-4">
          <Button 
            asChild
            className={`bg-gradient-to-r ${project.color} text-white hover:opacity-90`}
          >
            <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              Voir sur GitHub
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/#projets">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux projets
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
