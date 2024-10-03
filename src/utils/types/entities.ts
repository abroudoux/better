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
	userId?: string;
};

export type Day = {
	id: string;
	userId: string;
	date: string;
	habits: Habit[];
	habitsCompleted: number;
	percentage: number;
};

export type Training = {
	id: string;
	userId?: string;
	name: string;
	isArchived: boolean;
	circuits?: Circuit[];
	exercises: Exercise[];
	duration: number;
	link?: string;
};

export type Circuit = {
	id: string;
	name: string;
	reps: number;
	exercises: Exercise[];
	restExercice: number;
	restCircuit: number;
};

export type Exercise = {
	id: string;
	name: string;
	reps: number;
	sets?: number;
	rest?: number;
};
