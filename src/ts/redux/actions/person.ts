import { Person } from '../models/person';
export const personActionConstant = {
	GET_PERSON_LIST: 'GET_PERSON_LIST',
	GET_PERSON_LIST_SUCCESS: 'GET_PERSON_LIST_SUCCESS'
};

export const getPersonList = (groupId: number) => ({
	type: personActionConstant.GET_PERSON_LIST,
	payload: groupId
});

export const getPersonListSuccess = (personList: Person[]) => ({
	type: personActionConstant.GET_PERSON_LIST_SUCCESS,
	payload: personList
});

export type GetPersonListType = ReturnType<typeof getPersonList>;
export type GetPersonListSuccessType = ReturnType<typeof getPersonListSuccess>;

export type PersonActionsTypes = GetPersonListType | GetPersonListSuccessType;
