import React, { useEffect } from 'react'
import styles from '@/styles/Cocktail.module.css'
import Image from 'next/image'
import Link from 'next/link';
import {getIngredients} from '@/utils/getIngredients';

const CocktailCard = ({cocktail}) => {
  const ingredients = getIngredients(cocktail);

  return (
    <Link href={'/cocktails/' + cocktail.idDrink} className={styles.card}>
      <Image alt='cocktail Image' src={cocktail.strDrinkThumb} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className={styles.card_image}></Image>
      <div className={styles.card_content}>
        <div className={styles.card_title_container}>
          <h3 className={styles.card_title}>{cocktail.strDrink}</h3>
          {cocktail.strAlcoholic == "Alcoholic" ? <svg fill="#ffffff" height="40px" width="40px" version="1.1" id="Capa_1" viewBox="0 0 193.333 193.333"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M169.837,193.333H23.496c-1.104,0-2-0.896-2-2V2c0-1.104,0.896-2,2-2h146.341c1.104,0,2,0.896,2,2v189.333 C171.837,192.438,170.941,193.333,169.837,193.333z M25.496,189.333h142.341V4H25.496V189.333z M106.118,170.641 c-12.09,0-21.926-9.836-21.926-21.927v-36.543c0-8.828,5.243-16.454,12.78-19.927c-7.537-3.473-12.78-11.099-12.78-19.927V56.561 c0-12.091,9.836-21.927,21.926-21.927c12.091,0,21.927,9.836,21.927,21.927v15.757c0,8.828-5.243,16.454-12.78,19.927 c7.537,3.473,12.78,11.099,12.78,19.927v36.543C128.045,160.805,118.209,170.641,106.118,170.641z M106.118,94.244 c-9.885,0-17.926,8.042-17.926,17.927v36.543c0,9.885,8.042,17.927,17.926,17.927s17.927-8.042,17.927-17.927v-36.543 C124.045,102.286,116.003,94.244,106.118,94.244z M106.118,38.634c-9.885,0-17.926,8.042-17.926,17.927v15.757 c0,9.885,8.042,17.927,17.926,17.927s17.927-8.042,17.927-17.927V56.561C124.045,46.676,116.003,38.634,106.118,38.634z M61.76,169.658c-1.104,0-2-0.896-2-2V41.462L44.338,56.884c-0.78,0.781-2.048,0.781-2.828,0c-0.781-0.781-0.781-2.047,0-2.828 L60.346,35.22c0.571-0.572,1.432-0.743,2.179-0.434c0.748,0.31,1.235,1.039,1.235,1.848v131.024 C63.76,168.763,62.864,169.658,61.76,169.658z M141.087,46.277c-1.104,0-2-0.896-2-2v-8.792h-8.792c-1.104,0-2-0.896-2-2 s0.896-2,2-2h8.792v-8.793c0-1.104,0.896-2,2-2s2,0.896,2,2v8.793h8.793c1.104,0,2,0.896,2,2s-0.896,2-2,2h-8.793v8.792 C143.087,45.382,142.191,46.277,141.087,46.277z"></path> </g></svg> : ""}
        </div>
        {cocktail.strCategory
          ? <div className={styles.card_content_checker}>
              <p><strong>CATEGORY: </strong>{cocktail.strCategory.toUpperCase()}</p>
              <p><strong>INGREDIENTS: </strong>{
                ingredients.map((ingredient, index) => {
                  if (index === ingredients.length - 1) {
                    return (
                      <span key={index}>and {ingredient.toUpperCase()}.</span>
                    )
                  } else {
                    return (
                      <span key={index}>{ingredient.toUpperCase()}, </span>
                    )
                  }
                }
              )}
              </p>
          </div>
          : ''
        }
      </div>
    </Link>
  )
}

export default CocktailCard
