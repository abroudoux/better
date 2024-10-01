export type User = {
	id: string;
	name: string;
	password: string;
	email: string;
	isAdmin: boolean;
};

export type Habit = {
	id: string;
	name: string;
	isCompleted: boolean;
	points: number;
	userId: string;
};

export type Day = {
	id: string;
	date: string;
	habits: string[];
	numPoints: number;
	numHabits: number;
	numHabitCompleted: number;
	percentage: number;
};

export type StepRecipie = {
	id: string;
	recipieId: string;
	step: string;
};
