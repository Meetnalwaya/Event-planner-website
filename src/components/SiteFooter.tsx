import Link from 'next/link'
import Icon from './Icon'

export default function SiteFooter() {
  return (
    <footer className="bg-surface-container-highest border-t border-primary/20 w-full mt-section-padding-lg">
      <div className="max-w-container-max mx-auto px-gutter py-section-padding-md grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1">
          <div className="font-headline-md text-headline-md text-primary mb-6">
            Royal Events Udaipur
          </div>
          <p className="font-body-md text-on-surface-variant mb-6">
            Elevating the art of celebration through Rajasthani heritage and modern luxury.
          </p>
          <div className="flex gap-4">
            <a className="text-primary hover:text-secondary transition-colors" href="#" aria-label="Website">
              <Icon name="public" />
            </a>
            <a className="text-primary hover:text-secondary transition-colors" href="#" aria-label="Gallery">
              <Icon name="camera" />
            </a>
            <a className="text-primary hover:text-secondary transition-colors" href="mailto:hello@springdiaries.events" aria-label="Email">
              <Icon name="mail" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-label-caps text-label-caps text-primary mb-6">The Studio</h4>
          <ul className="space-y-4 font-body-md text-on-surface-variant">
            <li><Link className="hover:text-secondary transition-colors" href="/about">About Our Process</Link></li>
            <li><Link className="hover:text-secondary transition-colors" href="/venues">Our Udaipur Venues</Link></li>
            <li><Link className="hover:text-secondary transition-colors" href="/about">Meet the Team</Link></li>
            <li><Link className="hover:text-secondary transition-colors" href="/contact">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-label-caps text-label-caps text-primary mb-6">Our Services</h4>
          <ul className="space-y-4 font-body-md text-on-surface-variant">
            <li><Link className="hover:text-secondary transition-colors" href="/services">Heritage Weddings</Link></li>
            <li><Link className="hover:text-secondary transition-colors" href="/services">Corporate Galas</Link></li>
            <li><Link className="hover:text-secondary transition-colors" href="/services">Bespoke Concierge</Link></li>
            <li><Link className="hover:text-secondary transition-colors" href="/services">Event Production</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-label-caps text-label-caps text-primary mb-6">Contact</h4>
          <ul className="space-y-4 font-body-md text-on-surface-variant">
            <li className="flex items-start gap-2">
              <Icon name="location_on" className="text-sm" />
              <span>
                12 Lake Shore, Pichola,
                <br />
                Udaipur, Rajasthan 313001
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="call" className="text-sm" />
              <span>+91 294 555 0192</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-gutter py-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body-md text-on-surface-variant/60">
          © {new Date().getFullYear()} Royal Events Udaipur. Crafted with elegance.
        </p>
        <div className="flex gap-8">
          <a className="font-body-md text-on-surface-variant/60 hover:text-primary transition-colors" href="#">Privacy Policy</a>
          <a className="font-body-md text-on-surface-variant/60 hover:text-primary transition-colors" href="#">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
