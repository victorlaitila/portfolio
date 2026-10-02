import { useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SECTION_IDS } from "@/config/site";
import { useToast } from "@/hooks/useToast";
import backgroundImg from "@/assets/background-contact.webp";
import { Section } from "./Section";
import { SocialLinks } from "./SocialLinks";

// Keys must match the variables used in the EmailJS template.
type ContactForm = Record<"name" | "email" | "message", string>;

const EMPTY_FORM: ContactForm = { name: "", email: "", message: "" };

const FIELDS: Array<{ name: keyof ContactForm; label: string; type?: string; placeholder: string }> = [
  { name: "name", label: "Name", type: "text", placeholder: "Your name" },
  { name: "email", label: "Email", type: "email", placeholder: "your.email@example.com" },
  { name: "message", label: "Message", placeholder: "Your message..." },
];

// From .env locally and repo secrets in CI. See vite-env.d.ts.
const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "",
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "",
};

export function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState<ContactForm>(EMPTY_FORM);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setIsSending(true);
    try {
      const result = await emailjs.send(EMAILJS.serviceId, EMAILJS.templateId, form, {
        publicKey: EMAILJS.publicKey,
      });
      if (result.text === "OK") {
        toast({ title: "Message Sent!", description: "Thank you for reaching out. I'll get back to you soon." });
        setForm(EMPTY_FORM);
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Section
      id={SECTION_IDS.contact}
      title="Get in Touch"
      subtitle="Have a question or want to work together? Feel free to reach out!"
      background={backgroundImg}
      className="max-w-5xl"
    >
      <Card className="p-8 mb-8 animate-scale-in bg-background/80">
        <form onSubmit={handleSubmit} className="space-y-6">
          {FIELDS.map(({ name, label, type, placeholder }) => {
            const fieldProps = { id: name, name, value: form[name], onChange: handleChange, placeholder };
            return (
              <div key={name}>
                <label htmlFor={name} className="block text-sm font-medium mb-2">
                  {label}
                </label>
                {type ? <Input type={type} {...fieldProps} /> : <Textarea rows={6} {...fieldProps} />}
              </div>
            );
          })}

          <Button
            type="submit"
            variant="hero"
            size="lg"
            disabled={isSending}
            aria-busy={isSending}
            className="w-full font-display font-bold disabled:opacity-80"
          >
            {isSending ? (
              <>
                <Loader2 className="animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </Button>
        </form>
      </Card>

      <SocialLinks className="justify-center gap-6 animate-fade-in" />
    </Section>
  );
}
