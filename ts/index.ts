import type { ErrorMessages, InvalidFields, ValidPatterns } from "./types.ts";

import { generateToastMessage, isInvalidField, resetErrorMessages, setInvalidField } from "./utils.js";

const main = document.querySelector("main");
const form = document.querySelector<HTMLFormElement>(".contact-form");
if (main && form) {
    const fields = [
        "first-name",
        "last-name",
        "email",
        "query-type",
        "message",
        "consent"
    ] as const;
    type Fields = typeof fields;
    const validPatterns: ValidPatterns<Fields> = {
        "first-name": {
            method: "regex",
            pattern: /^.+$/i
        },
        "last-name": {
            method: "regex",
            pattern: /^.+$/i
        },
        email: {
            method: "regex",
            pattern: /^[-_.0-9a-z]+@[-_0-9a-z]+(\.[a-z]{2,4})?\.[a-z]{2,6}$/i
        },
        "query-type": {
            method: "values",
            pattern: ["General Enquiry", "Support Request"]
        },
        message: {
            method: "regex",
            pattern: /^.+$/i
        },
        consent: {
            method: "value",
            pattern: "true"
        }
    };
    const errorMessages: ErrorMessages<Fields> = {
        "first-name": "This field is required",
        "last-name": "This field is required",
        email: "Please enter a valid email address",
        "query-type": "Please select a query type",
        message: "This field is required",
        consent: "To submit this form, please consent to being contacted"
    };
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        resetErrorMessages();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const missingFields = fields.filter(field => ![...formData.keys()].includes(field));
        const invalidFields: InvalidFields<Fields> = new Map();
        for (const [key, value] of formData.entries()) {
            const field = key as Fields[number];
            if (fields.includes(field) && typeof value === "string") {
                if (isInvalidField(value.trim(), validPatterns[field])) setInvalidField(invalidFields, errorMessages, field);
            }
        }
        for (const missingField of missingFields) {
            setInvalidField(invalidFields, errorMessages, missingField);
        }
        if (invalidFields.size) {
            for (const [field, errorMessage] of invalidFields.entries()) {
                const errorMessageElement = document.getElementById(`${field}-error-message`);
                if (errorMessageElement) errorMessageElement.innerHTML = errorMessage;
            }
        } else {
            const toastMessage = generateToastMessage();
            main.appendChild(toastMessage);
            toastMessage.show();
        }
    });
}
