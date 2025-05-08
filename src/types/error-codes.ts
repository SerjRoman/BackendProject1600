// enum - Перечисляемый тип данных, позволяющий создать перечесление по конкретным именами
export enum PrismaErrorCodes {
    UNIQUE = "P2002", //унікальний
    NOT_EXIST = "P2025" // юзера немає але ти його хочеш видалити або змінити
}

export enum ErrorCodes {
    NOT_FOUND = "NOT_FOUND",
    EXISTS = "EXISTS",
    UNHANDLED= "UNHANDLED"
}

export function getErrorMessage(errorCode: string) {
	switch (errorCode) {
		case PrismaErrorCodes.UNIQUE:
			return "Given non unique value.";
        case PrismaErrorCodes.NOT_EXIST:
            return "User doesn`t exist."
	}
}
