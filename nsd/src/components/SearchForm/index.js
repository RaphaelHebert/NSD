import { useState } from 'react'

const SearchForm = () => {
    const [formData, setFormData] = useState({
        query: "",
        taxonomy: "1", 
        taxon:"",
        inputFile: "",
        csv: false,
        fasta: true,
    })

    const handleChange = e => {
        let value;
        e.target.type === "checkbox"? value=e.target.checked : value = e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        })
    }

   

    const handleSubmit = e => {
        // e.target.type === 
        e.preventDefault()
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                Request: 
                <input name="query" value={formData.query} type="text"  onChange={handleChange} autofocus/>
            </label>
            <fieldset>
                Taxonomy:
                <label>
                    Dispatch sequences by taxonomic order
                    <select name="taxonomy" value={formData.taxonomy} onChange={handleChange} >
                        <option value="1" default >no dispatch</option> 
                        <option value="2">Kingdom</option>
                        <option value="3">Phylum</option>
                        <option value="4">Custom</option>
                    </select>
                    {formData.taxonomy === "4" && 
                    <label>
                        Enter a taxon to filter files
                        <input name="taxon" value={formData.taxon} type="text" onChange={handleChange} />
                    </label>
                    }
                </label>
            </fieldset>
            <fieldset name="output">
                <label>
                    fasta
                    <input name="fasta" onChange={handleChange} type="checkbox" checked={formData.fasta? true:false} />
                </label>
                <label>
                    csv
                    <input name="csv" onChange={handleChange} type="checkbox" checked={formData.csv? true:false} />
                </label>
            </fieldset>
            <label>
                Input file: input one or more .txt file as an external list of
                <input name="inputFile" value={formData.inputFile} type="file" accept=".txt, text/plain" onChange={handleChange} />
            </label>


        "Hello"
        </form>
    )
}

export default SearchForm;