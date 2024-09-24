export type User = {
	id: string;
	username: string;
	password: string;
	email: string;
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
