"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n/context"
import type { Property } from "@/lib/data/properties"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Maximize, MapPin } from "lucide-react"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
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
    <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={property.images[0] || "/placeholder.svg"}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge
            variant={property.status === "sale" ? "default" : "secondary"}
            className="shadow-md"
          >
            {property.status === "sale" ? t("common.forSale") : t("common.forRent")}
          </Badge>
          <Badge variant="outline" className="bg-card/90 backdrop-blur-sm shadow-md">
            {typeLabels[property.type]}
          </Badge>
        </div>
      </div>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-1">
            {property.title}
          </h3>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
          {property.description}
        </p>
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          {property.type !== "land" && (
            <>
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span>{property.rooms} {t("properties.card.beds")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms} {t("properties.card.baths")}</span>
              </div>
            </>
          )}
          <div className="flex items-center gap-1">
            <Maximize className="w-4 h-4" />
            <span>{property.size} {t("properties.card.sqm")}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <span className="text-xl font-semibold text-primary">
            {formatPrice(property.price, property.status)}
          </span>
          <Button asChild size="sm">
            <Link href={`/properties/${property.id}`}>
              {t("properties.card.view")}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
