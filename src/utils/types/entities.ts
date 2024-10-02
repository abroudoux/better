import type { E } from "vitest/dist/chunks/environment.C5eAp3K6.js";

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
	userId?: string;
	date: string;
	habits: Habit[];
	habitsCompleted: number;
	percentage: number;
};

export type Training = {
	id: string;
	name: string;
	userId?: string;
	exercises: Exercise[];
	dayId?: string;
	comments?: string | string[];
	ameliorations?: string | string[] | Exercise[];
};

export type Exercise = {
	id: string;
	name: string;
	sets: number;
	reps: number;
};
