import React, { useContext } from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';
import { GoRepo, GoGist } from 'react-icons/go';
import { FiUsers, FiUserPlus } from 'react-icons/fi';

const UserInfo = () => {
  const { githubUser } = useContext(GithubContext);

  const { 
    public_gists,
    public_repos,
    following,
    followers,
  } = githubUser;

  const items = [
    {
      id:1,
      value: public_gists,
      icons: <GoGist 
        className='icon'
      />,
      color: 'purple',
      label: 'gists',
    },
    {
      id:2,
      value: public_repos,
      icons: <GoRepo 
        className='icon'
      />,
      color: 'pink',
      label: 'repos',
    },
    {
      id:3,
      value: followers,
      icons: <FiUsers 
        className='icon'
      />,
      color: 'green',
      label: 'followers',
    },
    {
      id:4,
      value: following,
      icons: <FiUserPlus 
        className='icon'
      />,
      color: 'yellow',
      label: 'following',
    },
  ]

  return (
    <section className="section">
      <Wrapper className='section-center'>
      {items.map((item) => {
        return (
          <Items key={item.id} {...item}/>
        )
      })}
    </Wrapper>
    </section>
  )
};

const Items = ({ label, icons, color,value }) => {
  return (
    <article className="item">
      <span className={color}>{icons}</span>
      <div>
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </article>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem 2rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  }
  .item {
    border-radius: var(--radius);
    padding: 1rem 2rem;
    background: var(--clr-white);
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 3rem;
    align-items: center;
    span {
      width: 3rem;
      height: 3rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
    }
    .icon {
      font-size: 1.5rem;
    }
    h3 {
      margin-bottom: 0;
      letter-spacing: 0;
    }
    p {
      margin-bottom: 0;
      text-transform: capitalize;
    }
    .pink {
      background: #ffe0f0;
      color: #da4a91;
    }
    .green {
      background: var(--clr-secondary-10);
      color: var(--clr-secondary-5);
    }
    .purple {
      background: #e6e6ff;
      color: #5d55fa;
    }
    .yellow {
      background: #fffbea;
      color: #f0b429;
    }
  }
`;

export default UserInfo;
