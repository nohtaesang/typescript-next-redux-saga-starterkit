import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { State } from '../../redux/reducers';
import { bindActionCreators, Dispatch } from 'redux';
import { getPersonList } from '../../redux/actions/person';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = {};

type ContentProps = StateProps & DispatchProps & OwnProps;

const Test: FunctionComponent<ContentProps> = (props) => {
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
		props.getPersonList(groupId);
	};
	return (
		<div>
			<input onChange={handleChangeGroupInput} value={groupId} />
			<button onClick={onClickGetPersonList}>click me</button>
			<div>
				{props.personList.map((person) => (
					<div key={person.id}>{`${person.firstName} ${person.lastName}`}</div>
				))}
			</div>
		</div>
	);
};

const mapStateToProps = (state: State) => {
	const { personReducer } = state;
	const { personList } = personReducer;
	return { personList };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
	getPersonList: bindActionCreators(getPersonList, dispatch)
});

export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Test);
