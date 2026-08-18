import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ProjectImage } from "@/types/project";

type ProjectMediaProps = {
  image: ProjectImage;
  priority?: boolean;
  className?: string;
  sizes?: string;
  objectPosition?: string;
};

export function ProjectMedia({
  image,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, 720px",
  objectPosition = "top",
}: ProjectMediaProps) {
  const portrait = image.height / image.width > 1.15;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-elevated",
        portrait ? "aspect-[4/5] sm:aspect-[4/5]" : "aspect-[16/10]",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        className={cn(
          "h-full w-full transition-[filter] duration-300 group-hover:brightness-110",
          portrait ? "object-contain" : "object-cover",
        )}
        style={{ objectPosition }}
      />
    </div>
  );
}
