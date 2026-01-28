"use client"

import { useLanguage } from "@/lib/i18n/context"
import type { PropertyType, PropertyStatus } from "@/lib/data/properties"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, X } from "lucide-react"

interface PropertyFiltersProps {
  filters: {
    type: PropertyType | "all"
    status: PropertyStatus | "all"
    location: string
    minPrice: string
    maxPrice: string
  }
  onFilterChange: (filters: PropertyFiltersProps["filters"]) => void
  onReset: () => void
}

export function PropertyFilters({ filters, onFilterChange, onReset }: PropertyFiltersProps) {
  const { t } = useLanguage()

  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Property Type */}
        <div className="space-y-2">
          <Label htmlFor="type" className="text-sm font-medium">
            {t("properties.filter.type")}
          </Label>
          <Select
            value={filters.type}
            onValueChange={(value) => onFilterChange({ ...filters, type: value as PropertyType | "all" })}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder={t("properties.filter.all")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("properties.filter.all")}</SelectItem>
              <SelectItem value="apartment">{t("properties.filter.apartment")}</SelectItem>
              <SelectItem value="house">{t("properties.filter.house")}</SelectItem>
              <SelectItem value="land">{t("properties.filter.land")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="space-y-2">
          <Label htmlFor="status" className="text-sm font-medium">
            {t("properties.filter.status")}
          </Label>
          <Select
            value={filters.status}
            onValueChange={(value) => onFilterChange({ ...filters, status: value as PropertyStatus | "all" })}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder={t("properties.filter.all")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("properties.filter.all")}</SelectItem>
              <SelectItem value="sale">{t("properties.filter.sale")}</SelectItem>
              <SelectItem value="rent">{t("properties.filter.rent")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium">
            {t("properties.filter.location")}
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="location"
              type="text"
              placeholder="Search location..."
              value={filters.location}
              onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
              className="pl-9"
            />
          </div>
        </div>

        {/* Min Price */}
        <div className="space-y-2">
          <Label htmlFor="minPrice" className="text-sm font-medium">
            Min Price (EUR)
          </Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value })}
          />
        </div>

        {/* Max Price */}
        <div className="space-y-2">
          <Label htmlFor="maxPrice" className="text-sm font-medium">
            Max Price (EUR)
          </Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="Any"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value })}
          />
        </div>
      </div>

      {/* Reset Button */}
      <div className="mt-4 flex justify-end">
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  )
}
