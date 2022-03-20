import { useState } from 'react'

const SearchForm = () => {
    const [formData, setFormData] = useState({
        userquery: "",

    })

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
    }

    return(
        <form onSubmit={handleSubmit}>
            <label>
                <input type="text" name="userquery" onChange={handleChange} value={formData.userquery}/>
            </label>


        "Hello"
        </form>
    )
}

export default SearchForm;