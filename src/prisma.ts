import { PrismaClient } from "./generated/prisma";

export const prisma = new PrismaClient();

enum PrismaCodes {
	Unique = "P2002", // помилка унікальності
	NotExists = "P2017", // спроба видалення або зміни данних, яких  не існує
}

export function getErrorMessage(errorCode: string) {
	switch (errorCode) {
		case PrismaCodes.Unique:
			return "Given non unique value.";
        case PrismaCodes.NotExists:
            return "User doesn`t exist."
	}
}
