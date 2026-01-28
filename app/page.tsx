import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturedProperties } from "@/components/home/featured-properties"
import { AboutPreview } from "@/components/home/about-preview"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturedProperties />
        <AboutPreview />
      </main>
      <Footer />
    </div>
  )
}
