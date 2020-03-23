import React, { useState } from 'react';
import './App.css';

function App() {
  const [imgUrl, setImgUrl] = useState('')
  const [classifiers, setClassifiers] = useState([])
  const [watsonError, setWatsonError] = useState('')

  const handleChange = async e => {
    const inputImgUrl = e.currentTarget.value
    setImgUrl(inputImgUrl)
  }

  const handleWatson = async () => {
    const apiUrl = 'https://gateway.watsonplatform.net/visual-recognition/api/v3/classify'
    const apiKey = 'EZSeU_FMhsuXoz3mS2tfzPHUxHesDqxqRwpBq63v0uge'
    const version = '2018-03-19'
    const classifierIds = 'default'

    const params = {
      url: imgUrl,
      version: version,
      classifier_ids: classifierIds
    };
    const urlParams = new URLSearchParams(Object.entries(params));

    const response = await fetch(`${apiUrl}?` + urlParams, {
      headers: new Headers({ 'Authorization': 'Basic ' + btoa('apiKey:' + apiKey) })
    })
    const json = await response.json()
    if (response.ok) {
      setClassifiers(json.images[0].classifiers[0].classes)
      setWatsonError('')
    } else {
      setClassifiers([])
      setWatsonError(json.images[0].error.description)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={imgUrl} className="App-logo" alt="logo" />

        <label htmlFor='imgUrlId'>Url de Imagen</label>
        <input id='imgUrlId' value={imgUrl} onChange={handleChange} />

        <button onClick={handleWatson}>Obtener Información (Watson)</button>
        <ul>
          {classifiers.map(classifier =>
            <li key={classifier.class}>{classifier.class} {classifier.score}</li>
          )}
        </ul>
          <h1>{watsonError}</h1>
      </header>
    </div>
  );
}

export default App;
