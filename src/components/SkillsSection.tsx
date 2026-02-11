import { useEffect, useState, useRef } from "react";
import { Code, Cpu, Database, Globe, Wrench, Brain } from "lucide-react";

const skillCategories = [
  {
    title: "Développement Web",
    icon: Globe,
    skills: [
      { name: "React.js", level: 30 },
      { name: "JavaScript", level: 50 },
      { name: "Node.js", level: 20 },
    ],
  },
  {
    title: "Programmation",
    icon: Code,
    skills: [
      { name: "Python", level: 50 },
      { name: "C++", level: 70 },
      { name: "SQL", level: 65 },
    ],
  },
  {
    title: "Systèmes Embarqués",
    icon: Cpu,
    skills: [
      { name: "Arduino", level: 85 },
      { name: "Raspberry Pi", level: 75 },
      { name: "RFID/NFC", level: 80 },
      { name: "Capteurs IoT", level: 75 },
    ],
  },
  {
    title: "Automatisation",
    icon: Wrench,
    skills: [
      { name: "n8n", level: 80 },
      { name: "API Integration", level: 75 },
      { name: "Workflows", level: 85 },
      { name: "No-Code Tools", level: 70 },
    ],
  },
  {
    title: "IA & Data",
    icon: Brain,
    skills: [
      { name: "Machine Learning", level: 25 },
      { name: "Computer Vision", level: 10 },
      { name: "Cybersécurité", level: 10 },
    ],
  },
  {
    title: "Électrotechnique",
    icon: Database,
    skills: [
      { name: "Réseaux Électriques", level: 30 },
      { name: "Asservissement", level: 75 },
      { name: "Maintenance Climatiseur", level: 20 },
      { name: "Schémas Électriques", level: 85 },
    ],
  },
];

const SkillBar = ({ name, level, isVisible }: { name: string; level: number; isVisible: boolean }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-primary">{level}%</span>
      </div>
      <div className="skill-bar">
        <div
          className="skill-bar-fill"
          style={{
            width: isVisible ? `${level}%` : "0%",
            transitionDelay: `${Math.random() * 0.3}s`,
          }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="competences" className="relative py-24" ref={sectionRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(259_65%_55%/0.08)_0%,transparent_60%)]" />
      
      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
            Compétences
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Mon arsenal technique
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un ensemble de compétences diversifiées acquises à travers mes études, 
            stages et projets personnels.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4" />
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, idx) => (
            <div
              key={category.title}
              className="p-6 glass-card rounded-2xl hover:border-primary/30 transition-all duration-300"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{category.title}</h3>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SkillsSection;
