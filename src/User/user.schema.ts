import * as Yup from "yup";

export const UserSchema = {
	login: Yup.object({
		email: Yup.string()
			.email("This field should contain @ and .")
			.required("This field is required"),
		password: Yup.string()
			.min(8, "This field should be >= 8 characters")
			.max(60, "This field should be <= 60 characters")
			.required("This field is required"),
	}),
	register: Yup.object({
        username: Yup.string()
        .max(30, "This field should be <= 30 characters")
        .required("This field is required"),
		email: Yup.string()
			.email("This field should contain @ and .")
			.required("This field is required"),
		password: Yup.string()
			.min(8, "This field should be >= 8 characters")
			.max(60, "This field should be <= 60 characters")
			.required("This field is required"),
        name: Yup.string()
        .max(30, "This field should be <= 30 characters")
        .required("This field is required"),
        surname: Yup.string()
        .max(30, "This field should be <= 30 characters")
        .required("This field is required"),
	}),
};
