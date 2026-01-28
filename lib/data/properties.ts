export type PropertyType = "apartment" | "house" | "land"
export type PropertyStatus = "sale" | "rent"

export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  type: PropertyType
  status: PropertyStatus
  size: number
  rooms: number
  bathrooms: number
  images: string[]
  featured: boolean
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern City Apartment",
    description: "Beautiful modern apartment in the heart of the city with stunning views. Features high ceilings, open floor plan, and premium finishes throughout. Walking distance to restaurants, shops, and public transportation.",
    price: 185000,
    location: "Tirana, Albania",
    type: "apartment",
    status: "sale",
    size: 120,
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b25ba?w=800&h=600&fit=crop",
    ],
    featured: true,
  },
  {
    id: "2",
    title: "Luxury Family Villa",
    description: "Spacious family villa with private garden and pool. This stunning property offers 4 bedrooms, a modern kitchen, and a large living area perfect for entertaining. Located in a quiet, prestigious neighborhood.",
    price: 450000,
    location: "Ohrid, North Macedonia",
    type: "house",
    status: "sale",
    size: 280,
    rooms: 4,
    bathrooms: 3,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
    ],
    featured: true,
  },
  {
    id: "3",
    title: "Cozy Studio Apartment",
    description: "Perfect starter apartment or investment property. Recently renovated with modern amenities. Ideal location near university and city center.",
    price: 650,
    location: "Skopje, North Macedonia",
    type: "apartment",
    status: "rent",
    size: 45,
    rooms: 1,
    bathrooms: 1,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
    ],
    featured: false,
  },
  {
    id: "4",
    title: "Building Land with Sea View",
    description: "Prime building plot with panoramic sea views. Perfect for building your dream home. All utilities available at the property line. Quiet location just 5 minutes from the beach.",
    price: 95000,
    location: "Durrës, Albania",
    type: "land",
    status: "sale",
    size: 800,
    rooms: 0,
    bathrooms: 0,
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&h=600&fit=crop",
    ],
    featured: true,
  },
  {
    id: "5",
    title: "Penthouse with Terrace",
    description: "Exclusive penthouse apartment with a large private terrace. Features floor-to-ceiling windows, premium kitchen appliances, and smart home technology. Two parking spaces included.",
    price: 320000,
    location: "Tirana, Albania",
    type: "apartment",
    status: "sale",
    size: 180,
    rooms: 3,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop",
    ],
    featured: true,
  },
  {
    id: "6",
    title: "Traditional Stone House",
    description: "Charming traditional stone house with modern renovations. Original features preserved including stone walls and wooden beams. Large garden with fruit trees.",
    price: 180000,
    location: "Bitola, North Macedonia",
    type: "house",
    status: "sale",
    size: 200,
    rooms: 5,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop",
    ],
    featured: false,
  },
  {
    id: "7",
    title: "Modern Office Space",
    description: "Professional office space in prime business district. Open plan layout with meeting rooms and kitchen facilities. High-speed internet and 24/7 access.",
    price: 1200,
    location: "Skopje, North Macedonia",
    type: "apartment",
    status: "rent",
    size: 150,
    rooms: 4,
    bathrooms: 2,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
    ],
    featured: false,
  },
  {
    id: "8",
    title: "Lakeside Cottage",
    description: "Peaceful lakeside retreat perfect for weekend getaways. Direct lake access with private dock. Fully furnished and ready to move in.",
    price: 1500,
    location: "Ohrid, North Macedonia",
    type: "house",
    status: "rent",
    size: 100,
    rooms: 2,
    bathrooms: 1,
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    ],
    featured: false,
  },
]

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id)
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured)
}

export function filterProperties(
  filters: {
    type?: PropertyType | "all"
    status?: PropertyStatus | "all"
    location?: string
    minPrice?: number
    maxPrice?: number
  }
): Property[] {
  return properties.filter((property) => {
    if (filters.type && filters.type !== "all" && property.type !== filters.type) {
      return false
    }
    if (filters.status && filters.status !== "all" && property.status !== filters.status) {
      return false
    }
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }
    if (filters.minPrice && property.price < filters.minPrice) {
      return false
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false
    }
    return true
  })
}
