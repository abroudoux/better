import type { User } from "$utils/types/entities";

export async function getUserInformations(fetch: typeof global.fetch): Promise<User> {
	try {
		const response = await fetch("/api/users");

		if (!response.ok) throw new Error("Failed to fetch user informations");

		const user: User = await response.json();

		return user;
	} catch (error: any) {
		console.error(error.message);
		throw new Error("Failed during getUserInformations service");
	}
}
