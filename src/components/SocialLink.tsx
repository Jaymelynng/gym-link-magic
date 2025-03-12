
import { LucideIcon } from "lucide-react";

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  color: string;
}

const SocialLink = ({ href, icon: Icon, label, color }: SocialLinkProps) => {
  return (
    <div className="link-card transform transition-all duration-300 hover:scale-[1.02]">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="social-link flex items-center justify-center gap-4 w-full px-6 py-4 rounded-xl 
                  text-white font-semibold text-lg transition-all duration-300
                  hover:brightness-105 hover:-translate-y-0.5 shadow-md"
        style={{ backgroundColor: color }}
      >
        <Icon size={24} className="shrink-0" />
        <span className="text-base sm:text-lg">{label}</span>
      </a>
    </div>
  );
};

export default SocialLink;
