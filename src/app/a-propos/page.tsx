import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import aboutData from "@/data/about.json";
import styles from "./page.module.scss";

interface AboutData {
  hero: {
    title: string;
    subtitle: string;
  };
  about: {
    title: string;
    description: string;
    services: Array<{
      id: string;
      title: string;
      description: string;
    }>;
  };
  stats: Array<{
    number: string;
    label: string;
  }>;
}

export default function AboutPage() {
  const data = aboutData as AboutData;

  return (
    <>
      <Header variant="light" />
      <main className={styles.about}>
        <section className={styles.about__hero}>
          <h1 className={styles.about__heroTitle}>{data.hero.title}</h1>
          <p className={styles.about__heroSubtitle}>{data.hero.subtitle}</p>
        </section>

        <section className={styles.about__content}>
          <div className={styles.about__main}>
            <h2 className={styles.about__title}>{data.about.title}</h2>
            <p className={styles.about__description}>{data.about.description}</p>
            
            <div className={styles.about__services}>
              {data.about.services.map((service) => (
                <div key={service.id} id={service.id} className={styles.about__service}>
                  <h3 className={styles.about__serviceTitle}>{service.title}</h3>
                  <p className={styles.about__serviceDescription}>{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.about__stats}>
            {data.stats.map((stat: { number: string; label: string }, index: number) => (
              <div key={index} className={styles.about__stat}>
                <span className={styles.about__statNumber}>{stat.number}</span>
                <span className={styles.about__statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <CustomCursor />
    </>
  );
}
