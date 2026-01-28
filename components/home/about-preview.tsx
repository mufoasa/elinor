"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"

export function AboutPreview() {
  const { t } = useLanguage()

  const features = [
    "Expert local knowledge",
    "Personalized service",
    "Wide property selection",
    "Trusted since 2010",
  ]

  return (
    <section className="py-16 lg:py-24 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          {/* Image Container */}
          <div className="relative w-full max-w-full overflow-hidden rounded-2xl shadow-xl">
            <div className="aspect-[4/3] w-full relative">
              <Image
                src="https://i.imgur.com/X3HCOiI.jpeg"
                alt="Elinor Real Estate Team"
                fill
                className="object-cover"
              />
            </div>

            {/* Decorative elements (optional, safe) */}
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-36 h-36 md:w-48 md:h-48 bg-primary/10 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-24 h-24 md:w-32 md:h-32 bg-accent rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div className="lg:pl-8">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-6">
              {t("home.about.title")}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t("home.about.text")}
            </p>
            <ul className="space-y-3 mb-8">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="gap-2">
              <Link href="/about">
                {t("home.about.cta")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
