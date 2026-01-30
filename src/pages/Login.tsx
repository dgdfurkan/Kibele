import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Map username to email address
        const email = `${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@kibele.app`;

        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
                // After registration, user is signed in automatically
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }

            localStorage.setItem('isAuthenticated', 'true');
            navigate('/');
        } catch (err: any) {
            console.error("Auth failed", err);
            if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters');
            } else if (err.code === 'auth/email-already-in-use') {
                setError('Username already taken');
            } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                setError('Invalid username or password');
            } else {
                setError(err.message || 'Authentication failed');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white overflow-hidden h-screen w-screen relative selection:bg-primary/30 flex items-center justify-center">
            {/* Background Canvas Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute inset-[-50%] w-[200%] h-[200%] bg-dot-pattern bg-[length:32px_32px] opacity-[0.08] dark:opacity-[0.15]"></div>
            </div>

            {/* Decorative Floating Elements */}
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none select-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.4, scale: 1 }} transition={{ duration: 1, delay: 0.2 }}
                    className="absolute -top-10 -left-10 w-64 h-80 rotate-[-12deg] blur-[2px] rounded-lg overflow-hidden border-4 border-white dark:border-white/10 shadow-xl"
                >
                    <img alt="Decoration" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2ssva_Q-kBVxlILnyHkmkCFSjAJG9--Xlzuk5f_JEP7-FDwK0iR7oMu9Xct6HGaT8nWbHOvlJ3etGfyM8V17oW-y8A-MqN2E7BtGI34u6ahNggK1_sfuLVspu8sai0JDO7DQ_dCf3OTD_6uh4qAeSGKZzzqSNwpfDBLObza_4tAtQkdrU8v5bo8KA1UrNLX5im3nqnTTvgoZmtZXWWlgoPH2F7_vqFVfAWuQUtGpSR5jL0EAEBMi6Z5ha-nMerVeluWj7bh_yVyw" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }} animate={{ opacity: 0.5, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
                    className="absolute bottom-10 left-20 w-80 h-60 rotate-[6deg] blur-[1px] rounded-lg overflow-hidden border-4 border-white dark:border-white/10 shadow-2xl"
                >
                    <img alt="Decoration" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUNvqs_sebdU66YhjWqqYMlTOKw-zJbnuGmRWEtW8RjJfGp57G-18DJdT7pelfThl718I5_I-inTZxHxU1YKpiSpzHBBfDrdwz4TjlhFlVDd_UPAA8qA4KHc9IYxDl1ylgQH8sztNmkl580kXICtSx268GerZX7cDXnjNHOPplaRaWj0EbO1NU5bcl5LVBP97nUDkP_VI1G2Zngj_YjPQn9-oqmF5D5kVWLefsEFOUKQkn5D3iLuBNA7e5S8CXtxq2yalfEkmNE58" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }} animate={{ opacity: 0.4, x: 0 }} transition={{ duration: 1, delay: 0.3 }}
                    className="absolute top-20 -right-20 w-72 h-72 rotate-[15deg] blur-[2px] rounded-lg overflow-hidden border-4 border-white dark:border-white/10 shadow-xl"
                >
                    <img alt="Decoration" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOADySubwmjzJovbvJ3ku44p-jUKaIKrIMWwXIGU7ykWGEAH8a8lXTLBZt5j5Em6hpVDp41yl3jKIqx54bkypf0MM-QyslJhjryKuH3_OmgIaD94ONuDthCVZqOilxuqunUygbksEnXqa6uSPEZGATBEdNhRs_GAaxyoH-XmOGYK5wC0m70baTsgrYKRYfI4EmbR4RA2V5iDUuIhVj_ZyLc8jOAR3yFKHivarci-laRvjWGYemvIxNW6kAhXa4xc-SpvJQJT7jYqE" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ duration: 1, delay: 0.6 }}
                    className="absolute top-1/2 right-10 w-56 h-80 -translate-y-1/2 rotate-[-8deg] blur-[3px] rounded-lg overflow-hidden border-4 border-white dark:border-white/10 shadow-xl"
                >
                    <img alt="Decoration" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmaXQ1ctEJCIQql2-9JWNJdIf4XHIt4pAFnE9m1uqktEK1bWw1dJuxu_e_5-5876eSGHGjDDVU0wJHjlrQwB87Bmm2P1XKUkQnWfHjmjvrw9gU4McLvaYFz8UKJC4UCMKi2956iJ3aIu7rPBUFLOLcBTHBOxjMotr2CoLa2nHqafZ2J_60DH0Q1LHjZd4ukz2k--xQddUsaVXJvOQfTyedyatYjjhnbc4KstS3LeI44wwl0DjdW0jCqTaSY9hJb57_NkYz31kLDdI" />
                </motion.div>
            </div>

            {/* Login Card */}
            <motion.div
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md px-6"
            >
                <div className="bg-white/90 dark:bg-[#1c1f21]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] p-8 md:p-10">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center size-12 bg-primary/10 rounded-xl mb-4 text-primary">
                            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>palette</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Studio Access</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">Enter your personal workspace</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleAuth}>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider pl-1" htmlFor="username">
                                Username
                            </label>
                            <div className="relative group">
                                <input
                                    id="username" type="text" placeholder="kibele"
                                    value={username} onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-black/20 text-slate-900 dark:text-white px-4 py-3 focus:border-primary focus:ring-primary/20 dark:focus:ring-primary/20 transition-colors shadow-sm text-sm"
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>person</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between pl-1">
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider" htmlFor="password">
                                    Password
                                </label>
                                {!isRegistering && <a href="#" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">Forgot?</a>}
                            </div>
                            <div className="relative group">
                                <input
                                    id="password" type="password" placeholder="••••••••"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white dark:bg-black/20 text-slate-900 dark:text-white px-4 py-3 focus:border-primary focus:ring-primary/20 dark:focus:ring-primary/20 transition-colors shadow-sm text-sm"
                                />
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-primary transition-colors">
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>lock</span>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <p className="text-red-500 text-xs text-center font-bold">{error}</p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-lg font-bold text-sm hover:bg-slate-800 dark:hover:bg-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 mt-2 ${loading ? 'opacity-70 cursor-wait' : ''}`}
                        >
                            <span>{loading ? 'Processing...' : (isRegistering ? 'Create Account' : 'Sign In')}</span>
                            {!loading && <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-white/5 text-center">
                        <button
                            onClick={() => {
                                setIsRegistering(!isRegistering);
                                setError('');
                            }}
                            className="text-xs text-gray-500 dark:text-gray-400 font-medium hover:text-primary transition-colors focus:outline-none"
                        >
                            {isRegistering
                                ? "Already have an account? Sign In"
                                : <span>New to the studio? <span className="text-primary hover:underline decoration-2 underline-offset-2">Request access</span></span>
                            }
                        </button>
                    </div>
                </div>

                <div className="text-center mt-6 opacity-40 hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">Artistic Workspace v2.0</span>
                </div>
            </motion.div>
        </div>
    );
};
