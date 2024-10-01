import {useParams} from "react-router-dom";
import Layout from "./Layout.tsx";
import {useEffect, useState} from "react";

export function Company() {

    const {companyId, workspaceId} = useParams();
    const [company, setCompany] = useState();

    async function fetchCompany(){
        try{
            const result = await fetch(`/api/v1/workspace/${workspaceId}/company/${companyId}`)
            if(!result.ok){
                console.log("Something went wrong");
                return
            }
            const data = await result.json();
            setCompany(data);
            console.log(data);
        }catch (e) {

        }
    }
    useEffect(() => {
        fetchCompany()
    }, []);


    async function fetchCompanyWebsite(){
        try{
            const result = await fetch(`/api/v1/webscraper/companywebsite?companyName=${company.navn}`);
            if(result.ok){
                const data = await result.json();
                console.log(data);
            }
        }catch (e) {
            console.log(e)
        }
    }



    if(company) return (
        <Layout>
        <div className="mx-auto p-6 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-800">{company.navn}</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <InfoItem label="Organization Number" value={company.organisasjonsnummer} />
                    <InfoItem label="Workspace ID" value={company.workspaceId} />
                    <InfoItem label="Website" value={company.hjemmeside || 'Not specified'} />
                </div>

                <div className="space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-2">Activity</h2>
                        <ul className="list-disc list-inside text-gray-600">
                            {company.aktivitet.map((item, index) => (
                                <li key={index} className="mb-1">{item}</li>
                            ))}
                        </ul>
                    </div>

                    <InfoItem
                        label="Statutory Purpose"
                        value={company.vedtektsfestetFormaal || 'Not specified'}
                    />
                </div>
            </div>

            <div className="mt-8 text-sm text-gray-500">
                <p>Created: {company.createdAt || 'Not specified'}</p>
                <p>Last Updated: {company.updatedAt || 'Not specified'}</p>
            </div>

        </div>
            <button onClick={() => fetchCompanyWebsite()} className={"p-4 bg-purple-200 rounded border"}>Find website for this company</button>
        </Layout>
    );
}

const InfoItem = ({ label, value }) => (
    <div>
        <h2 className="text-lg font-semibold text-gray-700">{label}</h2>
        <p className="text-gray-600">{value}</p>
    </div>
);
