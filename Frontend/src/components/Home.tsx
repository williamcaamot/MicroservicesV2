import {useNavigate} from "react-router-dom";
import {createContext, useContext, useEffect} from "react";
import {AppContext} from "../context/AppContext.ts";

export function Home() {
    const navigate = useNavigate()
    const {account} = useContext(AppContext);


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex-shrink-0">
                            <img src={"/logo.png"} className={"w-56"}/>
                        </div>
                        <div className="flex items-center space-x-4">
                            {account ? (
                                <button
                                    onClick={() => navigate('/app')}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    Dashboard
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate('/auth/login')}
                                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded transition duration-300"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => navigate('/auth/register')}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                                    >
                                        Register
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                            PG3402 Exam
                        </h2>
                        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                            Welcome to this Exam project for Microservices (PG3402) course.
                            Log in or register a new account to get started to test out functionality.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={() => navigate('/auth/register')}
                                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Register
                            </button>
                        </div>
                    </div>

                    <div className="mt-20">
                        <h3 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                            Key technical functionality
                        </h3>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {['API Gateway', 'Load Balancing', 'Containerization'].map((benefit) => (
                                <div key={benefit} className="pt-6">
                                    <div className="flow-root bg-white rounded-lg px-6 pb-8">
                                        <div className="-mt-6">
                                            <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                                                {/* Placeholder for icon */}
                                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{benefit}</h3>
                                            <p className="mt-5 text-base text-gray-500">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada nisi tellus, non imperdiet nisi tempor at.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
                    <div className="flex justify-center space-x-6 md:order-2">
                        {['Facebook', 'Twitter', 'GitHub'].map((item) => (
                            <a key={item} href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">{item}</span>
                                {/* Placeholder for social icons */}
                                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                                </svg>
                            </a>
                        ))}
                    </div>
                    <div className="mt-8 md:mt-0 md:order-1">
                        <p className="text-center text-base text-gray-400">
                            &copy; 2023 Your Company, Inc. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};