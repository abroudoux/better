import { generateId } from "lucia";
import { Prisma, PrismaClient } from "@prisma/client";

import type { User } from "$utils/types/entities";
import type { RegisterUser, LoginUser, ServiceResponse } from "$utils/types/services";

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

export const loginUser = async (userData: LoginUser): Promise<ServiceResponse<User>> => {
	const user = await prisma.user.findUnique({
		where: {
			email: userData.email,
			password: userData.password
		}
	});

	if (!user) {
		return {
			data: null,
			error: "User not found"
		};
	}

	if (user.password !== userData.password) {
		return {
			data: null,
			error: "Invalid password"
		};
	}

	return {
		data: user,
		error: null
	};
};

export const deleteUser = async (userId: string): Promise<ServiceResponse<User>> => {
	const user = await prisma.user.findUnique({
		where: {
			id: userId
		}
	});

	if (!user) {
		return {
			data: null,
			error: "User not found"
		};
	}

	await prisma.user.delete({
		where: {
			id: userId
		}
	});

	return {
		data: user,
		error: null
	};
};
