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
