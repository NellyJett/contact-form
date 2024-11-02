import React, { useState } from "react";

const Registration = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formValues, setFormValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        querytype: "",
        supportrequest: "",
        message: "",
        consent: false
    });
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!formValues.firstname) errors.firstname = "First Name is required.";
        if (!formValues.lastname) errors.lastname = "Last Name is required.";
        if (!formValues.email) {
            errors.email = "Please enter a invalid email address.";
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            errors.email = "Please enter a invalid email address.";
        }
        if (!formValues.querytype) errors.querytype = "Please select a Query Type.";
        if (!formValues.message) errors.message = "This field is required.";
        if (!formValues.consent) errors.consent = "Consent is required to proceed.";
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        if (validateForm()) {
            setIsSubmitted(true); // Set form as submitted to show the success message

            // Reset form after submission
            setFormValues({
                firstname: "",
                lastname: "",
                email: "",
                querytype: "",
                supportrequest: "",
                message: "",
                consent: false
            });
            setFormErrors({});

            // Optionally, hide the success message after a few seconds
            setTimeout(() => setIsSubmitted(false), 3000); // Hide message after 3 seconds
        }
    };

    return (
        <div className="flex relative w-full p-8 min-h-screen bg-green-100 justify-center items-center">
            <div className="bg-white border border-gray-300 w-full max-w-[90%] sm:max-w-[75%] md:max-w-[60%] lg:max-w-[50%] xl:max-w-[40%] rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 font-[karla]">Contact Us</h2>

                {isSubmitted && (
                    <div className="text-green-700 bg-green-100 p-3 rounded mb-4">
                        Form submitted successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <div className="flex flex-col w-full sm:w-1/2">
                            <label htmlFor="firstname" className="mb-2 text-base text-gray-500 font-[karla]">First Name *</label>
                            <input 
                                type="text" 
                                id="firstname" 
                                name="firstname" 
                                value={formValues.firstname}
                                onChange={handleInputChange}
                                className="sm:w-full h-[40px] border border-gray-300 rounded px-3" 
                            />
                            {formErrors.firstname && <p className="text-red-500 text-sm">{formErrors.firstname}</p>}
                        </div>
                        <div className="flex flex-col w-full sm:w-1/2">
                            <label htmlFor="lastname" className="mb-2 text-base text-gray-500 font-[karla]">Last Name *</label>
                            <input 
                                type="text" 
                                id="lastname" 
                                name="lastname" 
                                value={formValues.lastname}
                                onChange={handleInputChange}
                                className="w-full h-[40px] border border-gray-300 rounded px-3" 
                            />
                            {formErrors.lastname && <p className="text-red-500 text-sm">{formErrors.lastname}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="email" className="mb-2 text-base text-gray-500 font-[karla]">Email Address *</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formValues.email}
                            onChange={handleInputChange}
                            className="w-full h-[40px] border border-gray-300 rounded px-3" 
                        />
                        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                    </div>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="querytype" className="mb-2 text-base text-gray-500 font-[karla]">Query Type *</label>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <select 
                                name="querytype" 
                                id="querytype" 
                                value={formValues.querytype}
                                onChange={handleInputChange}
                                className="w-full sm:w-1/2 h-[40px] border border-gray-300 rounded px-3 text-gray-500 font-[karla]"
                            >
                                <option value="">Query Type</option>
                                <option value="general">General Enquiry</option>
                                <option value="feedback">Feedback</option>
                                <option value="support">Support</option>
                            </select>
                            {formErrors.querytype && <p className="text-red-500 text-sm">{formErrors.querytype}</p>}
                            
                            <select 
                                name="supportrequest" 
                                id="supportrequest" 
                                value={formValues.supportrequest}
                                onChange={handleInputChange}
                                className="w-full sm:w-1/2 h-[40px] border border-gray-300 rounded px-3 text-gray-500 font-[karla]"
                            >
                                <option value="" disabled>Support Request</option>
                                <option value="technical">Technical Support</option>
                                <option value="billing">Billing</option>
                                <option value="account">Account Issue</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col mb-4">
                        <label htmlFor="message" className="mb-2 text-base text-gray-500 font-[karla]">Message *</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            value={formValues.message}
                            onChange={handleInputChange}
                            className="w-full h-[100px] border border-gray-300 rounded px-3 py-2 resize-none" 
                        />
                        {formErrors.message && <p className="text-red-500 text-sm">{formErrors.message}</p>}
                    </div>

                    <label className="flex items-center gap-2 text-gray-500 font-medium pt-4 font-[karla]">
                        <input 
                            type="checkbox" 
                            name="consent" 
                            checked={formValues.consent}
                            onChange={handleInputChange}
                            className="form-checkbox h-4 w-4 text-green-600" 
                        />
                        I consent to being contacted by the team
                    </label>
                    {formErrors.consent && <p className="text-red-500 text-sm">{formErrors.consent}</p>}

                    <button 
                        type="submit" 
                        className="w-full h-[40px] bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition duration-200 mt-4"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
