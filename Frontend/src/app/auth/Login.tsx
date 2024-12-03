import AuthLayout from "../../components/common/AuthLayout";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AppContext} from "../../context/AppContext";

export default function Login() {
    const navigate = useNavigate();

    const {account, setAccount} = useContext(AppContext);


    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    async function handleLogin(event){
        event.preventDefault();
        try{
            const result = await fetch("/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "content-type":"Application/JSON"
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            if(result.ok){
                console.log("Succesffully signed in")
                const data = await result.json();
                setAccount(data);
                navigate("/app")
            }
        }catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if(account) navigate("/app")
    }, []);



    return (
        <AuthLayout>
            <form onSubmit={(event) => handleLogin(event)} className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label htmlFor="email-address" className="sr-only">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="username"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Username"
                            value={username}
                            onChange={(event) => {setUsername(event.target.value)}}
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
                            autoComplete="current-password"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password"
                            value={password}
                            onChange={(event) => {setPassword(event.target.value)}}
                        />
                    </div>
                </div>

                <div>
                    <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign in
                    </button>
                </div>
            </form>
            <span className={""}>New here? <button className={"underline"}
                                                                  onClick={() => navigate("/auth/register")}>Sign up</button></span>
        </AuthLayout>
    );
}