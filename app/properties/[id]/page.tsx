"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ImageGallery } from "@/components/property/image-gallery"
import { useLanguage } from "@/lib/i18n/context"
import { useProperty } from "@/hooks/use-properties"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ArrowLeft,
  Bed,
  Bath,
  Maximize,
  MapPin,
  Phone,
  Mail,
} from "lucide-react"
import type { Property } from "@/lib/data/properties"

export default function PropertyDetailsPage() {
  const params = useParams()
  const id = params.id as string
  const { property, isLoading } = useProperty(id)

  if (isLoading) {
    return <PropertyLoading />
  }

  if (!property) {
    return <PropertyNotFound />
  }

  return <PropertyDetailsContent property={property} />
}

function PropertyLoading() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-96 rounded-xl" />
              <Skeleton className="h-48 rounded-xl" />
              <Skeleton className="h-48 rounded-xl" />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-64 rounded-xl" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function PropertyNotFound() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background py-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-semibold text-foreground mb-4">
            Property Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The property you are looking for does not exist.
          </p>
          <Button asChild>
            <Link href="/properties">View All Properties</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}

function PropertyDetailsContent({ property }: { property: Property }) {
  const { t } = useLanguage()

  const formatPrice = (price: number, status: "sale" | "rent") => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price)
    return status === "rent" ? `${formatted}${t("common.month")}` : formatted
  }

  const typeLabels = {
    apartment: t("properties.filter.apartment"),
    house: t("properties.filter.house"),
    land: t("properties.filter.land"),
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background py-8">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="mb-6 gap-2 text-muted-foreground hover:text-foreground"
          >
            <Link href="/properties">
              <ArrowLeft className="w-4 h-4" />
              {t("property.back")}
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <ImageGallery images={property.images} title={property.title} />

              {/* Property Info */}
              <div>
                <div className="flex flex-wrap items-start gap-3 mb-4">
                  <Badge
                    variant={property.status === "sale" ? "default" : "secondary"}
                  >
                    {property.status === "sale" ? t("common.forSale") : t("common.forRent")}
                  </Badge>
                  <Badge variant="outline">
                    {typeLabels[property.type]}
                  </Badge>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-3">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="w-5 h-5" />
                  <span>{property.location}</span>
                </div>
                <p className="text-2xl md:text-3xl font-semibold text-primary mb-8">
                  {formatPrice(property.price, property.status)}
                </p>
              </div>

              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-4">
                    {t("property.description")}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </CardContent>
              </Card>

              {/* Property Details */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
                    {t("property.details")}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-secondary rounded-xl">
                      <Maximize className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground mb-1">{t("property.size")}</p>
                      <p className="text-lg font-semibold text-foreground">
                        {property.size} {t("properties.card.sqm")}
                      </p>
                    </div>
                    {property.type !== "land" && (
                      <>
                        <div className="text-center p-4 bg-secondary rounded-xl">
                          <Bed className="w-6 h-6 mx-auto mb-2 text-primary" />
                          <p className="text-sm text-muted-foreground mb-1">{t("property.rooms")}</p>
                          <p className="text-lg font-semibold text-foreground">{property.rooms}</p>
                        </div>
                        <div className="text-center p-4 bg-secondary rounded-xl">
                          <Bath className="w-6 h-6 mx-auto mb-2 text-primary" />
                          <p className="text-sm text-muted-foreground mb-1">{t("property.bathrooms")}</p>
                          <p className="text-lg font-semibold text-foreground">{property.bathrooms}</p>
                        </div>
                      </>
                    )}
                    <div className="text-center p-4 bg-secondary rounded-xl">
                      <MapPin className="w-6 h-6 mx-auto mb-2 text-primary" />
                      <p className="text-sm text-muted-foreground mb-1">{t("property.location")}</p>
                      <p className="text-lg font-semibold text-foreground line-clamp-1">
                        {property.location.split(",")[0]}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
                    {t("property.contact")}
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t("contact.info.phone")}</p>
                        <p className="font-medium text-foreground">+389 70 381 888</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-secondary rounded-lg">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t("contact.info.email")}</p>
                        <p className="font-medium text-foreground">elinortetovo@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/contact">{t("hero.secondary")}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
