import {Link, useNavigate, useParams} from "react-router-dom";
import IconLayoutDashboard from "./icons/IconLayoutDashboard.tsx";
import IconBxsDashboard from "./icons/IconBxsDashboard.tsx";
import IconListCircleOutline from "./icons/IconListCircleOutline.tsx";
import IconListCircle from "./icons/IconListCircle.tsx";
import IconUser from "./icons/IconUser.tsx";
import IconUserOutline from "./icons/IconUserOutline.tsx";
import IconNotificationsOutline from "./icons/IconNotificationsOutline.tsx";
import IconNotifications from "./icons/IconNotifications.tsx";
import IconSecurePaymentLine from "./icons/IconSecurePaymentLine.tsx";
import IconSecurePaymentFill from "./icons/IconSecurePaymentFill.tsx";
import IconAccountPlus from "./icons/IconAccountPlus.tsx";
import IconNotification from "./icons/IconNotification.tsx";
import IconAddressCard from "./icons/IconAddressCard.tsx";

const tabs = [
    {
        title: "Dashboard",
        url: "/app",
        icon:  <IconLayoutDashboard width={"1.4em"} height={"1.4em"}/>,
        iconActive: <IconBxsDashboard width={"1.4em"} height={"1.4em"}/>
    },
    {
        title: "Selskapsoversikt",
        url: "/app/selskapsoversikt",
        icon:  <IconListCircleOutline width={"1.4em"} height={"1.4em"}/>,
        iconActive: <IconListCircle width={"1.4em"} height={"1.4em"}/>
    },
    {
        title: "Profil", url: "/app/profil", icon: <IconUserOutline width={"1.4em"} height={"1.4em"}/>,
        iconActive: <IconUser width={"1.4em"} height={"1.4em"}/>
    },
    /*{
        title: "Innstillinger", url: "/app/innstillinger", icon: <IconSettingsOutline width={"1.4em"} height={"1.4em"}/>,
        iconActive: <IconSettings width={"1.4em"} height={"1.4em"}/>
    },*/
    {
        title: "Varsler", url: "/app/varsler", icon: <IconNotificationsOutline width={"1.4em"} height={"1.4em"}/>,
        iconActive: <IconNotifications width={"1.4em"} height={"1.4em"} />
    },
    {
        title: "Abonnement",
        url: "/app/abonnement",
        icon: <IconSecurePaymentLine width={"1.4em"} height={"1.4em"}/>,
        iconActive: <IconSecurePaymentFill width={"1.4em"} height={"1.4em"}/>
    },
]



export default function Layout({children}) {
    const navigate = useNavigate();
    let {workspaceId} = useParams();


    return (
        <div className="w-full flex justify-center">
            <div className="flex w-full h-screen bg-gray-100">
                {/* Vertical Menu */}
                <nav className="w-64 bg-white borde-r shadow-sms">
                    <div className="p-4">
                        <img src={"/logo.png"}/>
                    </div>
                    <ul className="space-y-2 p-4">
                        <li onClick={() => {navigate(`/app/workspace/${workspaceId}`)}}><a className="cursor-pointer flex py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"><span className={"pt-0.5 pr-2"}><IconLayoutDashboard width={"1.4em"} height={"1.4em"}/></span> Dashboard</a></li>
                        <li onClick={() => {navigate(`/app/workspace/${workspaceId}/company`)}}><a className="cursor-pointer flex py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"><span className={"pt-0.5 pr-2"}><IconListCircleOutline width={"1.4em"} height={"1.4em"}/></span>Selskaper</a></li>
                        <li onClick={() => {navigate(`/app/workspace/${workspaceId}/leads`)}}><a className="cursor-pointer flex py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"><span className={"pt-0.5 pr-2"}><IconAccountPlus width={"1.4em"} height={"1.4em"}/></span>Leads</a></li>
                        <li onClick={() => {navigate(`/app/workspace/${workspaceId}/aileadassist`)}}><a className="cursor-pointer flex py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"><span className={"pt-0.5 pr-2"}><IconNotification width={"1.4em"} height={"1.4em"}/></span>AI Lead assist</a></li>
                        <li onClick={() => {navigate(`/app`)}}><a className="cursor-pointer flex py-2 px-4 text-gray-700 hover:bg-gray-200 rounded"><span className={"pt-0.5 pr-2"}><IconAddressCard width={"1.4em"} height={"1.4em"}/></span>Change workspace</a></li>
                    </ul>
                </nav>

                {/* Main Content */}
                <main className="flex-1 p-8 overflow-auto">
                    <div className="w-full bg-white shadow-sm border rounded-lg p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}