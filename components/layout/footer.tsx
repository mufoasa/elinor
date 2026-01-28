"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"
import { Home, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
  <Image
    src="/images/elinorlogo.png"
    alt="Elinor"
    width={160}
    height={48}
    className="object-contain"
  />
</Link>

            <p className="text-background/70 text-sm leading-relaxed">
              Your trusted partner in finding the perfect property. We make your dream home a reality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-background/70 hover:text-primary transition-colors text-sm">
                {t("nav.home")}
              </Link>
              <Link href="/properties" className="text-background/70 hover:text-primary transition-colors text-sm">
                {t("nav.properties")}
              </Link>
              <Link href="/about" className="text-background/70 hover:text-primary transition-colors text-sm">
                {t("nav.about")}
              </Link>
              <Link href="/contact" className="text-background/70 hover:text-primary transition-colors text-sm">
                {t("nav.contact")}
              </Link>
            </nav>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("properties.filter.type")}</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/properties?type=apartment" className="text-background/70 hover:text-primary transition-colors text-sm">
                {t("properties.filter.apartment")}
              </Link>
              <Link href="/properties?type=house" className="text-background/70 hover:text-primary transition-colors text-sm">
                {t("properties.filter.house")}
              </Link>
              <Link href="/properties?type=land" className="text-background/70 hover:text-primary transition-colors text-sm">
                {t("properties.filter.land")}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t("contact.info.title")}</h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-1 text-primary shrink-0" />
                <span className="text-background/70 text-sm">
                  Marshal Tito 124/1, Tetovo, North Macedonia
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span className="text-background/70 text-sm">+389 70 381 888</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span className="text-background/70 text-sm">elinortetovo@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-background/10">
          <p className="text-center text-background/50 text-sm">
            © {new Date().getFullYear()} Elinor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
