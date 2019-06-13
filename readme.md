# 2019-06-13 기준
# typescript-next-redux-saga-starterkit

typescript를 시작하면서 기존의 사용하던 것들을 입히는 작업들이 어려웠다. 여러 시행착오를 거쳐 현재 사용하고 있는 방법을 정리했다.

## 1. 구성
### Front-End
```
react.js, next.js, typescript, redux-saga
```

## 2. 기본 셋팅하기
### 1. npm init
```
npm init
```

### 2. react.js, next.js 설치
```
npm install --save react react-dom next @types/react @types/react-dom @types/next
```

### 3. typescript 설치
```
npm install --save-dev typescript awesome-typescript-loader source-map-loader
```

### 4. next.js 와 typescript 호환 플러그인 설치
```
npm install --save @zeit/next-typescript
```


### redux-saga 설치
```
npm install --save redux react-redux redux-logger redux-saga @types/redux @types/react-redux @types/redux-logger @types/redux-saga
```


### .babelrc.js 추가
```javascript
module.exports = {
	presets: [ 'next/babel', '@zeit/next-typescript/babel' ]
};
```

### next.config.js 추가
```javascript
const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript();

```

### tsconfig.json 추가
```javascript
{
    "compilerOptions": {
      "module": "esnext",
      "target": "esnext",
      "jsx": "preserve",
      "sourceMap": false,
      "moduleResolution": "node"
    },
    "exclude": [
      "out",
      ".next"
    ]
}
```

### package.json 수정
```
"scripts": {
    "dev": "next",
    "build": "NODE_ENV=production next build",
    "start": "next start"
},
```

### directory 구조
```
node_modules
pages
    - _app.tsx
    - _document.tsx
    - index.tsx
src
    - ts
        - components
        - layouts
        - redux
            - actions
            - models
            - reducers
                - index.ts
            - sagas
                - index.ts
            - store
                - index.ts
.babelrc.js
.gitignore
next.config.js
package.json
readme.md
tsconfig.json
```

### pages 폴더 하위 파일 수정
#### pages/_app.tsx
```typescript
import App, { Container } from 'next/app';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../src/ts/redux/store';

export default class MyApp extends App {
	static async getInitialProps({ Component, router, ctx }) {
		let pageProps = {};

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	render() {
		const { Component, pageProps } = this.props;
		return (
			<Container>
				<Provider store={store}>
					<Component {...pageProps} />
				</Provider>
			</Container>
		);
	}
}

```
#### pages/_document.tsx
```typescript
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<html>
				<Head>
					<style>{`body { margin: 0 } /* custom! */`}</style>
				</Head>
				<body className="custom_class">
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}

```

#### index/index.tsx
```typescript
import * as React from 'react';

export default class extends React.Component {
	render() {
		return <div>Hello Kirin</div>;
	}
}

```

### redux 폴더 하위 파일 수정
#### src/ts/redux/reducers
```typescript
import { combineReducers } from 'redux';

const rootReducer = combineReducers({});

export default rootReducer;

export type State = {};
```
#### src/ts/redux/sagas
```typescript
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
	yield all([]); 
}

```
#### src/ts/redux/store
```typescript
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import { logger } from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware, logger));

sagaMiddleware.run(rootSaga);

export default store;
```

### 빌드 및 실행
```
yarn run dev
```

## 3. 간단한 예제 파일 추가
### 목표
* DB에서 사용자의 입력에 일치하는 groupId 값을 가진 person 을 가져와 출력한다.

```
pages
	- person.tsx (add)

src
	- ts
		- components
			- person (add)
				- index.tsx (add)
		- redux
			- actions
				- person.ts (add)
			- models
				- person.ts (add)
			- reducers
				- index.ts (edit)
				- person.ts (add)
			- sagas
				- index.ts (edit)
				- person.ts (add)
```

#### pages/person.tsx
```typescript
import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import Person from '../src/ts/components/person';

const App: FunctionComponent = () => {
	return <Person />;
};

export default App;
```

#### src/ts/components/person/index.tsx
```typescript
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
```

#### src/ts/redux/actions/person.ts
```typescript
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
```

#### src/ts/redux/models/person.ts
```typescript
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

```
#### src/ts/redux/reducers/index.ts
```typescript
import { combineReducers } from 'redux';
import personReducer from './person';
import { PersonState } from '../models/person';

const rootReducer = combineReducers({ personReducer }); 

export default rootReducer;

export type State = {
	personReducer: PersonState;
};

```
#### src/ts/redux/reducers/person.ts
```typescript
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
```
#### src/ts/redux/sagas/index.ts
```typescript
import { all } from 'redux-saga/effects';
import { watchGetPersonList } from './person';

export default function* rootSaga() {
	yield all([ watchGetPersonList() ]);
}
```
#### src/ts/redux/sagas/person.ts
```typescript
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

const personDummy = [
	{
		id: 0,
		firstName: 'noh',
		lastName: 'taesang',
		age: 28,
		groupId: 0
	},
	{
		id: 1,
		firstName: 'cha',
		lastName: 'yoonjae',
		age: 15,
		groupId: 0
	},
	{
		id: 2,
		firstName: 'bang',
		lastName: 'kyeongmin',
		age: 2,
		groupId: 1
	}
];

```

### 실행 후 확인하기
#### 1. npm run dev
#### 2. http://localhost:3000/person 로 이동
#### 3. input창에 0, 1을 입력하고 출력 결과 확인하기


## References
