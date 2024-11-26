import CompanySearchV2 from "../components/CompanySearchV2.tsx";
import {useEffect, useState} from "react";
import CompanyList from "../components/common/Company.tsx";
import {useParams} from "react-router-dom";
import Layout from "../components/Layout.tsx";
import Button from "../components/Button.tsx";
import RightDrawer from "../components/common/RigthDrawer.tsx";
import CompanySearch from "../components/CompanySearch.tsx";


export interface Company {
    id: number,
    organisasjonsnummer: string;
    navn: string;
}


export default function CompanyManager() {
    const [searchTerm, setSearchTerm] = useState("")
    const [companies, setCompanies] = useState<Company[]>([])

    const [isRightDrawerOpen, setIsRightDrawerOpen] = useState<boolean>(false)

    const {workspaceId} = useParams();

    async function fetchCompanies() {
        try {
            const result = await fetch(`/api/v1/workspace/${workspaceId}/company`);
            const data = await result.json();
            console.log(data);
            setCompanies(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchCompanies()
    }, []);


    async function handleSelectCompany(company) {
        console.log(company);
        try {
            const result = await fetch(`/api/v1/workspace/${workspaceId}/company`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(company)
            })
            const data = await result.json();
            if (result.ok) {
                setCompanies([...companies, data])
                setSearchTerm("");
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function handleUpdateCompany() {

    }

    async function handleDeleteCompany(id: number) {
        console.log("Deleting company");
        try {
            const result = await fetch(`/api/v1/workspace/${workspaceId}/company/${id}`, {method: "DELETE"})
            if (result.ok) {
                setCompanies(companies.filter(company => company.id !== id));
            }
        } catch (e) {
            console.log(e)
        }
    }


    if (companies) return <Layout>
        <h1 className={"pb-4"}>Selskaper</h1>

        <div className={"w-full flex"}>
            <h2 className="text-2xl font-semibold mb-6 pt-2">Selskapsoversikt</h2>
            <div className={"px-2"}>
                <Button fullWidth={false} text={"Nytt selskap"} onClick={() => setIsRightDrawerOpen(true)}>New company</Button>
            </div>
        </div>
        <RightDrawer isOpen={isRightDrawerOpen} setIsOpen={setIsRightDrawerOpen} title={"Add new company"}>

            <div className={"w-full flex mb-2"}>
                <form className={"flex w-full flex-wrap"} autoComplete={'false'} onSubmit={(e) => {
                    e.preventDefault()
                }}>
                    <div className={"pr-3 flex-1 min-w-44"}>
                        <CompanySearchV2
                            handleSelectCompany={handleSelectCompany}
                            setSearchTerm={setSearchTerm}
                            searchTerm={searchTerm}
                        />
                    </div>
                </form>
            </div>

        </RightDrawer>

        <div>
            <CompanyList
                companies={companies}
                onViewDetails={handleSelectCompany}
                onUpdate={handleUpdateCompany}
                onDelete={handleDeleteCompany}
            />
        </div>




    </Layout>


}