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
