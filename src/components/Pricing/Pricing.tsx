'use client';

import { useRef, useState } from 'react';
import styles from './Pricing.module.scss';
import pricingData from '@/data/pricing.json';
import Image from 'next/image';

interface Pack {
  id: string;
  name: string;
  price: string;
  startingPrice: string;
  subtitle: string;
  features: string[];
  note: string;
  cta: string;
}

interface Field {
  name: string;
  label: string;
  placeholder: string;
  type: string;
}

interface Contact {
  title: string;
  fields: Field[];
  offerLabel: string;
  projectLabel: string;
  cta: string;
}

interface Intro {
  title: string;
  description: string;
}

interface PricingData {
  intro: Intro;
  packs: Pack[];
  contact: Contact;
}

export default function Pricing() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { intro, packs, contact } = pricingData as PricingData;
  const [selectedOffer, setSelectedOffer] = useState('');
  const [formData, setFormData] = useState<Record<string, string>>({
    name: '',
    email: '',
    phone: '',
    company: '',
    project: ''
  });

  const handleFieldChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Demande de devis - ${selectedOffer || 'Offre à définir'}`);
    const body = encodeURIComponent(
      `Nom: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Téléphone: ${formData.phone}\n` +
      `Entreprise: ${formData.company}\n` +
      `Pack choisi: ${selectedOffer || 'À définir'}\n\n` +
      `Projet:\n${formData.project}`
    );

    window.location.href = `mailto:contact@utopia-photographies.fr?subject=${subject}&body=${body}`;
  };

  return (
    <div className={styles.pricing}>
      {/* Intro Section */}
      <div className={styles.pricing__intro}>
        <h1 className={styles.pricing__introTitle}>{intro.title}</h1>
        <p className={styles.pricing__introDescription}>{intro.description}</p>
      </div>

      {/* Image Section with Animation */}
      <div className={styles.pricing__imageSection}>
        <div className={styles.pricing__imageWrapper}>
          <Image
            src="/images/DSC_7871%20copie.JPG"
            alt="Photographie"
            fill
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.pricing__imageOverlay} />
        </div>
      </div>

      {/* Packs Section with Horizontal Scroll */}
      <div className={styles.pricing__packsWrapper}>
        <div className={styles.pricing__packs} ref={scrollContainerRef}>
          {packs.map((pack: Pack) => (
            <div key={pack.id} className={styles.pricing__card}>
              <div className={styles.pricing__cardHeader}>
                <h2 className={styles.pricing__cardTitle}>{pack.name}</h2>
                <span className={styles.pricing__cardPrice}>{pack.price}</span>
              </div>
              <p className={styles.pricing__cardSubtitle}>{pack.subtitle}</p>
              <div className={styles.pricing__cardContent}>
                <ul className={styles.pricing__cardFeatures}>
                  {pack.features.map((feature: string, index: number) => (
                    <li key={index} className={styles.pricing__cardFeature}>{feature}</li>
                  ))}
                </ul>
              </div>
              {pack.note && <p className={styles.pricing__cardNote}>{pack.note}</p>}
              <button className={styles.pricing__cardCta}>{pack.cta}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className={styles.pricing__contact}>
        <h2 className={styles.pricing__contactTitle}>{contact.title}</h2>
        <form className={styles.pricing__form} onSubmit={handleSubmit}>
          <div className={styles.pricing__formGrid}>
            {contact.fields.map((field: Field) => (
              <div key={field.name} className={styles.pricing__formGroup}>
                <label className={styles.pricing__formLabel}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  className={styles.pricing__formInput}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                />
              </div>
            ))}
          </div>

          <div className={styles.pricing__formRow}>
            <div className={styles.pricing__formGroup}>
              <label className={styles.pricing__formLabel}>{contact.offerLabel}</label>
              <select
                className={styles.pricing__formSelect}
                value={selectedOffer}
                onChange={(e) => setSelectedOffer(e.target.value)}
              >
                <option value="">Sélectionner une offre</option>
                {packs.map((pack: Pack) => (
                  <option key={pack.id} value={pack.id}>
                    {pack.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.pricing__formGroup}>
            <label className={styles.pricing__formLabel}>{contact.projectLabel}</label>
            <textarea
              className={styles.pricing__formTextarea}
              name="project"
              rows={6}
              value={formData.project}
              onChange={(e) => handleFieldChange('project', e.target.value)}
            />
          </div>

          <button type="submit" className={styles.pricing__formSubmit}>
            {contact.cta}
          </button>
        </form>
      </div>
    </div>
  );
}
