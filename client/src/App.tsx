import React from 'react';
import style from './styles.module.scss';
import { Footer } from './Layout/Footer/Footer';
import { Header } from './Layout/Header/Header';
import { Main } from './Layout/Main/Main';

function App() {
    return (
        <div className={style.container}>
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
