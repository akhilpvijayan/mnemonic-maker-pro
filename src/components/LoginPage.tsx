import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Brain, Sparkles, ArrowRight, Eye, EyeOff, RefreshCw, ArrowLeft } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useDarkMode();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/');
        } catch (err: any) {
            if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
                setError('Invalid email or password');
            } else if (err.code === 'auth/invalid-email') {
                setError('Invalid email address');
            } else {
                setError('Failed to log in. Please try again.');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            setError('');
            setLoading(true);
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            setError('Failed to log in with Google.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`modern-auth-page`}>
            <button onClick={() => navigate(-1)} className="saved-back-btn back-button-global">
                <ArrowLeft size={20} />
            </button>
            {/* Left Side - Branding */}
            <div className="auth-left">
                <div className="auth-left-content">
                    <div className="brand-logo">
                        <Brain size={56} />
                        <Sparkles className="sparkle sparkle-1" size={24} />
                        <Sparkles className="sparkle sparkle-2" size={20} />
                        <Sparkles className="sparkle sparkle-3" size={18} />
                    </div>
                    <h1 className="brand-title">Mnemonic Maker Pro</h1>
                    <p className="brand-subtitle">Transform learning into remembering with AI-powered mnemonics</p>

                    <div className="features-list">
                        <div className="feature-item">
                            <div className="feature-icon">✨</div>
                            <div>
                                <h4>AI-Powered Generation</h4>
                                <p>Get 3 unique mnemonics instantly</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">🎯</div>
                            <div>
                                <h4>4 Generation Modes</h4>
                                <p>Acrostic, Story, Rhyme & Chunking</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <div className="feature-icon">💾</div>
                            <div>
                                <h4>Save & Sync</h4>
                                <p>Access your mnemonics anywhere</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="auth-right">
                <div className="auth-form-container">
                    <div className="auth-form-header">
                        <h2>Welcome Back</h2>
                        <p>Log in to access your saved mnemonics</p>
                    </div>

                    {error && (
                        <div className="modern-error-banner">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="modern-auth-form">
                        <div className="modern-input-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <Mail size={20} className="input-icon" />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="modern-input-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <Lock size={20} className="input-icon" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                    tabIndex={-1}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button type="button" className="forgot-password">
                            Forgot password?
                        </button>

                        <button type="submit" disabled={loading} className="modern-primary-btn">
                            {loading ? (
                                <>
                                    <RefreshCw size={20} className="spinning" />
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    Log In
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="auth-divider">
                        <span>or continue with</span>
                    </div>

                    <button
                        onClick={handleGoogleLogin}
                        className="modern-google-btn"
                        disabled={loading}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4" />
                            <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853" />
                            <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05" />
                            <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.192 5.736 7.396 3.977 10 3.977z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </button>

                    <p className="auth-switch-link">
                        Don't have an account? <a href="/signup">Sign up free</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;