const tweetsContainer = document.getElementById("tweetsContainer");
const usernameInput = document.querySelector(".username");
const tweetInput = document.querySelector(".tweet");
const submitButton = document.getElementById("submit");
const tweetTemplate = document.querySelector(".more_tweet");

let arrayOftweet=[];


submitButton.addEventListener("click", function () {
  const username = usernameInput.value;
  const tweetContent = tweetInput.value;
  if (username !== "" && tweetContent !== "") {

    const newTweet = tweetTemplate.cloneNode(true);

    const newuserName = newTweet.querySelector(".full_name");
    newuserName.textContent = username;

    const authernameElement = newTweet.querySelector(".tweet_username");
    authernameElement.textContent = "@" + username;  

    const newtexttweet = newTweet.querySelector(".tweet_text");
    newtexttweet.textContent = tweetContent;

    tweetsContainer.insertBefore(newTweet, tweetsContainer.firstChild);

    const tweetObject = {
      id:Date.now(),
      username: username,
      content: tweetContent,
      is_like:false,
    };

    arrayOftweet.push(tweetObject);

// localstorge
    localStorage.setItem('tweets', JSON.stringify(arrayOftweet));
   
    usernameInput.value = "";
    tweetInput.value = "";


// click the like button before localstorge
const favorite = newTweet.querySelector(".love");
favorite.addEventListener("click", function (event) {
  event.stopPropagation();
  const tweetID = tweetObject.id; 
  const tweet = arrayOftweet.find((t) => t.id === tweetID);
  if (tweet) {
    tweet.is_like = true;
    localStorage.setItem('tweets', JSON.stringify(arrayOftweet));
    favorite.style.color = tweet.is_like ? "red" : "black";
  }
});

// click the repeat button
    let selectedTweet = null;
    newTweet.addEventListener("click", function (event) {
      selectedTweet = this;
    });

    const repeatButton = document.querySelector(".repeat");
    repeatButton.addEventListener("click", function () {
      if (selectedTweet) {
        const clonetweet = selectedTweet.cloneNode(true);
        tweetsContainer.insertBefore(clonetweet, tweetsContainer.firstChild);
        const username = clonetweet.querySelector(".full_name").textContent;
        const tweetContent = clonetweet.querySelector(".tweet_text").textContent;
        const tweetObject = {
          id: Date.now(),
          username: username,
          content: tweetContent,
          is_like: false,
        };
        
        arrayOftweet.push(tweetObject);
        const favorite = clonetweet.querySelector(".love");
          favorite.addEventListener("click", function (event) {
            event.stopPropagation();
            const tweetID = tweetObject.id; 
            const tweet = arrayOftweet.find((t) => t.id === tweetID);
            if (tweet) {
              tweet.is_like = true;
              localStorage.setItem('tweets', JSON.stringify(arrayOftweet));
              favorite.style.color = tweet.is_like ? "red" : "black";
            }
          });
        localStorage.setItem('tweets', JSON.stringify(arrayOftweet));
      }
    });    
    
  }
});


// complete localstorg
const storetweets = localStorage.getItem('tweets');

if (storetweets) {
  const parsetweet = JSON.parse(storetweets);
  parsetweet.forEach((tweet) => {
    const newTweet = tweetTemplate.cloneNode(true);
    const fullName = newTweet.querySelector(".full_name");
    fullName.textContent = tweet.username;

    const newuserName = newTweet.querySelector(".tweet_username");
    newuserName.textContent = "@"+tweet.username;

    const newtexttweet = newTweet.querySelector(".tweet_text");
    newtexttweet.textContent = tweet.content;

    const favoritetwo = newTweet.querySelector(".love");
    favoritetwo.style.color = tweet.is_like ? "red" : "rgb(110, 118, 125)";
    
    tweetsContainer.insertBefore(newTweet, tweetsContainer.firstChild);

// click the like button after localstorge
      const favorite = newTweet.querySelector(".love");
      favorite.addEventListener("click", function (event) {
        event.stopPropagation();
        const tweetID = tweet.id; 
        const tweettwo = arrayOftweet.find((t) => t.id === tweetID);
        if (tweettwo) {
          tweet.is_like = true;
          localStorage.setItem('tweets', JSON.stringify(arrayOftweet));
          favorite.style.color = tweet.is_like ? "red" : "black";
        }
      });

// click the repeat button after localstorge

    newTweet.addEventListener("click", function (event) {
      selectedTweet = this;
    });

    const repeatButton = document.querySelector(".repeat");
    repeatButton.addEventListener("click", function () {
      if (selectedTweet) {
        const clonetweet = selectedTweet.cloneNode(true);
        tweetsContainer.insertBefore(clonetweet, tweetsContainer.firstChild);
        const username = clonetweet.querySelector(".full_name").textContent;
        const tweetContent = clonetweet.querySelector(".tweet_text").textContent;
        const tweetObject = {
          id: Date.now(),
          username: username,
          content: tweetContent,
          is_like: false,
        };
        
        arrayOftweet.push(tweetObject);
        const favorite = clonetweet.querySelector(".love");
        favorite.addEventListener("click", function (event) {
          event.stopPropagation();
          const tweetID = tweetObject.id; 
          const tweet = arrayOftweet.find((t) => t.id === tweetID);
          if (tweet) {
            tweet.is_like = true;

            localStorage.setItem('tweets', JSON.stringify(arrayOftweet));
            favorite.style.color = tweet.is_like ? "red" : "black";
          }
        });
        localStorage.setItem('tweets', JSON.stringify(arrayOftweet));
      }
    });  
  });

  arrayOftweet = parsetweet;
}

