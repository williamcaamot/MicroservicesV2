import {useParams} from "react-router-dom";
import Layout from "./Layout";
import {useEffect, useState} from "react";
import Button from "./Button";
import Modal from "./common/Modal";
import button from "./Button";
import CompanySalesPitches from "./CompanySalesPitches.tsx";
import CompanyCommunication from "./CompanyCommunication.tsx";

export function Company() {

    const {companyId, workspaceId} = useParams();
    const [company, setCompany] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [websiteSuggestions, setWebsiteSuggestions] = useState<string[] | undefined>(undefined);
    const [isFetchingWebsitesLoading, setIsFetchingWebsitesLoading] = useState<boolean>(false);
    const [isFetchingCompanyEmailsLoading, setIsFetchingCompanyEmailsLoading] = useState<boolean>(false);
    const [isFetchingPhonenumbersLoading, setIsFetchingPhonenumbersLoading] = useState<boolean>(false)

    const [isAddingEmail, setIsAddingEmail] = useState<boolean>(false);
    const [newEmail, setNewEmail] = useState('');

    const [isAddingPhone, setIsAddingPhone] = useState(false);
    const [newPhone, setNewPhone] = useState('');

    const [isEditingWebsite, setIsEditingWebsite] = useState(false);
    const [newWebsite, setNewWebsite] = useState('');

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

    async function fetchCompanyWebsites() {
        setIsFetchingWebsitesLoading(true);
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
        setIsFetchingWebsitesLoading(false);
    }

    async function fetchCompanyEmail() {
        if (!company.hjemmeside) {
            alert("You have not chosen a website for this company! Cannot find emails without a website!")
            return
        }
        setIsFetchingCompanyEmailsLoading(true);
        try {
            const result = await fetch(`/api/v1/webscraper/companyemail?companyWebsite=${company.hjemmeside}`, {
                method: "POST",
                headers: {
                    "content-type": "Application/JSON"
                },
                body: JSON.stringify({
                    workspaceId: workspaceId,
                    website: company.hjemmeside,
                    companyId: companyId,
                })
            });
            if (result.ok) {
                const data = await result.json();
                console.log(data);
                if (data.length === 0) {
                    alert("Could not find any email addresses!")
                } else if (data.length > 0) {
                    setCompany(prevCompany => ({...prevCompany, emailAddresses: data}))
                }
            }
        } catch (e) {
            console.log(e)
        }
        setIsFetchingCompanyEmailsLoading(false);
    }

    async function fetchCompanyPhonenumbers() {
        if (!company.hjemmeside) {
            alert("You have not chosen a website for this company! Cannot find phone numbers without a website!")
            return
        }
        setIsFetchingPhonenumbersLoading(true);
        try {
            const result = await fetch(`/api/v1/webscraper/companyphonenumber`, {
                method: "POST",
                headers: {
                    "content-type": "Application/JSON"
                },
                body: JSON.stringify({
                    workspaceId: workspaceId,
                    website: company.hjemmeside,
                    companyId: companyId,
                })
            });
            if (result.ok) {
                const data = await result.json();
                console.log(data);
                if (data.length === 0) {
                    alert("Could not find any email addresses!")
                } else if (data.length > 0) {
                    setCompany(prevCompany => ({...prevCompany, phonenumbers: data}))
                }
            }
        } catch (e) {
            console.log(e)
        }
        setIsFetchingPhonenumbersLoading(false);
    }

    async function saveCompanyWebsite(website: string) {
        try {
            const result = await fetch(`/api/v1/webscraper/companywebsite`, {
                    method: "POST",
                    headers: {
                        "content-type": "Application/JSON"
                    },
                    body: JSON.stringify({
                        companyWebsite: website,
                        workspaceId: workspaceId,
                        companyId: companyId
                    })
                }
            );
            if (result.ok) {
                setCompany(prevCompany => ({...prevCompany, hjemmeside: website}))
                const data = await result.json();
                setIsModalOpen(false);
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function handleAddEmail(e) {
        e.preventDefault();
        if (!newEmail) return;

        const updatedCompany = {
            ...company,
            emailAddresses: [...company.emailAddresses, newEmail]
        };

        try {
            const result = await fetch(`/api/v1/workspace/${workspaceId}/company`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCompany)
            });

            const data = await result.json();
            if (result.ok) {
                setCompany(updatedCompany);
                setNewEmail('');
                setIsAddingEmail(false);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function handleAddPhone(e) {
        e.preventDefault();
        if (!newPhone) return;

        const updatedCompany = {
            ...company,
            phonenumbers: [...company.phonenumbers, newPhone]
        };

        try {
            const result = await fetch(`/api/v1/workspace/${workspaceId}/company`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCompany)
            });

            const data = await result.json();
            if (result.ok) {
                setCompany(updatedCompany);
                setNewPhone('');
                setIsAddingPhone(false);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async function handleUpdateWebsite(e) {
        e.preventDefault();

        const updatedCompany = {
            ...company,
            hjemmeside: newWebsite
        };

        try {
            const result = await fetch(`/api/v1/workspace/${workspaceId}/company`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCompany)
            });

            const data = await result.json();
            if (result.ok) {
                setCompany(updatedCompany);
                setIsEditingWebsite(false);
            }
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        fetchCompany()
    }, []);

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
                                                Open
                                            </button>
                                        </a>
                                        <button onClick={() => saveCompanyWebsite(website)}
                                                className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
                                            Select
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
                <div className={"flex space-x-2"}>
                    <Button variant={"outlined"} onClick={() => fetchCompanyWebsites()}
                            loading={isFetchingWebsitesLoading}>Find websites for this company</Button>
                    <Button variant={"outlined"} onClick={() => fetchCompanyEmail()}
                            loading={isFetchingCompanyEmailsLoading}>Find email addresses for this company</Button>
                    <Button variant={"outlined"} onClick={() => fetchCompanyPhonenumbers()}
                            loading={isFetchingPhonenumbersLoading}>Find phone numbers for this company</Button>

                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-4 border rounded p-2">
                        <InfoItem label="Organization Number" value={company.organisasjonsnummer}/>
                        <InfoItem label="Workspace ID" value={company.workspaceId}/>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h2 className="text-xl font-semibold text-gray-700">Website</h2>
                                <button
                                    onClick={() => setIsEditingWebsite(!isEditingWebsite)}
                                    className="text-blue-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </button>
                            </div>

                            {isEditingWebsite ? (
                                <form onSubmit={handleUpdateWebsite} className="mb-3 flex gap-2">
                                    <input
                                        type="url"
                                        value={newWebsite}
                                        onChange={(e) => setNewWebsite(e.target.value)}
                                        placeholder="Enter website URL"
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsEditingWebsite(false);
                                            setNewWebsite(company.hjemmeside || '');
                                        }}
                                        className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg text-sm"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            ) : (
                                <p className="text-gray-600">
                                    {company.hjemmeside || 'No website added'}
                                </p>
                            )}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h2 className="text-xl font-semibold text-gray-700">Email addresses</h2>
                                <button
                                    onClick={() => setIsAddingEmail(!isAddingEmail)}
                                    className="text-blue-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            {isAddingEmail && (
                                <form onSubmit={handleAddEmail} className="mb-3 flex gap-2">
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        placeholder="Enter new email address"
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingEmail(false)}
                                        className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg text-sm"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            )}

                            <ul className="list-disc list-inside text-gray-600">
                                {company.emailAddresses && company.emailAddresses.map((item, index) => (
                                    <li key={index} className="mb-1">{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h2 className="text-xl font-semibold text-gray-700">Phone numbers</h2>
                                <button
                                    onClick={() => setIsAddingPhone(!isAddingPhone)}
                                    className="text-blue-500 hover:text-blue-600 p-1 rounded-full hover:bg-blue-50"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>

                            {isAddingPhone && (
                                <form onSubmit={handleAddPhone} className="mb-3 flex gap-2">
                                    <input
                                        type="tel"
                                        value={newPhone}
                                        onChange={(e) => setNewPhone(e.target.value)}
                                        placeholder="Enter new phone number"
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-600 transition-colors"
                                    >
                                        Add
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingPhone(false)}
                                        className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded-lg text-sm"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            )}

                            <ul className="list-disc list-inside text-gray-600">
                                {company.phonenumbers && company.phonenumbers.map((item, index) => (
                                    <li key={index} className="mb-1">{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-4 border rounded p-2">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-2">Activity</h2>
                            <ul className="list-disc list-inside text-gray-600">
                                {company.aktivitet.map((item, index) => (
                                    <span key={index} className="mb-1">{item}</span>
                                ))}
                            </ul>
                        </div>

                        <InfoItem
                            label="Statutory Purpose"
                            value={company.vedtektsfestetFormaal || 'Not specified'}
                        />

                    </div>
                </div>
                <CompanySalesPitches/>
                <CompanyCommunication/>
                <div className="mt-8 text-sm text-gray-500">
                    <p>Created: {company.createdAt || 'Not specified'}</p>
                    <p>Last Updated: {company.updatedAt || 'Not specified'}</p>
                </div>

            </div>

        </Layout>

    );
}

const InfoItem = ({label, value}) => (
    <div>
        <h2 className="text-lg font-semibold text-gray-700">{label}</h2>
        <p className="text-gray-600">{value}</p>
    </div>
);
