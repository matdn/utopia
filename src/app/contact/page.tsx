'use client';

import { useState } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import styles from "./page.module.scss";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <>
      <Header />
      <main className={styles.contact}>
        <section className={styles.contact__hero}>
          <h1 className={styles.contact__title}>Contact</h1>
          <p className={styles.contact__subtitle}>Parlons de votre projet</p>
        </section>

        <section className={styles.contact__content}>
          <div className={styles.contact__info}>
            <div className={styles.contact__infoBlock}>
              <h3 className={styles.contact__infoTitle}>Email</h3>
              <a href="mailto:contact@tl-photo.com" className={styles.contact__infoValue}>
                contact@tl-photo.com
              </a>
            </div>

            <div className={styles.contact__infoBlock}>
              <h3 className={styles.contact__infoTitle}>Téléphone</h3>
              <a href="tel:+33612345678" className={styles.contact__infoValue}>
                +33 6 12 34 56 78
              </a>
            </div>

            <div className={styles.contact__infoBlock}>
              <h3 className={styles.contact__infoTitle}>Réseaux sociaux</h3>
              <div className={styles.contact__socials}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.contact__social}>
                  Instagram
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.contact__social}>
                  Facebook
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.contact__social}>
                  YouTube
                </a>
              </div>
            </div>
          </div>

          <form className={styles.contact__form} onSubmit={handleSubmit}>
            <div className={styles.contact__formGroup}>
              <label className={styles.contact__label}>Nom complet</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.contact__input}
                placeholder="Votre nom"
                required
              />
            </div>

            <div className={styles.contact__formGroup}>
              <label className={styles.contact__label}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.contact__input}
                placeholder="votre@email.com"
                required
              />
            </div>

            <div className={styles.contact__formGroup}>
              <label className={styles.contact__label}>Téléphone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.contact__input}
                placeholder="+33 6 12 34 56 78"
              />
            </div>

            <div className={styles.contact__formGroup}>
              <label className={styles.contact__label}>Sujet</label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={styles.contact__select}
                required
              >
                <option value="">Sélectionner un sujet</option>
                <option value="photographie">Photographie</option>
                <option value="videographie">Vidéographie</option>
                <option value="evenement">Événement</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div className={styles.contact__formGroup}>
              <label className={styles.contact__label}>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={styles.contact__textarea}
                placeholder="Décrivez votre projet..."
                rows={6}
                required
              />
            </div>

            <button type="submit" className={styles.contact__submit}>
              Envoyer le message
            </button>
          </form>
        </section>
      </main>
      <Footer />
      <CustomCursor />
    </>
  );
}
