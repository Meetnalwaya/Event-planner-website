import SiteLayout from '@/components/SiteLayout'
import ContactForm from '@/components/ContactForm'
import Icon from '@/components/Icon'

export const metadata = { title: 'Contact | Royal Events Udaipur' }

export default function ContactPage() {
  return (
    <SiteLayout>
      <main className="pt-24 bg-surface min-h-screen">
        <header className="max-w-container-max mx-auto px-gutter pt-section-padding-md pb-12 text-center">
          <p className="font-label-caps text-label-caps text-secondary mb-4 tracking-[0.3em]">INQUIRE FOR ROYALTY</p>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6">
            Let Us Craft Your <span className="italic text-primary">Masterpiece</span>
          </h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Share your vision with our studio team. We respond to all enquiries within one business day.
          </p>
        </header>

        <section className="max-w-container-max mx-auto px-gutter pb-section-padding-lg grid md:grid-cols-2 gap-16">
          <ContactForm />
          <div className="bg-surface-container-low border border-gold-30 p-10">
            <h2 className="font-headline-md text-primary mb-8">Visit the Studio</h2>
            <ul className="space-y-6 font-body-md text-on-surface-variant">
              <li className="flex gap-3">
                <Icon name="location_on" className="text-primary" />
                <span>Jagdish Chowk, Udaipur, Rajasthan 313001</span>
              </li>
              <li className="flex gap-3">
                <Icon name="mail" className="text-primary" />
                <span>hello@springdiaries.events</span>
              </li>
              <li className="flex gap-3">
                <Icon name="call" className="text-primary" />
                <span>+91 294 245 6789</span>
              </li>
            </ul>
            <p className="mt-10 font-body-md text-on-surface-variant/80">
              Office hours: Monday–Saturday, 10:00–18:00 IST
            </p>
          </div>
        </section>
      </main>
    </SiteLayout>
  )
}
