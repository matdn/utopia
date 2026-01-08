'use client';

import { useRef } from 'react';
import styles from './Pricing.module.scss';
import pricingData from '@/data/pricing.json';

interface Pack {
  id: string;
  name: string;
  startingPrice: string;
  description: string;
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

interface PricingData {
  packs: Pack[];
  contact: Contact;
}

export default function Pricing() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { packs, contact } = pricingData as PricingData;

  return (
    <div className={styles.pricing}>
      {/* Logo Section */}
      <div className={styles.pricing__logo}>
        <div className={styles.pricing__logoText}>TL</div>
      </div>

      {/* Packs Section with Horizontal Scroll */}
      <div className={styles.pricing__packsWrapper}>
        <div className={styles.pricing__packs} ref={scrollContainerRef}>
          {packs.map((pack: Pack) => (
            <div key={pack.id} className={styles.pricing__card}>
              <div className={styles.pricing__cardHeader}>
                <h2 className={styles.pricing__cardTitle}>{pack.name}</h2>
                <span className={styles.pricing__cardPrice}>{pack.startingPrice}</span>
              </div>
              <div className={styles.pricing__cardContent}>
                <p className={styles.pricing__cardDescription}>
                  {pack.description.split('\n').map((line: string, index: number) => (
                    <span key={index}>
                      {line}
                      {index < pack.description.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
              <button className={styles.pricing__cardCta}>{pack.cta}</button>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className={styles.pricing__contact}>
        <h2 className={styles.pricing__contactTitle}>{contact.title}</h2>
        <form className={styles.pricing__form}>
          <div className={styles.pricing__formGrid}>
            {contact.fields.map((field: Field) => (
              <div key={field.name} className={styles.pricing__formGroup}>
                <label className={styles.pricing__formLabel}>{field.label}</label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className={styles.pricing__formInput}
                />
              </div>
            ))}
          </div>

          <div className={styles.pricing__formRow}>
            <div className={styles.pricing__formGroup}>
              <label className={styles.pricing__formLabel}>{contact.offerLabel}</label>
              <select className={styles.pricing__formSelect}>
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
              rows={6}
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
