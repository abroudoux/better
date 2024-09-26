export type User = {
	id: string;
	name: string;
	password: string;
	email: string;
	isAdmin: boolean;
	createdAt: string;
	updatedAt: string;
};

export type Habit = {
	id: string;
	name: string;
	isCompleted: boolean;
	points: number;
};

export type Book = {
	id: string;
	title: string;
	author: string;
	review?: string;
	status: "read" | "reading" | "want to read";
	externalLink?: string;
	createdAt: string;
	updatedAt: string;
};

export type Recipie = {
	id: string;
	title: string;
	description?: string;
	ingredients: string[];
	steps: string[];
	externalLink?: string;
	comment?: string;
	createdAt: string;
	updatedAt: string;
};

export type Learning = {
	id: string;
	title: string;
	exercies: string[];
	externalLink?: string;
	comment?: string;
	status: "done" | "doing";
	createdAt: string;
	updatedAt: string;
};
