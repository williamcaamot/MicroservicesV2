import AuthLayout from "../../components/common/AuthLayout";
import {useContext, useState} from "react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import {useNavigate} from "react-router-dom";
import {AppContext} from "../../context/AppContext";

export default function Register() {

    const navigate = useNavigate();

    const {setAccount} = useContext(AppContext)

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");


    async function postRegister(event) {
        event.preventDefault();
        setIsLoading(true)
        try {
            const result = await fetch("/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/JSON"
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            })
            if (!result.ok) {
                console.log("Something went wrong, status: " + result.status)
                setError("Something went wrong");
                setIsLoading(false)
                return
            }
            const data = await result.json();
            setAccount(data)
            navigate("/app")
        } catch (e) {
            setError("Something went wrong when registering")
            console.log(e)
        }
        setIsLoading(false);
    }


    return (
        <AuthLayout>
            <form className="mt-8 space-y-6" onSubmit={(event) => {
                postRegister(event)
            }}>
                <input type="hidden" name="remember" value="true"/>
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="name" className="sr-only">
                            Username
                        </label>
                        <input
                            autoFocus={true}
                            id="Username"
                            name="Username"
                            type="text"
                            autoComplete="Username"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Email address
                        </label>
                        <input
                            id="email-address"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address"
                            value={email}
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {isLoading ? <LoadingSpinner/> : "Register"}
                    </button>
                </div>
            </form>
            <span className={""}>Already have an account? <button className={"underline"}
                                                                  onClick={() => navigate("/auth/login")}>Sign in</button></span>
        </AuthLayout>
    );
}