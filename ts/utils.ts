import type { ErrorMessages, InvalidFields, ValidPattern } from "./types.ts";

/**
 * Resets error messages.
 */
export const resetErrorMessages = (): void => {
    const errorMessages = document.querySelectorAll(".error-message");
    for (const errorMessage of errorMessages) {
        errorMessage.innerHTML = "";
    }
};

/**
 * Checks whether the field is invalid or not.
 *
 * @param value - The value to check.
 * @param validPattern - The pattern to check against.
 * @return `true` is the field is invalid, otherwise `false`.
 */
export const isInvalidField = (value: string, validPattern: ValidPattern): boolean => {
    const { method, pattern } = validPattern;
    if (method === "regex") return !pattern.test(value);
    if (method === "values") return !pattern.includes(value);
    return pattern !== value;
};

/**
 * Sets an invalid field.
 *
 * @param invalidFields - The invalid fields map to fill.
 * @param errorMessages - The object containing the error messages.
 * @param key - The key to use to pick up the error message.
 */
export const setInvalidField = <TFields extends readonly string[]>(invalidFields: InvalidFields<TFields>, errorMessages: ErrorMessages<TFields>, key: keyof ErrorMessages<TFields>): void => {
    const errorMessage = errorMessages[key];
    if (errorMessage) invalidFields.set(key, errorMessage);
};

/**
 * Generates the toast message.
 *
 * @returns The `dialog` element.
 */
export const generateToastMessage = (): HTMLDialogElement => {
    const dialogLabel = "Message Sent!";
    const dialogLabelId = "toast-message-title";
    const dialogDescription = "Thanks for completing the form. We’ll be in touch soon!";
    const dialogDescriptionId = "toast-message-description";
    const dialog = document.createElement("dialog");
    dialog.className = "toast-message";
    dialog.setAttribute("role", "alertdialog");
    dialog.setAttribute("aria-live", "assertive");
    dialog.setAttribute("aria-labelledby", dialogLabelId);
    dialog.setAttribute("aria-describedby", dialogDescriptionId);
    const h2 = document.createElement("h2");
    h2.id = dialogLabelId;
    h2.textContent = dialogLabel;
    const p = document.createElement("p");
    p.id = dialogDescriptionId;
    p.textContent = dialogDescription;
    dialog.appendChild(h2);
    dialog.appendChild(p);
    return dialog;
};
