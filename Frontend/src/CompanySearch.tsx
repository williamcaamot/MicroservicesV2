import React, { useState } from 'react';

const NorwegianBusinessSearch = () => {
    const [params, setParams] = useState({
        navn: '',
        organisasjonsnummer: '',
        overordnetEnhet: '',
        fraAntallAnsatte: '',
        tilAntallAnsatte: '',
        konkurs: false,
        registrertIMvaregisteret: false,
        registrertIForetaksregisteret: false,
        registrertIStiftelsesregisteret: false,
        registrertIFrivillighetsregisteret: false,
        underTvangsavviklingEllerTvangsopplosning: false,
        underAvvikling: false,
        fraRegistreringsdatoEnhetsregisteret: '',
        tilRegistreringsdatoEnhetsregisteret: '',
        fraStiftelsesdato: '',
        tilStiftelsesdato: '',
        organisasjonsform: '',
        hjemmeside: '',
        institusjonellSektorkode: '',
        kommunenummer: '',
        naeringskode: '',
        sisteInnsendteAarsregnskap: '',
        sort: 'ASC',
        size: 10,
        page: 1
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setParams(prevParams => ({
            ...prevParams,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    async function handleSubmit(e){
        e.preventDefault();
        const baseUrl = 'https://data.brreg.no/enhetsregisteret/api/enheter';
        const queryString = new URLSearchParams(
            Object.entries(params).filter(([_, v]) => v !== '' && v !== false)
        ).toString();
        const fullUrl = `${baseUrl}?${queryString}`;
        console.log('Search URL:', fullUrl);
        // Here you would typically use this URL to fetch data or navigate
        try{
            const result = await fetch(fullUrl);
            const data = await result.json();
            console.log(data);

        }catch (e) {
            console.log(e)
        }




    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Norwegian Business Search</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="navn" className="block text-sm font-medium text-gray-700">Navn</label>
                        <input
                            type="text"
                            id="navn"
                            name="navn"
                            value={params.navn}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="organisasjonsnummer" className="block text-sm font-medium text-gray-700">Organisasjonsnummer</label>
                        <input
                            type="text"
                            id="organisasjonsnummer"
                            name="organisasjonsnummer"
                            value={params.organisasjonsnummer}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="fraAntallAnsatte" className="block text-sm font-medium text-gray-700">Fra Antall Ansatte</label>
                        <input
                            type="number"
                            id="fraAntallAnsatte"
                            name="fraAntallAnsatte"
                            value={params.fraAntallAnsatte}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="tilAntallAnsatte" className="block text-sm font-medium text-gray-700">Til Antall Ansatte</label>
                        <input
                            type="number"
                            id="tilAntallAnsatte"
                            name="tilAntallAnsatte"
                            value={params.tilAntallAnsatte}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="overordnetEnhet" className="block text-sm font-medium text-gray-700">Overordnet Enhet</label>
                        <input
                            type="text"
                            id="overordnetEnhet"
                            name="overordnetEnhet"
                            value={params.overordnetEnhet}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="konkurs"
                            name="konkurs"
                            checked={params.konkurs}
                            onChange={handleChange}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <label htmlFor="konkurs" className="ml-2 block text-sm text-gray-900">Konkurs</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="registrertIMvaregisteret"
                            name="registrertIMvaregisteret"
                            checked={params.registrertIMvaregisteret}
                            onChange={handleChange}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <label htmlFor="registrertIMvaregisteret" className="ml-2 block text-sm text-gray-900">Registrert i MVA-registeret</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="registrertIForetaksregisteret"
                            name="registrertIForetaksregisteret"
                            checked={params.registrertIForetaksregisteret}
                            onChange={handleChange}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <label htmlFor="registrertIForetaksregisteret" className="ml-2 block text-sm text-gray-900">Registrert i Foretaksregisteret</label>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="underAvvikling"
                            name="underAvvikling"
                            checked={params.underAvvikling}
                            onChange={handleChange}
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        <label htmlFor="underAvvikling" className="ml-2 block text-sm text-gray-900">Under Avvikling</label>
                    </div>
                    <div>
                        <label htmlFor="navn" className="block text-sm font-medium text-gray-700">Kommunenummer</label>
                        <input
                            type="text"
                            id="kommunenummer"
                            name="kommunenummer"
                            value={params.kommunenummer}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                </div>

                {/* Add more fields here as needed */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Sort</label>
                        <select
                            id="sort"
                            name="sort"
                            value={params.sort}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        >
                            <option value="ASC">Ascending</option>
                            <option value="DESC">Descending</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size</label>
                        <input
                            type="number"
                            id="size"
                            name="size"
                            value={params.size}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                    <div>
                        <label htmlFor="page" className="block text-sm font-medium text-gray-700">Page</label>
                        <input
                            type="number"
                            id="page"
                            name="page"
                            value={params.page}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                    </div>
                </div>

                <div className="mt-6">
                    <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NorwegianBusinessSearch;