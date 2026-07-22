"use client";

import { CardStack } from "@/components/ui/card-stack";
import type { CardStackItem } from "@/components/ui/card-stack";

const items: CardStackItem[] = [
  {
    id: 1,
    title: "Luxury Performance",
    description: "Experience the thrill of precision engineering",
    imageSrc: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    href: "#",
  },
  {
    id: 2,
    title: "Elegant Design",
    description: "Where beauty meets functionality",
    imageSrc: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    href: "#",
  },
  {
    id: 3,
    title: "Power & Speed",
    description: "Unleash the true potential of the road",
    imageSrc: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80",
    href: "#",
  },
  {
    id: 4,
    title: "Timeless Craftsmanship",
    description: "Built with passion, driven by excellence",
    imageSrc: "https://images.unsplash.com/photo-1618005198143-e5283b519a7f?auto=format&fit=crop&w=800&q=80",
    href: "#",
  },
  {
    id: 5,
    title: "Future of Mobility",
    description: "Innovation that moves you forward",
    imageSrc: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
    href: "#",
  },
];

export default function CardStackDemoPage() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-5xl p-8">
        <CardStack
          items={items}
          initialIndex={0}
          autoAdvance
          intervalMs={2000}
          pauseOnHover
          showDots
        />
      </div>
    </div>
  );
}
