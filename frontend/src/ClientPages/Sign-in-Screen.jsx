import '../css/sign-in-screen.css';
import Image from '../assets/sign-up-img.jpg';
import Logo from '../assets/harvest-logo-colored.png';
import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // import the auth context
import { Link } from 'react-router-dom';
import { CircleArrowLeft } from 'lucide-react';

function SignInScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    console.log('[SignInScreen] Rendering with state:', { email, error });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            console.log('[SignInScreen] Attempting login');
            const user = await login(email, password);
            console.log('[SignInScreen] Login successful, user:', user);

            // Save extra info if needed (not required, but fine)
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userName', `${user.firstName} ${user.lastName}`);

            // Navigate based on userType
            const redirectPath = user.userType === 'merchant' 
                ? '/admin-dashboard' 
                : '/home-page';

            console.log('[SignInScreen] Navigating to:', redirectPath);
            navigate(redirectPath);

        } catch (err) {
            console.error('[SignInScreen] Login error:', {
                message: err.message,
                details: err.details,
                original: err.originalError
            });
            setError(err.details || err.message || 'Login failed. Please try again.');
        }
    };
        
    return (
        <div className="sign-in-bg">
            <div className="sign-in-box">
                <div className="sign-in-left">
                    <Link to="/">
                        <CircleArrowLeft className="sign-in-up-back-button"/>
                    </Link>
                    <img src={Logo} className="sign-in-logo" alt="Harvest Logo" />
                    <div className="text-content">
                        <h1 className="sign-in-title">Sign in</h1>
                        <p className="sign-in-tagline">Mabuhay Ka-Harvest! Mag-login!</p>
                        <form className="sign-in-form" onSubmit={handleSubmit}>
                            <label htmlFor="email" className="sign-in-label">EMAIL</label>
                            <input
                                type="email"
                                id="email"
                                className="sign-in-input"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="password" className="sign-in-label">PASSWORD</label>
                            <input
                                type="password"
                                id="password"
                                className="sign-in-input"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className="sign-in-btn">SIGN IN</button>
                        </form>
                    </div>
                    <div className="sign-in-footer">
                        <span>Don't have an account? </span>
                        <a href="#" className="sign-up-link" onClick={() => navigate('/sign-up-screen-1')}>Sign up now!</a>
                    </div>
                </div>
                <div className="sign-in-right">
                    <img src={Image} className="sign-in-image" alt="Sign In Visual" />
                </div>
            </div>

            {error && (
                <div className="error-popup">
                    <div className="error-popup-content">
                        <p>{error}</p>
                        <button onClick={() => setError('')}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SignInScreen;
