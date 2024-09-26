import prisma from "$lib/db/prisma";

async function main() {
	const admin = await prisma.user.create({
		data: {
			email: "arthur.broudoux@gmail.com",
			name: "Arthur Broudoux",
			firstName: "Arthur",
			password: "password123",
			isAdmin: true
		}
	});

	const habit = await prisma.habit.create({
		data: {
			name: "Morning Exercise",
			userId: admin.id
		}
	});

	console.log("Seeding finished.");
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
