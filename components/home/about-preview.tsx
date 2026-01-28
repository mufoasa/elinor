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
          {/* Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://i.imgur.com/X3HCOiI.jpeg"
                alt="Elinor Real Estate Team"
                fill
                className="object-cover"
              />
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
