export type Habit = {
	id: string;
	name: string;
	isCompleted: boolean;
};

export type Day = {
	id: string;
	date: string;
	habits: Habit[];
	habitsNum: number;
	habitsCompleted: number;
	percentage: number;
};
