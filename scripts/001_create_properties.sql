-- Create properties table
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('apartment', 'house', 'land')),
  status TEXT NOT NULL CHECK (status IN ('sale', 'rent')),
  size DECIMAL(10, 2) NOT NULL,
  rooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read properties (public listings)
CREATE POLICY "properties_select_public" ON public.properties 
  FOR SELECT USING (true);

-- Only authenticated users can insert/update/delete (admin functionality)
CREATE POLICY "properties_insert_authenticated" ON public.properties 
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "properties_update_authenticated" ON public.properties 
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "properties_delete_authenticated" ON public.properties 
  FOR DELETE TO authenticated USING (true);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_properties_updated_at ON public.properties;
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample properties
INSERT INTO public.properties (title, description, price, location, type, status, size, rooms, bathrooms, images, featured) VALUES
  ('Modern City Apartment', 'Beautiful modern apartment in the heart of the city with stunning views and premium finishes. Features an open floor plan, floor-to-ceiling windows, and high-end appliances.', 245000, 'Downtown, City Center', 'apartment', 'sale', 85, 2, 1, ARRAY['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'], true),
  ('Spacious Family House', 'Perfect family home with a large garden, modern kitchen, and plenty of space for everyone. Located in a quiet neighborhood with excellent schools nearby.', 485000, 'Green Valley, Suburbs', 'house', 'sale', 220, 4, 3, ARRAY['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'], true),
  ('Cozy Studio Apartment', 'Charming studio perfect for young professionals. Fully furnished with modern amenities and great natural light throughout.', 850, 'Arts District', 'apartment', 'rent', 45, 1, 1, ARRAY['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'], false),
  ('Luxury Penthouse', 'Exclusive penthouse with panoramic city views, private terrace, and premium amenities. Experience luxury living at its finest.', 1250000, 'Skyline Tower, Downtown', 'apartment', 'sale', 180, 3, 2, ARRAY['https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800', 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'], true),
  ('Building Land Plot', 'Prime building land in developing area. Perfect for residential construction with all utilities available.', 95000, 'New Development Zone', 'land', 'sale', 500, 0, 0, ARRAY['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800'], false),
  ('Charming Townhouse', 'Beautiful townhouse with private parking, garden, and modern interior. Perfect for families seeking comfort and style.', 1800, 'Riverside District', 'house', 'rent', 150, 3, 2, ARRAY['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'], false)
ON CONFLICT DO NOTHING;
