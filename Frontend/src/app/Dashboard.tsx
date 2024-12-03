import {useParams} from "react-router-dom";
import Layout from "../components/Layout";

export function Dashboard() {
    let {workspaceId} = useParams();
    console.log(workspaceId)
    return <Layout>
        <>Dash</>
    </Layout>
}