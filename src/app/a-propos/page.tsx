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
    skills: string[];
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
      <Header />
      <main className={styles.about}>
        <section className={styles.about__hero}>
          <h1 className={styles.about__heroTitle}>{data.hero.title}</h1>
          <p className={styles.about__heroSubtitle}>{data.hero.subtitle}</p>
        </section>

        <section className={styles.about__content}>
          <div className={styles.about__main}>
            <h2 className={styles.about__title}>{data.about.title}</h2>
            <p className={styles.about__description}>{data.about.description}</p>
            
            <div className={styles.about__skills}>
              <h3 className={styles.about__skillsTitle}>Compétences</h3>
              <ul className={styles.about__skillsList}>
                {data.about.skills.map((skill: string, index: number) => (
                  <li key={index} className={styles.about__skill}>{skill}</li>
                ))}
              </ul>
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
