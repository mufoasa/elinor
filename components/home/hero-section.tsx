"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { ArrowRight, Search } from "lucide-react"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-foreground/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-card mb-6 leading-tight text-balance">
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-card/90 mb-8 leading-relaxed max-w-xl">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="gap-2 text-base">
              <Link href="/properties">
                <Search className="w-5 h-5" />
                {t("hero.cta")}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 text-base bg-card/10 border-card text-card hover:bg-card hover:text-foreground"
            >
              <Link href="/contact">
                {t("hero.secondary")}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
