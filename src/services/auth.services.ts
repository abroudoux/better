import { generateId } from "lucia";
import { Prisma, PrismaClient } from "@prisma/client";

import type { RegisterUser } from "$utils/types/queries";
import type { User } from "$utils/types/entities";
import type { ServiceResponse } from "$utils/types/services";

const prisma = new PrismaClient();

export const registerUser = async (userData: RegisterUser): Promise<ServiceResponse<User>> => {
	const id = generateId(15);
	const user: Prisma.UserCreateInput = {
		id: id,
		name: userData.name,
		firstName: userData.firstName,
		email: userData.email,
		password: userData.password
	};

	try {
		const createdUser = await prisma.user.create({
			data: user
		});

		console.log(createdUser);

		return {
			data: null,
			error: null
		};
	} catch (error: any) {
		return {
			data: null,
			error: error.message
		};
	}
};
