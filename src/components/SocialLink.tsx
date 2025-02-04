import { LucideIcon } from "lucide-react";

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  color: string;
}

const SocialLink = ({ href, icon: Icon, label, color }: SocialLinkProps) => {
  return (
    <div className="link-card">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="social-link"
        style={{ backgroundColor: color }}
      >
        <Icon size={24} />
        <span>{label}</span>
      </a>
    </div>
  );
};

export default SocialLink;