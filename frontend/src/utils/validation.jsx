// src/utils/validation.js

export const validateForm = (formData, fieldNames, requiredFields) => {
    for (const field of requiredFields) {
        const keys = field.split('.');
        let value = formData;

        for (const key of keys) {
            value = value[key];
        }

        if (!value) {
            return `Lütfen ${fieldNames[field]} alanını doldurun.`;
        }
    }

    return '';
};
