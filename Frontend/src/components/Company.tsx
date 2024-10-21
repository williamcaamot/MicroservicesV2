import {useParams} from "react-router-dom";
import Layout from "./Layout.tsx";
import {useEffect, useState} from "react";
import Button from "./Button.tsx";
import Modal from "./common/Modal.tsx";

export function Company() {

    const {companyId, workspaceId} = useParams();
    const [company, setCompany] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [websiteSuggestions, setWebsiteSuggestions] = useState<string[] | undefined>(undefined);


    async function fetchCompany() {
        try {
            const result = await fetch(`/api/v1/workspace/${workspaceId}/company/${companyId}`)
            if (!result.ok) {
                console.log("Something went wrong");
                return
            }
            const data = await result.json();
            setCompany(data);
            console.log(data);
        } catch (e) {

        }
    }

    useEffect(() => {
        fetchCompany()
    }, []);


    async function fetchCompanyWebsites() {
        try {
            const result = await fetch(`/api/v1/webscraper/companywebsite?companyName=${company.navn}`);
            if (result.ok) {
                const data = await result.json();
                setWebsiteSuggestions(data);
                setIsModalOpen(true);
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function saveCompanyWebsite(website: string){
        try {
            const result = await fetch(`/api/v1/webscraper/companywebsite`,{
                    method: "POST",
                    headers: {
                        "content-type":"Application/JSON"
                    },
                    body: JSON.stringify({
                        companyWebsite: website,
                        workspaceId: workspaceId
                    })
                }
                );
            if (result.ok) {
                const data = await result.json();
                console.log(data)
            }
        } catch (e) {
            console.log(e)
        }
    }


    if (company) return (
        <Layout>
            <Modal isOpen={isModalOpen} title="Velg en nettside" onClose={() => setIsModalOpen(false)}>
                {websiteSuggestions && (
                    <div className="space-y-4">
                        <p className="text-lg font-medium text-gray-700">
                            Vi fant følgende mulige nettsider for {company.navn}:
                        </p>
                        <ul className="space-y-3">
                            {websiteSuggestions.map((website, index) => (
                                <li key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                                    <span className="text-gray-800 font-medium truncate flex-grow mr-4">{website}</span>
                                    <div className="flex space-x-2">
                                        <a href={website} target={"_blank"}>
                                            <button
                                                className="px-3 py-1 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50">
                                                Åpne
                                            </button>
                                        </a>
                                        <button onClick={() => saveCompanyWebsite(website)}
                                            className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
                                            Velg
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </Modal>
            <div className="mx-auto p-6 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">{company.navn}</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <InfoItem label="Organization Number" value={company.organisasjonsnummer}/>
                        <InfoItem label="Workspace ID" value={company.workspaceId}/>
                        <InfoItem label="Website" value={company.hjemmeside || 'Not specified'}/>
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
            <button onClick={() => fetchCompanyWebsites()} className={"p-4 bg-purple-200 rounded border"}>Find website
                for this company
            </button>
            <Button>Generate sales pitch</Button>
        </Layout>

    );
}

const InfoItem = ({label, value}) => (
    <div>
        <h2 className="text-lg font-semibold text-gray-700">{label}</h2>
        <p className="text-gray-600">{value}</p>
    </div>
);
