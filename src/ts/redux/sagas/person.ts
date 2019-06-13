import { put, takeLatest } from 'redux-saga/effects';
import { personActionConstant as pac, getPersonListSuccess, GetPersonListType } from '../actions/person';

export function* watchGetPersonList() {
	yield takeLatest(pac.GET_PERSON_LIST, getPersonList);
}

function* getPersonList(action: GetPersonListType) {
	const res = personDummy.filter((p) => {
		console.log(p.groupId, action.payload);
		return p.groupId === action.payload;
	});
	console.log(res);
	yield put(getPersonListSuccess(res));
}

// export type Person = {
// 	id: number;
// 	firstName: string;
// 	lastName: string;
// 	age: number;
// 	groupId: number;
// };

const personDummy = [
	{
		id: 0,
		firstName: 'noh',
		lastName: 'kirin',
		age: 28,
		groupId: 0
	},
	{
		id: 1,
		firstName: 'cha',
		lastName: 'yoonjae',
		age: 27,
		groupId: 0
	},
	{
		id: 2,
		firstName: 'bang',
		lastName: 'kyeongmin',
		age: 29,
		groupId: 1
	}
];
