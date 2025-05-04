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
};
