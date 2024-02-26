import styles from './Header.module.scss'

function Header() {
    return ( 
        <div className={styles['header']}>
            <div className={styles['header-inner']}>
                <h1>Valantis</h1>
                <a href='https://github.com/met43211' target='_blank'>©met43211</a>
            </div>
        </div>
     );
}

export default Header;