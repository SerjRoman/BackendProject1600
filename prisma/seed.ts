import { PrismaClient } from "../src/generated/prisma";

const client = new PrismaClient();

async function deleteContact() {
	const contact = await client.contact.delete({
		where: {
			id: 3,
		},
	});
}

deleteContact()