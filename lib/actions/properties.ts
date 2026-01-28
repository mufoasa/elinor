"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidateTag } from "next/cache"
import type { Property } from "@/lib/data/properties"

export async function getProperties(): Promise<Property[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching properties:", error)
    return []
  }

  return data.map(mapDbToProperty)
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching property:", error)
    return null
  }

  return mapDbToProperty(data)
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(6)

  if (error) {
    console.error("Error fetching featured properties:", error)
    return []
  }

  return data.map(mapDbToProperty)
}

export async function createProperty(property: Omit<Property, "id">): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.user_metadata?.is_admin !== true) {
    return { success: false, error: "Unauthorized" }
  }

  const dbProperty = {
    title: property.title,
    description: property.description,
    price: property.price,
    location: property.location,
    type: property.type,
    status: property.status,
    size: property.size,
    rooms: property.rooms,
    bathrooms: property.bathrooms,
    images: property.images,
    featured: property.featured,
    created_by: user.id,
  }

  const { error } = await supabase
    .from("properties")
    .insert(dbProperty)

  if (error) {
    console.error("Error creating property:", error)
    return { success: false, error: error.message }
  }

  revalidateTag("properties", "max")
  return { success: true }
}

export async function updateProperty(id: string, property: Partial<Property>): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.user_metadata?.is_admin !== true) {
    return { success: false, error: "Unauthorized" }
  }

  const updateData: Record<string, unknown> = {}
  if (property.title !== undefined) updateData.title = property.title
  if (property.description !== undefined) updateData.description = property.description
  if (property.price !== undefined) updateData.price = property.price
  if (property.location !== undefined) updateData.location = property.location
  if (property.type !== undefined) updateData.type = property.type
  if (property.status !== undefined) updateData.status = property.status
  if (property.size !== undefined) updateData.size = property.size
  if (property.rooms !== undefined) updateData.rooms = property.rooms
  if (property.bathrooms !== undefined) updateData.bathrooms = property.bathrooms
  if (property.images !== undefined) updateData.images = property.images
  if (property.featured !== undefined) updateData.featured = property.featured

  const { error } = await supabase
    .from("properties")
    .update(updateData)
    .eq("id", id)

  if (error) {
    console.error("Error updating property:", error)
    return { success: false, error: error.message }
  }

  revalidateTag("properties", "max")
  return { success: true }
}

export async function deleteProperty(id: string): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.user_metadata?.is_admin !== true) {
    return { success: false, error: "Unauthorized" }
  }

  const { error } = await supabase
    .from("properties")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting property:", error)
    return { success: false, error: error.message }
  }

  revalidateTag("properties", "max")
  return { success: true }
}

function mapDbToProperty(data: {
  id: string
  title: string
  description: string
  price: number
  location: string
  type: string
  status: string
  size: number
  rooms: number
  bathrooms: number
  images: string[]
  featured: boolean
}): Property {
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    price: data.price,
    location: data.location,
    type: data.type as Property["type"],
    status: data.status as Property["status"],
    size: data.size,
    rooms: data.rooms,
    bathrooms: data.bathrooms,
    images: data.images || [],
    featured: data.featured,
  }
}
