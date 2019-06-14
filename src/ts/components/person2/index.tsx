import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../redux/reducers';
import { Person } from '../../redux/models/person';
import { personActionConstant } from '../../redux/actions/person';

type OwnProps = {};

const Test: FunctionComponent<OwnProps> = (props) => {
	const personList: Person[] = useSelector((state: State) => state.personReducer.personList);
	const dispatch = useDispatch();

	const [ groupId, setGroupId ] = useState(0);

	const handleChangeGroupInput = (e) => {
		const nextGroupId = parseInt(e.target.value);
		if (isNaN(nextGroupId)) {
			setGroupId(0);
		} else {
			setGroupId(nextGroupId);
		}
	};

	const onClickGetPersonList = () => {
		dispatch({ type: personActionConstant.GET_PERSON_LIST, payload: groupId });
	};
	return (
		<div>
			<input onChange={handleChangeGroupInput} value={groupId} />
			<button onClick={onClickGetPersonList}>click me</button>
			<div>
				{personList.map((person) => <div key={person.id}>{`${person.firstName} ${person.lastName}`}</div>)}
			</div>
		</div>
	);
};

export default Test;
