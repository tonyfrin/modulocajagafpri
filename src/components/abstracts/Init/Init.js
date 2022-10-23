import React from "react";
import { MainMenu } from "../Menu/MainMenu";


const Init = (props) => {

  return(
    <>
      <MainMenu 
        Buttons={props.buttons}
      />
    </>
  )

}

export {Init};