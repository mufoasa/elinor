"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useLanguage } from "@/lib/i18n/context"
import type { Property, PropertyType, PropertyStatus } from "@/lib/data/properties"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface PropertyFormProps {
  property?: Property
  open: boolean
  onClose: () => void
  onSave: (property: Omit<Property, "id">) => void
  isSaving?: boolean
}

const defaultFormData = {
  title: "",
  description: "",
  price: "",
  location: "",
  type: "apartment" as PropertyType,
  status: "sale" as PropertyStatus,
  size: "",
  rooms: "",
  bathrooms: "",
  images: "",
  featured: false,
}

export function PropertyForm({ property, open, onClose, onSave, isSaving = false }: PropertyFormProps) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState(defaultFormData)

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        description: property.description,
        price: property.price.toString(),
        location: property.location,
        type: property.type,
        status: property.status,
        size: property.size.toString(),
        rooms: property.rooms.toString(),
        bathrooms: property.bathrooms.toString(),
        images: property.images.join(", "),
        featured: property.featured,
      })
    } else {
      setFormData(defaultFormData)
    }
  }, [property, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const propertyData = {
      title: formData.title,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      location: formData.location,
      type: formData.type,
      status: formData.status,
      size: Number.parseFloat(formData.size),
      rooms: Number.parseInt(formData.rooms) || 0,
      bathrooms: Number.parseInt(formData.bathrooms) || 0,
      images: formData.images.split(",").map((url) => url.trim()).filter(Boolean),
      featured: formData.featured,
    }
    onSave(propertyData)
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">
            {property ? t("admin.edit") : t("admin.add")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t("admin.form.title")}</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t("admin.form.description")}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">{t("admin.form.price")} (EUR)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">{t("admin.form.location")}</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">{t("admin.form.type")}</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value as PropertyType })}
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">{t("properties.filter.apartment")}</SelectItem>
                  <SelectItem value="house">{t("properties.filter.house")}</SelectItem>
                  <SelectItem value="land">{t("properties.filter.land")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">{t("admin.form.status")}</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as PropertyStatus })}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sale">{t("properties.filter.sale")}</SelectItem>
                  <SelectItem value="rent">{t("properties.filter.rent")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="size">{t("admin.form.size")}</Label>
              <Input
                id="size"
                type="number"
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rooms">{t("admin.form.rooms")}</Label>
              <Input
                id="rooms"
                type="number"
                value={formData.rooms}
                onChange={(e) => setFormData({ ...formData, rooms: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">{t("admin.form.bathrooms")}</Label>
              <Input
                id="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">{t("admin.form.images")} (comma-separated URLs)</Label>
            <Textarea
              id="images"
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              rows={2}
            />
          </div>

          <div className="flex items-center gap-3">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
            />
            <Label htmlFor="featured">Featured Property</Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isSaving} className="flex-1 bg-transparent">
              {t("admin.form.cancel")}
            </Button>
            <Button type="submit" disabled={isSaving} className="flex-1">
              {isSaving ? "Saving..." : t("admin.form.save")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
