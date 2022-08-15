import React, { useState, useEffect } from 'react';
import mockUser from './mockData.js/mockUser';
import mockRepos from './mockData.js/mockRepos';
import mockFollowers from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

const GithubContext = React.createContext();

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser);
  const [repos, setRepos] = useState(mockRepos);
  const [followers, setFollowers] = useState(mockFollowers);
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState(0);
  const [error, setError] = useState({
    show: false,
    msg: '',
  });

  const searchUser = async (user) => { 
    toggleError();
    setIsLoading(true);
    const response = await axios(`${rootUrl}/users/${user}`)
      .catch(error => console.log(error));
    if (response) {
      setGithubUser(response.data)
      const { login, followers_url } = response.data;
      await Promise.allSettled([
        axios(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios(`${followers_url}?per_page=100`)
      ])
        .then((results) => {
          const [repos, followers] = results;
          const status = 'fulfilled';
          if (repos.status === status) {
            setRepos(repos.value.data);
          }
          if (followers.status === status) {
            setFollowers(followers.value.data);
          }
        })
        .catch(err => console.log(err));
    } else {
      toggleError(true, 'there is no user with that username');
    }
    checkRequest();
    setIsLoading(false);
  };

  const checkRequest =  () => { 
     axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        const {
          rate: {
            remaining
          }
        } = data;
        setRequests(remaining);
        if (remaining === 0) {
          toggleError(true, 'sorry, You have exceeded your hourly rate limit!')
        }
       })
      .catch(err=>console.log(err));
  };
  
  useEffect(checkRequest, []);

  const toggleError = (show = false, msg = '') => {
    setError(msg, show);
  };
  
  return (
    <GithubContext.Provider value={{
      githubUser,
      repos,
      followers,
      isLoading,
      requests,
      error,
      searchUser
    }}>
      {children}
    </GithubContext.Provider>
  )
}

export { GithubProvider, GithubContext };
