import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import styles from '@/styles/Search.module.css'

const SearchBar = () => {
  const [value, setValue] = useState(""); // value displayed in input
  const [prefix, setPrefix] = useState("s="); // prefix for the research. Default Cocktail
  const [query, setQuery] = useState(""); // Final query

  const updateQuery = (e) => {
    let newQuery = prefix + e.target.value;
    setQuery(newQuery)
    setValue(e.target.value)
  }

  const checkboxChanged = (e) => {
    let newQuery = prefix + e.target.value;
    
    if (e.target.checked) {
      setPrefix("i=")
      setQuery('i=' + value)
    } else {
      setPrefix("s=")
      setQuery('s=' + value)
    }
  }

  return (
    <>
      <form className={styles.search_bar} action='true' submit='Submit'>
        <div className={styles.content}>
          <input type="checkbox" id="switch" className={styles.checkbox} onChange={(e) => checkboxChanged(e)}></input>
          <label htmlFor="switch" className={styles.label}>
            <div className={styles.toggle}></div>
            <div className={styles.names}>
              <p className={styles.light}>Cocktail</p>
              <p className={styles.dark}>Ingredient</p>
            </div>
          </label>
        </div>
        <div className={styles.text_input_container}>
          <input type="search"  placeholder='Mojito...' className={styles.text_input} onChange={(e) => {updateQuery(e)}}/>
          <Link href={{ pathname: '/', query: { query } }}>
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="Interface / Search_Magnifying_Glass"> <path id="Vector" d="M15 15L21 21M10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g> </g></svg>
            <input type="submit" id="myBtn" value="Submit" className={styles.enter_key}/>
          </Link>
        </div>
      </form>
    </>
  )
}

export default SearchBar
