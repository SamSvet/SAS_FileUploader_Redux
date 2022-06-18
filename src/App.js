import React from "react"
import './App.css'
import {NavigationBar} from "./components/NavigationBar/NavigationBar"
import {UploaderContextProvider} from "./providers/UploaderContextProvider";
import {BackDrop} from "./components/BackDrop/BackDrop";
import {FileParamsCard} from "./components/cards/fileparams/FileParamsCard";
import {SelectFileCard} from "./components/cards/selectfile/SelectFileCard";
import {ResultCard} from "./components/cards/result/ResultCard";
import {InfoModal} from "./components/InfoModal/InfoModal";

function App() {
  return (
      <>
          <UploaderContextProvider>
              <NavigationBar/>
              <FileParamsCard/>
              <SelectFileCard/>
              <ResultCard/>
          </UploaderContextProvider>
          <BackDrop/>
          <InfoModal/>
      </>
  );
}

export default App;