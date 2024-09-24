export type User = {
	id: string;
	firstName: string;
	name: string;
	password: string;
	email: string;
	username?: string;
	phone?: string;
	createdAt: string;
	updatedAt: string;
	profilePicture?: string;
};

export type Habit = {
	id: string;
	userId: string;
	title: string;
	description?: string;
	isCompleted: boolean;
	points: number;
	createdAt: string;
	updatedAt: string;
};
