import axios from 'axios';
const githubApi = (strings: TemplateStringsArray) => `https://api.github.com${strings[0]}`;

export const getRepos = async () => {
  return await axios.get(githubApi`/repositories`, {
    headers: {
      Accept: 'application/vnd.github.v3+json',
    },
  });
};
