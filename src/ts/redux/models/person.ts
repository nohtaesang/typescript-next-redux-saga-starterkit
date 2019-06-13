export type Person = {
	id: number;
	firstName: string;
	lastName: string;
	age: number;
	groupId: number;
};

export type PersonState = Readonly<{
	personList: Person[];
}>;
