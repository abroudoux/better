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

export type Budget = {
	id: string;
	sources: SourceBudget[];
};

export type SourceBudget = {
	id: string;
	name: string;
	interestRate: number;
	amount: number;
};
