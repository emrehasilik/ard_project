// src/components/FormField.jsx

import React from 'react';

const FormField = ({ label, id, type, value, onChange, placeholder, options, disabled }) => {
    if (type === 'select') {
        return (
            <div>
                <label className="block text-gray-700 mb-2" htmlFor={id}>
                    {label}
                </label>
                <select
                    id={id}
                    className="w-full p-2 border border-gray-300 rounded"
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                >
                    <option value="">Seçin</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    return (
        <div>
            <label className="block text-gray-700 mb-2" htmlFor={id}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                className="w-full p-2 border border-gray-300 rounded"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
            />
        </div>
    );
};

export default FormField;
