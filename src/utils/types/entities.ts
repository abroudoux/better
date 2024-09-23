export type User = {
	id: string;
	username: string;
	password: string;
	email: string;
	phone?: string;
	created_at: string;
	updated_at: string;
	profile_picture?: string;
};

export type Habit = {
	id: string;
	user_id: string;
	title: string;
	description?: string;
	is_completed: boolean;
	points: number;
	created_at: string;
	updated_at: string;
};
