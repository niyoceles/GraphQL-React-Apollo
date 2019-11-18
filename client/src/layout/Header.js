import React from 'react';

function Header() {
  return (
    <header style={styleHeader}>
      <h1>GraphQL server and React+Apollo</h1>
    </header>
  )
}

const styleHeader = {
  background: '#fff',
  color: '#333',
  textAlign: 'center',
  padding: '10px'
}

export default Header;