import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UserForm from './UserForm.jsx';
import UserTable from './UserTable.jsx';

import './App.css';

function App()
{
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const [editingId, setEditingId] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');


    const fetchData = async () =>
    {
        setLoading(true);

        try
        {
            const response = await axios.get('http://localhost:3001/api/users');
            setUsers(response.data);
            setError(null);
        }
        catch (err)
        {
            setError("Nem sikerült betölteni az adatokat.");
        }
        finally
        {
            setLoading(false);
        }
    };

    useEffect(() =>
    {
        fetchData();
    }, []);

    const handleSubmit = async (event) =>
    {
        event.preventDefault();

        if (!name || !email)
        {
            alert("A név és az email megadása kötelező!");
            return;
        }

        try
        {
            await axios.post('http://localhost:3001/api/users', { name, email });
            fetchData();
            setName('');
            setEmail('');
        }
        catch
        {
            setError("Hiba történt a felhasználó hozzáadása közben.");
        }
    };

    const handleDelete = async (id) =>
    {
        if (!window.confirm(`Biztosan törölni szeretnéd a(z) ${id} ID-jű felhasználót?`)) return;

        try
        {
            await axios.delete(`http://localhost:3001/api/users/${id}`);
            fetchData();
        }
        catch
        {
            setError("Nem sikerült törölni a felhasználót.");
        }
    };

    const handleEditStart = (user) =>
    {
        setEditingId(user.id);
        setEditedName(user.name);
        setEditedEmail(user.email);
    };

    const handleEditCancel = () =>
    {
        setEditingId(null);
    };

    const handleEditChange = (field, value) =>
    {
        if (field === 'name') setEditedName(value);
        if (field === 'email') setEditedEmail(value);
    };

    const handleUpdate = async (id) =>
    {
        if (!editedName || !editedEmail)
        {
            alert("A név és az email mező kitöltése kötelező!");
            return;
        }

        try
        {
            await axios.patch(`http://localhost:3001/api/users/${id}`,
            {
                name: editedName,
                email: editedEmail,
            });

            setEditingId(null);
            fetchData();
        }
        catch
        {
            setError("Nem sikerült módosítani a felhasználót.");
        }
    };

    if (loading) return <div className="App"><p>Adatok betöltése...</p></div>;
    if (error) return <div className="App"><p style={{ color: 'red' }}>{error}</p></div>;

    return (
        <div className="App">
            <h1>Felhasználókezelő (Full-Stack CRUD)</h1>
            <UserForm
                name={name}
                email={email}
                onNameChange={(e) => setName(e.target.value)}
                onEmailChange={(e) => setEmail(e.target.value)}
                onSubmit={handleSubmit}
            />
            <hr />
            <h2>Felhasználók Listája</h2>
            <UserTable
                users={users}
                editingId={editingId}
                editedName={editedName}
                editedEmail={editedEmail}
                onEditStart={handleEditStart}
                onEditCancel={handleEditCancel}
                onEditChange={handleEditChange}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
            />
        </div>
    );
}

export default App;