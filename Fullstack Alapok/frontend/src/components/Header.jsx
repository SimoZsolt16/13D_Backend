import React from 'react';

function Header({ currentPage, onPageChange })
{
    const headerStyle = { display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f4f4f4', borderBottom: '1px solid #ccc' };

    const buttonStyle = (isActive) =>
    ({
        padding: '10px 15px',
        margin: '0 5px',
        backgroundColor: isActive ? '#007BFF' : '#f0f0f0',
        color: isActive ? 'white' : 'black',
        border: 'none',
        cursor: 'pointer',
        borderRadius: '5px',
    });

    return (
        <header style={headerStyle}>
            <h1>Felhasználókezelő</h1>
            <nav>
                <button style={buttonStyle(currentPage === 'home')} onClick={() => onPageChange('home')}>Főoldal</button>
                <button style={buttonStyle(currentPage === 'register')} onClick={() => onPageChange('register')}>Új felhasználó</button>
                <button style={buttonStyle(currentPage === 'about')} onClick={() => onPageChange('about')}>Névjegy</button>
                <button style={buttonStyle(currentPage === 'contact')} onClick={() => onPageChange('contact')}>Kapcsolat</button>
            </nav>
        </header>
    );
}

export default Header;