"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { PropertyForm } from "@/components/admin/property-form"
import { useLanguage } from "@/lib/i18n/context"
import { useProperties } from "@/hooks/use-properties"
import { createClient } from "@/lib/supabase/client"
import type { Property } from "@/lib/data/properties"
import type { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Pencil, Trash2, Eye, Home, Building, TreePine, LogOut, Loader2 } from "lucide-react"

export default function AdminPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const { properties, isLoading: propertiesLoading, mutate } = useProperties()
  const [formOpen, setFormOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState<Property | undefined>()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user || user.user_metadata?.is_admin !== true) {
        router.push("/admin/login")
        return
      }
      
      setUser(user)
      setIsCheckingAuth(false)
    }
    
    checkAuth()
  }, [router])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
  }

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  const handleAdd = () => {
    setEditingProperty(undefined)
    setFormOpen(true)
  }

  const handleEdit = (property: Property) => {
    setEditingProperty(property)
    setFormOpen(true)
  }

  const handleDelete = (id: string) => {
    setPropertyToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!propertyToDelete) return
    
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/properties/${propertyToDelete}`, {
        method: "DELETE",
      })
      
      if (response.ok) {
        mutate()
      }
    } catch (error) {
      console.error("Error deleting property:", error)
    } finally {
      setIsDeleting(false)
      setPropertyToDelete(null)
      setDeleteDialogOpen(false)
    }
  }

  const handleSave = async (propertyData: Omit<Property, "id">) => {
    setIsSaving(true)
    try {
      if (editingProperty) {
        // Update existing property
        const response = await fetch(`/api/properties/${editingProperty.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(propertyData),
        })
        
        if (response.ok) {
          mutate()
        }
      } else {
        // Create new property
        const response = await fetch("/api/properties", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(propertyData),
        })
        
        if (response.ok) {
          mutate()
        }
      }
    } catch (error) {
      console.error("Error saving property:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const formatPrice = (price: number, status: "sale" | "rent") => {
    const formatted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(price)
    return status === "rent" ? `${formatted}/mo` : formatted
  }

  const getTypeIcon = (type: Property["type"]) => {
    switch (type) {
      case "apartment":
        return <Building className="w-4 h-4" />
      case "house":
        return <Home className="w-4 h-4" />
      case "land":
        return <TreePine className="w-4 h-4" />
    }
  }

  // Stats
  const stats = [
    { label: "Total Properties", value: properties.length },
    { label: "For Sale", value: properties.filter((p) => p.status === "sale").length },
    { label: "For Rent", value: properties.filter((p) => p.status === "rent").length },
    { label: "Featured", value: properties.filter((p) => p.featured).length },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Page Header */}
        <section className="bg-secondary py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-2">
                  {t("admin.title")}
                </h1>
                <p className="text-muted-foreground">
                  Welcome, {user?.email}
                </p>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAdd} size="lg" className="gap-2">
                  <Plus className="w-5 h-5" />
                  {t("admin.add")}
                </Button>
                <Button onClick={handleLogout} variant="outline" size="lg" className="gap-2 bg-transparent">
                  <LogOut className="w-5 h-5" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label}>
                  <CardContent className="p-6 text-center">
                    <p className="text-3xl font-semibold text-primary mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Properties Table */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  {propertiesLoading ? (
                    <div className="p-8 space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-16 w-full" />
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]">Image</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {properties.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                              No properties found. Add your first property to get started.
                            </TableCell>
                          </TableRow>
                        ) : (
                          properties.map((property) => (
                            <TableRow key={property.id}>
                              <TableCell>
                                <div className="relative w-16 h-12 rounded-md overflow-hidden">
                                  <Image
                                    src={property.images?.[0] || "/placeholder.svg"}
                                    alt={property.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium text-foreground line-clamp-1">
                                    {property.title}
                                  </p>
                                  {property.featured && (
                                    <Badge variant="secondary" className="mt-1 text-xs">
                                      Featured
                                    </Badge>
                                  )}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {getTypeIcon(property.type)}
                                  <span className="capitalize">{property.type}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={property.status === "sale" ? "default" : "secondary"}
                                >
                                  {property.status === "sale" ? t("common.forSale") : t("common.forRent")}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {property.location}
                              </TableCell>
                              <TableCell className="font-medium">
                                {formatPrice(property.price, property.status)}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center justify-end gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    asChild
                                    className="h-8 w-8"
                                  >
                                    <Link href={`/properties/${property.id}`}>
                                      <Eye className="w-4 h-4" />
                                      <span className="sr-only">View</span>
                                    </Link>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEdit(property)}
                                    className="h-8 w-8"
                                  >
                                    <Pencil className="w-4 h-4" />
                                    <span className="sr-only">{t("admin.edit")}</span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDelete(property.id)}
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                    <span className="sr-only">{t("admin.delete")}</span>
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />

      {/* Property Form Dialog */}
      <PropertyForm
        property={editingProperty}
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
        isSaving={isSaving}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this property from the listings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>{t("admin.form.cancel")}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                t("admin.delete")
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
