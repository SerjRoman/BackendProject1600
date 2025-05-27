import * as yup from "yup";

// TODO: Доделать валидацию для создания контакта
export const ContactValidation = {
    contact: yup.object({
        localName: yup
            .string()
            // .min(5, "Length should be more than 5")
			.max(50, "Length should be less than 50")
			.required(),
        avatar: yup 
            .string()
            .required(),
        contactUserId: yup 
            .number()
            .required()
        
    })
}