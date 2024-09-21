import CompanySearchV2 from "../CompanySearchV2.tsx";
import {useEffect, useState} from "react";
import CompanyList from "../components/common/Company.tsx";
import {useParams} from "react-router-dom";


export interface Company {
    id: number,
    organisasjonsnummer: string;
    navn: string;
}


export default function CompanyManager() {

    const [searchTerm, setSearchTerm] = useState("")
    const [companies, setCompanies] = useState<Company[]>([])

    async function fetchCompanies() {
        try {
            const result = await fetch("/api/v1/company");
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
        try {
            const result = await fetch("/api/v1/company", {
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
            const result = await fetch(`http://localhost:8080/api/v1/company/${id}`, {method: "DELETE"})
            if(result.ok){
                setCompanies(companies.filter(company => company.id !== id));
            }
        } catch (e) {
            console.log(e)
        }
    }


    if (companies) return <><h1 className={"pb-4"}>Selskaper</h1>
        <CompanySearchV2 handleSelectCompany={handleSelectCompany} setSearchTerm={setSearchTerm}
                         searchTerm={searchTerm}/>
        <div>
            <CompanyList companies={companies} onViewDetails={handleSelectCompany} onUpdate={handleUpdateCompany}
                         onDelete={handleDeleteCompany}/>


        </div>


    </>


}