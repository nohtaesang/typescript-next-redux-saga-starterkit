import { personActionConstant as pac, PersonActionsTypes, GetPersonListSuccessType } from '../actions/person';
import { PersonState } from '../models/person';

const initialState: PersonState = {
	personList: []
};

export default (state = initialState, action: PersonActionsTypes): PersonState => {
	switch (action.type) {
		case pac.GET_PERSON_LIST:
			return state;
		case pac.GET_PERSON_LIST_SUCCESS:
			return { ...state, personList: (action as GetPersonListSuccessType).payload };
		default:
			return state;
	}
};
