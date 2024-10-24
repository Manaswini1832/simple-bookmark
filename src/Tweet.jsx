import React, {SetStateAction, useState, useEffect} from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

function Tweet(props){
    function deleteTweet(tweetId){
        props.setTweetIds((prevIds) => {
            const updatedIds = prevIds.filter((id) => id !== tweetId)
            localStorage.setItem("tweetIds", JSON.stringify(updatedIds))
            return updatedIds
        })
    }
    return (
        <div key={props.tweetId}>
            <TwitterTweetEmbed tweetId={props.tweetId} />
            <button onClick={() => deleteTweet(props.tweetId)}>Delete</button>
        </div> 
    );
}

export default Tweet;