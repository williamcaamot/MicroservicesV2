import {useNavigate} from "react-router-dom";


export default function SignoutButton(){

    const navigate = useNavigate();

    async function handleSignout(){
        try{
            const result = await fetch("/api/v1/auth/signout", {
                method: "POST",
                headers: {
                    "content-type": "Application/JSON"
                }
            })
            if (result.ok){
                console.log("Signed out")
                navigate("/")
            }
        }catch (e) {
            console.log(e)
        }
    }



    return<button className={"p-2 bg-red-400 rounded border-red-800"} onClick={() => handleSignout()}>Logg ut</button>


}