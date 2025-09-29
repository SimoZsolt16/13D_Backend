import React from 'react';
import UserRow from './UserRow';

function UserTable
({
    users,
    editingId,
    editedName,
    editedEmail,
    onEditStart,
    onEditCancel,
    onEditChange,
    onUpdate,
    onDelete,
})
{
    const tableHeaderStyle = { border: '1px solid #ccc', padding: '10px', backgroundColor: '#f0f0f0' };
    const noUsersCellStyle = { border: '1px solid #ccc', padding: '10px', textAlign: 'center' };

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th style={tableHeaderStyle}>#ID</th>
                    <th style={tableHeaderStyle}>Név</th>
                    <th style={tableHeaderStyle}>Email</th>
                    <th style={tableHeaderStyle}>Regisztráció</th>
                    <th style={tableHeaderStyle}>Műveletek</th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 ? (
                    users.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            editingId={editingId}
                            editedName={editedName}
                            editedEmail={editedEmail}
                            onEditStart={onEditStart}
                            onEditCancel={onEditCancel}
                            onEditChange={onEditChange}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" style={noUsersCellStyle}>Nincsenek felhasználók az adatbázisban.</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default UserTable;