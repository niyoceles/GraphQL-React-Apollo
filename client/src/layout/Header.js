import React from 'react';

 function Header() {
  return (
    <header style={styleHeader}>
      <h1>Todo List Application</h1>
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