import { useEffect, useState, useRef } from "react";
import { Code, Cpu, Database, Globe, Wrench, Brain } from "lucide-react";

const skillCategories = [
  {
    title: "Systèmes Embarqués",
    icon: Cpu,
    color: "from-emerald-500 to-teal-400",
    dotColor: "bg-emerald-500",
    skills: [
      { name: "Arduino", level: 75 },
      { name: "Raspberry Pi", level: 70 },
      { name: "RFID/NFC", level: 72 },
      { name: "Capteurs IoT", level: 68 },
    ],
  },
  {
    title: "Automatisation",
    icon: Wrench,
    color: "from-yellow-500 to-orange-400",
    dotColor: "bg-yellow-500",
    skills: [
      { name: "n8n", level: 75 },
      { name: "API Integration", level: 70 },
      { name: "Workflows", level: 78 },
      { name: "No-Code Tools", level: 65 },
    ],
  },
  {
    title: "Programmation",
    icon: Code,
    color: "from-secondary to-purple-400",
    dotColor: "bg-secondary",
    skills: [
      { name: "Python", level: 50 },
      { name: "C++", level: 70 },
      { name: "SQL", level: 65 },
    ],
  },
  {
    title: "Électrotechnique",
    icon: Database,
    color: "from-indigo-500 to-blue-400",
    dotColor: "bg-indigo-500",
    skills: [
      { name: "Réseaux Électriques", level: 30 },
      { name: "Asservissement", level: 70 },
      { name: "Maintenance Climatiseur", level: 20 },
      { name: "Schémas Électriques", level: 78 },
    ],
  },
  {
    title: "Développement Web",
    icon: Globe,
    color: "from-primary to-cyan-400",
    dotColor: "bg-primary",
    skills: [
      { name: "React.js", level: 30 },
      { name: "JavaScript", level: 50 },
      { name: "Node.js", level: 20 },
    ],
  },
  {
    title: "IA & Data",
    icon: Brain,
    color: "from-rose-500 to-pink-400",
    dotColor: "bg-rose-500",
    skills: [
      { name: "Machine Learning", level: 25 },
      { name: "Computer Vision", level: 10 },
      { name: "Cybersécurité", level: 10 },
    ],
  },
];

const getLevelLabel = (level: number) => {
  if (level >= 80) return "Expert";
  if (level >= 60) return "Avancé";
  if (level >= 40) return "Intermédiaire";
  return "Débutant";
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
      { threshold: 0.1 }
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

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-px transition-all duration-1000"
            style={{
              height: isVisible ? "100%" : "0%",
              transitionDelay: "200ms",
            }}
          />

          {skillCategories.map((category, idx) => {
            const IconComp = category.icon;
            const isLeft = idx % 2 === 0;

            return (
              <div
                key={category.title}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                  transitionDelay: `${idx * 150 + 300}ms`,
                }}
              >
                {/* Node on the line */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg ring-4 ring-background transition-transform duration-300 hover:scale-110`}
                  >
                    <IconComp className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                    isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"
                  }`}
                >
                  <div className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${category.color}`} />
                      <h3 className="font-bold text-lg text-foreground">
                        {category.title}
                      </h3>
                    </div>

                    {/* Skills */}
                    <div className="space-y-3">
                      {category.skills.map((skill, sIdx) => {
                        const label = getLevelLabel(skill.level);
                        return (
                          <div
                            key={skill.name}
                            className="flex items-center justify-between"
                            style={{
                              opacity: isVisible ? 1 : 0,
                              transform: isVisible ? "translateX(0)" : `translateX(${isLeft ? "-12px" : "12px"})`,
                              transition: "opacity 0.5s ease, transform 0.5s ease",
                              transitionDelay: `${idx * 150 + sIdx * 80 + 500}ms`,
                            }}
                          >
                            <span className="text-sm font-medium text-foreground">
                              {skill.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">
                                {label}
                              </span>
                              <div
                                className="h-1.5 rounded-full bg-muted w-16 overflow-hidden"
                              >
                                <div
                                  className={`h-full rounded-full bg-gradient-to-r ${category.color} transition-all duration-700`}
                                  style={{
                                    width: isVisible ? `${skill.level}%` : "0%",
                                    transitionDelay: `${idx * 150 + sIdx * 80 + 600}ms`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
