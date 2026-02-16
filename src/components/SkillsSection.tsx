import { useEffect, useState, useRef } from "react";
import { Code, Cpu, Database, Globe, Wrench, Brain } from "lucide-react";

const skillCategories = [
  {
    title: "Développement Web",
    icon: Globe,
    color: "from-primary to-cyan-400",
    skills: [
      { name: "React.js", level: 30 },
      { name: "JavaScript", level: 50 },
      { name: "Node.js", level: 20 },
    ],
  },
  {
    title: "Programmation",
    icon: Code,
    color: "from-secondary to-purple-400",
    skills: [
      { name: "Python", level: 50 },
      { name: "C++", level: 70 },
      { name: "SQL", level: 65 },
    ],
  },
  {
    title: "Systèmes Embarqués",
    icon: Cpu,
    color: "from-emerald-500 to-teal-400",
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
    color: "from-yellow-500 to-orange-400",
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
    color: "from-rose-500 to-pink-400",
    skills: [
      { name: "Machine Learning", level: 25 },
      { name: "Computer Vision", level: 10 },
      { name: "Cybersécurité", level: 10 },
    ],
  },
  {
    title: "Électrotechnique",
    icon: Database,
    color: "from-indigo-500 to-blue-400",
    skills: [
      { name: "Réseaux Électriques", level: 30 },
      { name: "Asservissement", level: 75 },
      { name: "Maintenance Climatiseur", level: 20 },
      { name: "Schémas Électriques", level: 85 },
    ],
  },
];

const getLevelLabel = (level: number) => {
  if (level >= 80) return "Expert";
  if (level >= 60) return "Avancé";
  if (level >= 40) return "Intermédiaire";
  return "Débutant";
};

const getLevelDots = (level: number) => {
  if (level >= 80) return 5;
  if (level >= 60) return 4;
  if (level >= 40) return 3;
  if (level >= 20) return 2;
  return 1;
};

const SkillItem = ({ name, level, isVisible, delay }: { name: string; level: number; isVisible: boolean; delay: number }) => {
  const dots = getLevelDots(level);
  const label = getLevelLabel(level);

  return (
    <div
      className="flex items-center justify-between py-2.5 transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateX(0)" : "translateX(-12px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <span className="text-sm font-medium text-foreground">{name}</span>
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground hidden sm:inline">{label}</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                dot <= dots
                  ? "bg-primary scale-100"
                  : "bg-muted-foreground/20 scale-90"
              }`}
              style={{ transitionDelay: `${delay + dot * 80}ms` }}
            />
          ))}
        </div>
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(259_65%_55%/0.06)_0%,transparent_60%)]" />

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
          {skillCategories.map((category, idx) => {
            const IconComp = category.icon;
            return (
              <div
                key={category.title}
                className="relative group rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 overflow-hidden"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(24px)",
                  transitionDelay: `${idx * 100}ms`,
                  transitionProperty: "opacity, transform, border-color",
                }}
              >
                {/* Gradient top bar */}
                <div className={`h-1 bg-gradient-to-r ${category.color}`} />

                {/* Floating icon */}
                <div className="absolute -top-0 right-4 translate-y-[-50%]">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComp className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div className="p-6 pt-5">
                  <h3 className="font-semibold text-lg mb-4 text-foreground">
                    {category.title}
                  </h3>

                  <div className="divide-y divide-border">
                    {category.skills.map((skill, sIdx) => (
                      <SkillItem
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        isVisible={isVisible}
                        delay={idx * 100 + sIdx * 60}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
