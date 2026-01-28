"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PropertyCard } from "@/components/property/property-card"
import { PropertyFilters } from "@/components/property/property-filters"
import { useLanguage } from "@/lib/i18n/context"
import { useProperties } from "@/hooks/use-properties"
import type { PropertyType, PropertyStatus } from "@/lib/data/properties"
import { Skeleton } from "@/components/ui/skeleton"

interface Filters {
  type: PropertyType | "all"
  status: PropertyStatus | "all"
  location: string
  minPrice: string
  maxPrice: string
}

const defaultFilters: Filters = {
  type: "all",
  status: "all",
  location: "",
  minPrice: "",
  maxPrice: "",
}

export default function PropertiesPage() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const { properties, isLoading } = useProperties()

  const initialType = searchParams.get("type") as PropertyType | null
  const initialStatus = searchParams.get("status") as PropertyStatus | null

  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    type: initialType || "all",
    status: initialStatus || "all",
  })

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      if (filters.type !== "all" && property.type !== filters.type) {
        return false
      }
      if (filters.status !== "all" && property.status !== filters.status) {
        return false
      }
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }
      if (filters.minPrice && property.price < Number.parseFloat(filters.minPrice)) {
        return false
      }
      if (filters.maxPrice && property.price > Number.parseFloat(filters.maxPrice)) {
        return false
      }
      return true
    })
  }, [filters, properties])

  const handleResetFilters = () => {
    setFilters(defaultFilters)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <section className="bg-secondary py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              {t("properties.title")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("properties.subtitle")}
            </p>
          </div>
        </section>

        {/* Filters & Listings */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <PropertyFilters
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
            />

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Skeleton key={i} className="h-80 rounded-xl" />
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
              <>
                <p className="text-muted-foreground mb-6">
                  Showing {filteredProperties.length} {filteredProperties.length === 1 ? "property" : "properties"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  {t("properties.noResults")}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
