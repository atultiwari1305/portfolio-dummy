"use client";

import { useState } from "react";
import { socials, profile } from "@/data/resume";
import type { SocialLink } from "@/types";
import { useToast } from "@/components/providers/ToastProvider";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CopyButton } from "@/components/ui/CopyButton";
import {
  SendIcon,
  MailIcon,
  PhoneIcon,
  GithubIcon,
  LinkedinIcon,
} from "@/components/ui/Icons";

function SocialIcon({ icon }: { icon: SocialLink["icon"] }) {
  const cls = "h-[18px] w-[18px]";
  if (icon === "mail") return <MailIcon className={cls} />;
  if (icon === "github") return <GithubIcon className={cls} />;
  if (icon === "linkedin") return <LinkedinIcon className={cls} />;
  return <PhoneIcon className={cls} />;
}

const field =
  "peer w-full resize-y rounded-[11px] border border-line bg-panel px-[15px] pb-[7px] pt-[17px] font-sans text-[14.5px] text-ink outline-none transition-[border-color,box-shadow] placeholder-transparent focus:border-accent focus:shadow-[0_0_0_3px_var(--accent-soft)]";
const labelCls =
  "pointer-events-none absolute left-[15px] top-[15px] font-mono text-[12.5px] text-faint transition-all peer-focus:top-1.5 peer-focus:text-[9.5px] peer-focus:tracking-[0.06em] peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:text-[9.5px] peer-[:not(:placeholder-shown)]:tracking-[0.06em] peer-[:not(:placeholder-shown)]:text-accent";

export function Contact() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const send = () => {
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast("Please fill in all fields");
      return;
    }
    toast("Opening your mail client…");
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="px-[clamp(18px,5vw,48px)] py-[clamp(72px,10vh,128px)]">
      <div className="mx-auto w-full max-w-content">
        <SectionHeading
          index="07"
          eyebrow="Contact"
          title="Let's build something fast."
          sub="Open to SDE roles and interesting systems work. I usually reply within a day."
        />

        <div className="grid grid-cols-1 items-start gap-[42px] md:grid-cols-2">
          <Reveal>
            <div>
              <div className="relative mb-5">
                <input
                  id="cName"
                  type="text"
                  placeholder=" "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={field}
                />
                <label htmlFor="cName" className={labelCls}>
                  your name
                </label>
              </div>
              <div className="relative mb-5">
                <input
                  id="cEmail"
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={field}
                />
                <label htmlFor="cEmail" className={labelCls}>
                  your email
                </label>
              </div>
              <div className="relative mb-5">
                <textarea
                  id="cMsg"
                  placeholder=" "
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${field} min-h-[108px]`}
                />
                <label htmlFor="cMsg" className={labelCls}>
                  your message
                </label>
              </div>
              <MagneticButton
                onClick={send}
                strength={0.15}
                className="flex w-full items-center justify-center gap-2.5 rounded-[10px] bg-accent px-5 py-3 font-mono text-[13px] text-onAccent"
              >
                Send message <SendIcon className="h-[15px] w-[15px]" />
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="flex flex-col gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="mag group flex items-center gap-3.5 rounded-xl border border-line bg-panel px-[17px] py-[15px] transition-all duration-300 ease-smooth hover:translate-x-1 hover:border-accent"
                >
                  <span className="grid h-[38px] w-[38px] flex-shrink-0 place-items-center rounded-[9px] bg-bg2 text-accent">
                    <SocialIcon icon={s.icon} />
                  </span>
                  <span className="min-w-0">
                    <b className="block text-[13.5px]">{s.label}</b>
                    <small className="font-mono text-[11px] text-muted">{s.value}</small>
                  </span>
                  {s.copy ? (
                    <CopyButton
                      value={s.copy}
                      inline
                      className="ml-auto rounded-md border border-line px-2.5 py-1 font-mono text-[10px] text-faint transition-colors hover:border-accent hover:text-accent"
                    />
                  ) : (
                    <span className="ml-auto rounded-md border border-line px-2.5 py-1 font-mono text-[10px] text-faint transition-colors group-hover:border-accent group-hover:text-accent">
                      open
                    </span>
                  )}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
