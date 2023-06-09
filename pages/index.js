import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import CocktailCard from '@/components/CocktailCard'
import SearchBar from '@/components/SearchBar'
import { useRouter } from 'next/router'
import Image from 'next/image'
import logo from '../public/icons/svg/cocktail-lover-low-resolution-logo-white-on-transparent-background.svg'

const inter = Inter({ subsets: ['latin'] })

export default function Home({data, query}) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>Cocktail Lover</title>
        <meta name="description" content="Come to enjoy your next drink !" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/svg/favicon.svg"/>
      </Head>
      <main className={styles.main}>
        <section className={styles.hero_banner} role="banner">
          <video playsInline autoPlay muted loop id="heroVideo" className={styles.hero_banner_video}>
            <source src="lemonadeC.mp4" type="video/mp4" />
          </video>
          <div className={styles.hero_banner_texts_container}>
            <div className={styles.hero_banner_fade}></div>
            <div className={styles.hero_banner_texts}>
              <Image src={logo} alt="Logo" className={styles.logo_img} priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"></Image>
                <h2>
                  <span>ALWAYS BE</span>
                  <div className={styles.message}>
                    <div>HYDRATED</div>
                    <div>HAPPY</div>
                    <div>KIND</div>
                  </div> 
                </h2>
              <div className={styles.hero_banner_search}>
                <SearchBar />
              </div>
            </div>
          </div>
        </section>
        <div id='#cocktails'></div>
        {!data['drinks']
          ? <div className={styles.no_result_container}>
              <h2 className={styles.no_result_text}>No Cocktails Found</h2>
              <h2 className={styles.no_result_text}>No Cocktails Found</h2>
            </div>
          : <section className={styles.cocktails_section}>
              <h2>Our cocktails selection</h2>
              <div className={styles.cocktails}>
                {data['drinks'].map((cocktail) => {
                  return <CocktailCard key={cocktail.idDrink} cocktail={cocktail}></CocktailCard>
                })}
              </div>
            </section>
          }
      </main>
    </>
  )
}

export async function getServerSideProps(context) {
  let res = null;
  let data = null;
  
  if (context.query.query) {
    if (context.query.query.includes('s=')) {
      res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?${context.query.query}`)
    } else {
      res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?${context.query.query}`)
    }
  } else {
      res = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=are")
  }

  try {
    data = await res.json()
  } catch (err) {
    data = {}
  }

  return {props: {data}}
}


/**
 * Query params
 */