import Gallery3D from '@/components/Gallery3D';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.scss';

export default function GalleryPage() {
  return (
    <>
      <Header />
      <Gallery3D />
      <div className={styles.galleryPage__footer}>
        {/* <Footer /> */}
      </div>
    </>
  );
}
