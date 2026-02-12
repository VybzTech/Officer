import { Instagram, Twitter, Linkedin } from 'lucide-react';

const iconMap = {
  instagram: Instagram,
  twitter: Twitter,
  linkedin: Linkedin,
};

export default function SocialButton({ icon, href }) {
  const Icon = iconMap[icon] || Instagram;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 text-gray-400 hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300 hover:scale-110 group"
    >
      <Icon size={20} className="group-hover:rotate-12 transition-transform duration-300" />
    </a>
  );
}