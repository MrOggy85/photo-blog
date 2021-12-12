import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import styles from './style.module.css';

const BASE_URL = 'https://photos.oskarlindgren.se';
// const BASE_URL = 'http://localhost:3001';

const Album = ({ photos }) => {
  const router = useRouter();
  const { album } = router.query;

  return (
    <>
      <Head>
        <title>Photo Blog</title>
        <meta name="description" content="Oskar Lindgren's Photo Blog" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.backBtnWrapper}>
        <Link href="/">
          <a>Back</a>
        </Link>
      </div>
      <h1 className={styles.title}>{album}</h1>

      <div className={styles.photosWrapper}>
        {photos.map((x, i) => (
          <img key={i} className={styles.image} src={`${BASE_URL}/photo/${album}/${x.url}`} alt={x.alt} width={x.width} height={x.height} />
        ))}
      </div>
    </>
  );
};

Album.getInitialProps = async (ctx) => {
  const { album } = ctx.query;
  const encodedAlbum = encodeURIComponent(album);
  const res = await fetch(`${BASE_URL}/album/${encodedAlbum}`);
  const json = await res.json();
  return { photos: json };
};

export default Album;
