"use client"

import React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useLanguage } from "@/lib/i18n/context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react"

export default function ContactPage() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: "", email: "", phone: "", message: "" })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: t("contact.info.address"),
      content: "Marshal Tito 124/1, Tetovo, North Macedonia",
    },
    {
      icon: Phone,
      title: t("contact.info.phone"),
      content: "+389 70 381 888",
    },
    {
      icon: Mail,
      title: t("contact.info.email"),
      content: "elinortetovo@gmail.com",
    },
    {
      icon: Clock,
      title: t("contact.info.hours"),
      content: t("contact.info.hours.text"),
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-secondary">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">
              {t("contact.title")}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("contact.subtitle")}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground">
                        Thank you for contacting us. We will get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("contact.form.name")}</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          placeholder="Jusuf Idrizi"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">{t("contact.form.email")}</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            placeholder="muhamedaliu@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">{t("contact.form.phone")}</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+389 71 xxx xxxx"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">{t("contact.form.message")}</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          placeholder="How can we help you?"
                          rows={5}
                        />
                      </div>
                      <Button type="submit" size="lg" className="w-full gap-2">
                        <Send className="w-4 h-4" />
                        {t("contact.form.submit")}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                    {t("contact.info.title")}
                  </h2>
                  <div className="space-y-4">
                    {contactInfo.map((item) => (
                      <div
                        key={item.title}
                        className="flex items-start gap-4 p-4 bg-secondary rounded-xl"
                      >
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          <item.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground mb-1">{item.title}</p>
                          <p className="text-muted-foreground">{item.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map Component */}
<div className="relative aspect-video rounded-xl overflow-hidden bg-muted">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2964.689061964994!2d20.974800576360444!3d42.00694825733664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1353f0c1a2093fcb%3A0x8945ffa6daf79cd1!2sReal%20Estate%20Agency%20Elinor!5e0!3m2!1sen!2smk!4v1769559342766!5m2!1sen!2smk"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Elinor Office Location"
  />
</div>

              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
