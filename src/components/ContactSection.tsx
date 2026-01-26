import { useState } from "react";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactInfo = [
  {
    icon: Phone,
    label: "Téléphone",
    value: "01 46 52 49 76",
    href: "tel:0146524976",
  },
  {
    icon: Mail,
    label: "Email",
    value: "modestebryanloko@gmail.com",
    href: "mailto:modestebryanloko@gmail.com",
  },
  {
    icon: MapPin,
    label: "Localisation",
    value: "Pahou, Bénin",
    href: null,
  },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/modesteloko", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/modesteloko", label: "LinkedIn" },
];

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Message envoyé avec succès !", {
      description: "Je vous répondrai dans les plus brefs délais.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="relative py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(187_85%_53%/0.05)_0%,transparent_60%)]" />
      
      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Travaillons ensemble
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Vous avez un projet en tête ou souhaitez simplement discuter ? 
            N'hésitez pas à me contacter, je serai ravi d'échanger avec vous.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-4" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <div key={item.label} className="group">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="flex items-center gap-4 p-4 glass-card rounded-xl hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium group-hover:text-primary transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-4 glass-card rounded-xl">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">Retrouvez-moi sur :</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-muted/50 hover:bg-primary/10 flex items-center justify-center hover:text-primary transition-all duration-300 border border-transparent hover:border-primary/30"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="p-8 glass-card rounded-2xl space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nom complet</label>
                  <Input
                    required
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    required
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Sujet</label>
                <Input
                  required
                  placeholder="Objet de votre message"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-background/50 border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  required
                  placeholder="Décrivez votre projet ou votre demande..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background/50 border-border focus:border-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full py-6 glow-effect"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Envoyer le message
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
