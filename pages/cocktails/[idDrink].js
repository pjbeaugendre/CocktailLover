import {useState} from 'react'
import styles from '@/styles/CocktailPage.module.css'
import Head from 'next/head'
import {getIngredients} from '@/utils/getIngredients';
import {getMeasures} from '@/utils/getMeasures';
import Link from 'next/link';
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon
} from 'next-share';
import SearchBar from '@/components/SearchBar';
import Image from 'next/image';
import logo from '../../public/icons/svg/cocktail-lover-high-resolution-logo-black-on-transparent-background.svg'

export default function Cocktail({cocktail}) {
  const ingredients = getIngredients(cocktail);
  const measures = getMeasures(cocktail);
  const [searchVisible, setSearchVisible] = useState(false);

  return (
    <>
      <Head>
        <title>{cocktail.strDrink}</title>
        <meta name="description" content="Cocktail page information" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/svg/logo-no-background.svg" />
      </Head>
      <main className={styles.main}>
        <header className={styles.header}>
          <Link href={'/'}>
            <Image alt='Logo' src={logo} className={styles.logo}></Image>
          </Link>

          <div className={styles.search}>
            {searchVisible
              ? <SearchBar />
              : <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" onClick={() => {setSearchVisible(true)}}><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Search_Magnifying_Glass"> <path id="Vector" d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" stroke="#1c2222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
            }
          </div>
        </header>
        <h1 className={styles.h1}>
          {cocktail.strDrink} - {cocktail.strCategory.toUpperCase()}
        </h1>
        <div className={styles.custom_shape_divider_top}>
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={styles.shape_fill}></path>
          </svg>
        </div>
        {/* <Image alt='cocktail Image' src={cocktail.strDrinkThumb} fill className={styles.card_image}></Image> */}
        <div className={styles.container}>
          <section className={styles.image}>
            <Image alt="Cocktail Picture" src={cocktail.strDrinkThumb} className={styles.card_image} fill></Image>
          </section>
          <section className={styles.ingredients}>
            <h2 className={styles.h2}>Ingredients</h2>
            {ingredients.map((ingredient, index) => {
              return (
                <div key={index} className={styles.ingredient}>
                  <div className={styles.ingredient_name}>
                  &#10002; {ingredient}
                  {measures[index] &&
                    <span className={styles.ingredient_measure}>
                      &nbsp; - {measures[index]}
                    </span>
                  }
                  </div>
                </div>
              )
            })}
          </section>
          <section className={styles.instructions}>
            <h2 className={styles.h2}>Instructions</h2>
            <p>{cocktail.strInstructions}</p>
          </section>
          <section className={styles.social_media}>
            <h2 className={styles.h2}>Share it</h2>
            <WhatsappShareButton
              title={`What do you think about this cocktail, ${cocktail.strDrink} ?`}
              url={`${process.env.NEXT_PUBLIC_HOST}cocktails/${cocktail.idDrink}`} >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>

            <FacebookShareButton
              href={`${process.env.NEXT_PUBLIC_HOST}cocktails/${cocktail.idDrink}`}
              quote={`${cocktail.strDrink}. I think you will like it!`}
              hashtag={'#cocktaillover'}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={`${process.env.NEXT_PUBLIC_HOST}cocktails/${cocktail.idDrink}`}
              title={`${cocktail.strDrink}. I think you will like it!`}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <EmailShareButton
              url={`${process.env.NEXT_PUBLIC_HOST}cocktails/${cocktail.idDrink}`}
              subject={'This cocktail is amazing!'}
              body="I think you will like it!"
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </section>
        </div>
        </main>
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${context.params.idDrink}`)
  const cocktail = await res.json()

  return {props: {cocktail: cocktail['drinks'][0]}}
}