import React, {SetStateAction, useState, useEffect} from 'react'
import './App.css'
import Tweet from './Tweet.jsx'

function App() {
  const [tweetLink, setTweetLink] = useState<string>('')
  const [tweetIds, setTweetIds] = useState<string[]>([])

  useEffect(() => {
    const storedTweetIds = localStorage.getItem("tweetIds")
    if(storedTweetIds){
      setTweetIds(JSON.parse(storedTweetIds))
    }
  }, [])

  function handleClick(){
    const regex: RegExp = /status\/(\d+)/
    const match = tweetLink.match(regex)
    const tweetId = match ? match[1] : null
    if (tweetId) {
        setTweetIds((prevIds) => {
          const updatedIds = [...prevIds, tweetId]
          localStorage.setItem("tweetIds", JSON.stringify(updatedIds))
          return updatedIds
        })
    }
    setTweetLink("")
    console.log(tweetIds)
  }
  
  function handleChange(e: { target: { value: SetStateAction<string>; }; }){
    setTweetLink(e.target.value)
  }

  return (
    <div className="App">
        <div className="input-field">
          <input type="text" className="input-text" value={tweetLink} onChange={handleChange}/>
          <button className="input-button" onClick={handleClick}>Bookmark</button>
        </div>
        {tweetIds.map((tweetId) =>
                tweetId ? 
                <Tweet key={tweetId} tweetId={tweetId} setTweetIds={setTweetIds} />
                : null
        )}
    </div>
  );
}

export default App;


