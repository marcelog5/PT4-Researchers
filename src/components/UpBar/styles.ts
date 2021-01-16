import styled from 'styled-components';

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 60px;
  background-color: #cceff1;

  .logo {
    background-color: black;
    color: white;
    padding: 0 20px;
  }

  .bar {
    display: flex;
    align-items: center;
    margin-right: 2%;
    font-size: 24px;
  }

  .bar ul {
    display: flex;
    flex-direction: row;
    list-style: none;
  }

  .bar ul li {
    margin: 0 15px;
    cursor: pointer;
  }

  .bar ul li:hover {
    color: #ffbfb9;
    transition: 0.5s;
  }
`;
