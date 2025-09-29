import React from 'react';

function UserForm({ name, email, onNameChange, onEmailChange, onSubmit })
{
    return (
        <form onSubmit={onSubmit} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px' }}>
            <h2>Új felhasználó hozzáadása</h2>
            <input
                type="text"
                placeholder="Név"
                value={name}
                onChange={onNameChange}
                style={{ marginRight: '10px', padding: '5px' }}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={onEmailChange}
                style={{ marginRight: '10px', padding: '5px' }}
            />
            <button type="submit" style={{ padding: '5px 10px' }}>Hozzádás</button>
        </form>
    );
}

export default UserForm;