import React, { useContext } from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { Pie, Column, Bar, Doughnut } from './Charts';
const Repos = () => {
  const { repos } = useContext(GithubContext);

  const Languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    if (!total[language]) {
      total[language] = {
        value: 1,
        label: language,
        stars: stargazers_count
      }
    }else {
        total[language] = {
          ...total[language],
          value: total[language].value + 1,
          stars: total[language].stars + stargazers_count
        }
      }
    return total;
  }, {});

  const mostUsed = Object.values(Languages).sort((a, b) => {
    return b.value - a.value;
  })
    .slice(0, 5);

  const mostPopular = Object.values(Languages).sort((a, b) => {
    return b.value - a.value;
  })
    .map((item) => {
    return { ...item, value: item.stars };
  })
    .slice(0, 5);
  
  let { stars, forks } = repos.reduce((total, item) => {
    const { name, stargazers_count, forks } = item;
    total.stars[stargazers_count] = {
      value: stargazers_count,
      label: name,
    };
    total.forks[forks] = {
      label: name,
      value: forks
    };
    return total;
  },{
    stars: {},
    forks:{},
  })

  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();
  
  return (
    <section className="section">
      <Wrapper className='section-center'>
        <Pie data={mostUsed} />
        <Column data={stars} />
        <Doughnut data={mostPopular} />
        <Bar data={forks}/>
    </Wrapper>
    </section>
  )
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
