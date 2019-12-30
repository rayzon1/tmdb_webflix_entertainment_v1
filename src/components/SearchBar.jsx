import React, { useEffect } from 'react';
import styles from '../modules/component-modules/searchbar-comp.module.css';

export default function SearchBar({ search, clear }) {

    const inputRef = React.createRef();

    useEffect(() => {
        if(clear) {
            inputRef.current.value = null;
        }
    }, [clear])


    return (
        <div className={styles.flexbox}>
            <div className={styles.search}>
                <div>
                    <input type="text" placeholder="  Search . . ." required  onChange={e => search(e.target.value) } ref={inputRef}/>
                </div>
            </div>
        </div>
    )
}