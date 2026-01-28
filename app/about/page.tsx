"use client"

import Image from "next/image"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLanguage } from "@/lib/i18n/context"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Award, Heart } from "lucide-react"

export default function AboutPage() {
  const { t } = useLanguage()

  const values = [
    {
      icon: Shield,
      title: t("about.values.trust"),
      description: "We believe in honest, open communication and transparency in every transaction.",
    },
    {
      icon: Award,
      title: t("about.values.excellence"),
      description: "We strive for excellence in everything we do, always going the extra mile.",
    },
    {
      icon: Heart,
      title: t("about.values.client"),
      description: "Your satisfaction is our priority. We listen, understand, and deliver.",
    },
  ]

  const stats = [
    { value: "500+", label: "Properties Sold" },
    { value: "15+", label: "Years Experience" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "3", label: "Office Locations" },
  ]

  const team = [
    {
      name: "Dashmir Aliji",
      role: "Founder & CEO",
      image: "https://i.imgur.com/X3HCOiI.jpeg",
    },
    {
      name: "Beqir Aliji",
      role: "Sales Director",
      image: "https://i.imgur.com/X3HCOiI.jpeg",
    },
    {
      name: "Mufo Kingi",
      role: "Property Consultant",
      image: "https://i.imgur.com/X3HCOiI.jpeg",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 bg-secondary">
          <div className="container mx-auto px-4 max-w-full text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              {t("about.title")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("about.subtitle")}
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 max-w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
              <div className="relative w-full max-w-full">
                <div className="relative w-full max-w-full aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                    alt="Elinor Team Meeting"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="w-full max-w-full">
                <h2 className="font-serif text-3xl font-semibold text-foreground mb-6">
                  {t("about.story.title")}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {t("about.story.text")}
                </p>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">
                  {t("about.mission.title")}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t("about.mission.text")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 max-w-full">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full max-w-full">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-serif text-4xl md:text-5xl font-semibold text-primary-foreground mb-2">
                    {stat.value}
                  </p>
                  <p className="text-primary-foreground/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 max-w-full">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                {t("about.values.title")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-full">
              {values.map((value) => (
                <Card key={value.title} className="text-center w-full max-w-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 lg:py-24 bg-secondary">
          <div className="container mx-auto px-4 max-w-full">
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Meet Our Team
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Dedicated professionals committed to helping you find your perfect property.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-full mx-auto">
              {team.map((member) => (
                <Card key={member.name} className="overflow-hidden w-full max-w-full">
                  <div className="relative w-full max-w-full aspect-square">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-serif text-xl font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
