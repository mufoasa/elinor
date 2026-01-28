"use client"

import useSWR from "swr"
import type { Property } from "@/lib/data/properties"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useProperties() {
  const { data, error, isLoading, mutate } = useSWR<Property[]>(
    "/api/properties",
    fetcher
  )

  return {
    properties: data || [],
    isLoading,
    isError: error,
    mutate,
  }
}

export function useProperty(id: string) {
  const { data, error, isLoading } = useSWR<Property>(
    id ? `/api/properties/${id}` : null,
    fetcher
  )

  return {
    property: data,
    isLoading,
    isError: error,
  }
}

export function useFeaturedProperties() {
  const { data, error, isLoading } = useSWR<Property[]>(
    "/api/properties/featured",
    fetcher
  )

  return {
    properties: data || [],
    isLoading,
    isError: error,
  }
}
