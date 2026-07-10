import { Button, type ButtonProps } from "./button"

interface SocialLink {
  label: string
  url: string
}

const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    url: "https://linkedin.com/in/advaith-prabhu",
  },
  {
    label: "GitHub",
    url: "https://github.com/advaith-prabhu",
  },
  {
    label: "Gmail",
    url: "mailto:darsanaarun.sg@gmail.com",
  },
  {
    label: "Resume",
    url: "#resume",
  },
]

interface SocialLinksProps {
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}

export function SocialLinks({ variant = "default", size = "default" }: SocialLinksProps) {
  return (
    <div className="flex gap-4 items-center justify-center flex-wrap">
      {socialLinks.map((link) => (
        <Button
          key={link.label}
          variant={variant}
          size={size}
          asChild
        >
          <a
            href={link.url}
            target={link.label !== "Resume" && link.label !== "Gmail" ? "_blank" : undefined}
            rel={link.label !== "Resume" && link.label !== "Gmail" ? "noopener noreferrer" : undefined}
          >
            {link.label}
          </a>
        </Button>
      ))}
    </div>
  )
}

export { socialLinks }
