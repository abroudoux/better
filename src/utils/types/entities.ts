export type User = {
	id: string;
	name: string;
	password: string;
	isAdmin: boolean;
};

export type Habit = {
	id: string;
	name: string;
	isCompleted: boolean;
};

export type Day = {
	id: string;
	userId?: string;
	date: string;
	habits: Habit[];
	habitsCompleted: number;
	percentage: number;
};
