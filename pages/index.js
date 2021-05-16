import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
function Home({ albums }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Photo Blog</title>
        <meta name="description" content="Oskar Lindgren's Photo Blog" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Photo Blog
        </h1>

        <h2>Albums</h2>
        {albums.map((x, i) => (
          <Link key={i} href={`/album/${x}`}>
            <a className={styles.albumLink}>{x}</a>
          </Link>
        ))}

      </main>
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  const res = await fetch('https://photos.oskarlindgren.se/list')
  const json = await res.json()
  return { albums: json }
}

export default Home;
