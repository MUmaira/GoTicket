// AuthComponent.js
import React, { useState } from 'react';
import { auth, database} from '../config/AuthDb';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import '../styles/loginCard.css'

const AuthManager = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState('signup'); 
  const navigate = useNavigate();

  const handleAuth = async () => {
   
    try {
      if (action === 'signup') {
        await auth.createUserWithEmailAndPassword(email, password);
        setAction('signin');
      } else if (action === 'signin') {
        await auth.signInWithEmailAndPassword(email, password);
        navigate('/dashboard')
      }

      const user = auth.currentUser;
      if (user) {
        // Saving user data to the "managers" table in Firebase Realtime Database
        await database.ref('managers/' + user.uid).set({
          email: user.email,
        });
      }

      console.log(`${action} successful`);
    } catch (error) {
      console.error(`${action} error:`, error.message);
    }
  };

  return (
    <div>
        <br />
    <Card className='custom-card2'>
    <Card.Body style={{zIndex:"1"}}>
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '40px', marginTop:"30px" }}>{action === 'signup' ? 'Signup' : 'Signin'}</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '30px', borderRadius:"10px", border:"1px solid #A9A9A9" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '30px', borderRadius:"10px",border:"1px solid #A9A9A9" }}
      />
      <button
        onClick={handleAuth}
        style={{
          backgroundColor: '#429e7f',
          color: 'white',
          padding: '10px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        {action === 'signup' ? 'Signup' : 'Signin'}
      </button>
      <p style={{ marginTop: '10px', fontSize: '14px' }}>
        {action === 'signup' ? "Already have an account? " : "Don't have an account? "}
        <span
          style={{ color: 'blue', cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => setAction(action === 'signup' ? 'signin' : 'signup')}
        >
          {action === 'signup' ? 'Signin' : 'Signup'}
        </span>
      </p>
    </div>
    </Card.Body>
    </Card>
    </div>
  );
};

export default AuthManager;
