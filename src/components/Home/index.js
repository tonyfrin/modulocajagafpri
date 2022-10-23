import React from "react";
import users from "../abstracts/constants/Users";
import { MainMenu } from "../abstracts/Menu/MainMenu";

const Home = () => {
    
    const buttons = users.roles.asesor.home;


    return(
        <>
            <main className="gs-container gs-main-home">
                <MainMenu
                    Buttons={buttons}
                />
            </main>
        </>
    )

}

export default Home;