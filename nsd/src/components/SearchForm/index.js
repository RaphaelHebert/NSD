import { useState, useEffect } from 'react';

import * as yup from 'yup';

import "../../App.css"

const schema = yup.object().shape({
    query: yup
        .string()
        .required("a query is required")
        .min(1, "a query is required"),
    taxonomy: yup
        .string()
        .required("a query is required"),
    taxon: yup
        .string(),
    inputFile: yup
        .string(),
    csv: yup
        .boolean(),
    fasta: yup
        .boolean(),
    format: yup
        .string(),
    filter: yup
        .string(),
    information:yup
        .string()
        .required("a query is required"),
})


const baseform = {
    query: "",
    taxonomy: "1", 
    taxon: "",
    inputFile: "",
    csv: false,
    fasta: false,
    format: "",
    filter: "",
    information: false,
}

const SearchForm = () => {
    const [formData, setFormData] = useState(baseform)
    const [formErrors, setFormErrors] = useState(baseform)
    const [ disable, setDisable ] = useState(true)

    const handleFormError = (name, value) => {
        console.log("handleFormError", name , value)
        yup.reach(schema, name).validate(value)
            .then(() => {
                console.log("handleFormError: ok")
                setFormErrors({
                    ...formErrors,
                    [name]: ''
                })
            })
            .catch(err => {
                console.log("handleFormError: error")
                setFormErrors({
                    ...formErrors,
                    [name]: err.errors[0]
                })
            })
    }

    const handleChange = e => {
        const {type, name, value } = e.target
        const valueToPass = type === "checkbox"? !formData[name] : value;
        setFormData({
            ...formData,
            [name]: valueToPass,           
        })
        handleFormError(name, valueToPass)
    }

   

    const handleSubmit = e => {
        // e.target.type === 
        e.preventDefault()
    }

    const setFormatError = (reset) => {
        reset?
        setFormErrors({
            ...formErrors,
            format: ""
        }):
        setFormErrors({
            ...formErrors,
            format: "at least one output format must be selected."
        })
    }
    useEffect(() => {
        schema.isValid(formData)
            .then(valid => {
                formData["fasta"] || formData["csv"]?
                setFormatError(true) &&
                setDisable(!valid):
                setFormatError(false)
            })
    }, [formData])

    return(
        <form onSubmit={handleSubmit}>
            <label className="formLabels formField">
                Request: 
                <input className="formElement" name="query" value={formData.query} type="text"  onChange={handleChange} autoFocus/>
            </label>
            <fieldset className="formLabels formField">
                <label className="flexCol">
                Dispatch sequences by taxonomic order
                    <select className="formElement" name="taxonomy" value={formData.taxonomy} onChange={handleChange} >
                        <option value="1" default >no dispatch</option> 
                        <option value="2">Kingdom</option>
                        <option value="3">Phylum</option>
                        <option value="4">Custom</option>
                    </select>
                    {formData.taxonomy === "4" && 
                    <label className="flexCol">
                        Enter a taxon to filter files
                        <input className="formElement" name="taxon" value={formData.taxon} type="text" onChange={handleChange} />
                    </label>
                    }
                </label>
            </fieldset>
            <fieldset name="output formField">
                <label className="formLabels formField">
                    fasta
                    <input name="fasta" onChange={handleChange} type="checkbox" checked={formData.fasta} />

                    csv
                    <input name="csv" onChange={handleChange} type="checkbox" checked={formData.csv? true:false} />
                </label>
                <p>{formErrors.format}</p>
            </fieldset>
            <label className="formLabels formField">
                <div>Input file: <input name="inputFile" value={formData.inputFile} type="file" accept=".txt, text/plain" onChange={handleChange} /> Choose one or more .txt file as an external list of taxa. </div>
                
            </label>
            <label className="formLabels formField">
                filter
                <input className="formElement" name="filter" value={formData.filter} type="text" onChange={handleChange} />
            </label>
            <label className="formLabels formField">
            add the taxonomic information in the information line of the output files
                <input name="information" type="checkbox" onChange={handleChange} checked={formData.information}/>
            </label>
            <button type="submit" disabled={disable}> Search </button>
        </form>
    )
}

export default SearchForm;