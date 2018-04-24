import React, { Component } from 'react';
import { Button, Icon, Calendar} from 'antd';

class App extends Component {
	render() {
		return (
			<div>
				<h1>Webpack - ReactJS</h1>
				<Button type="primary">ok - promena</Button>
				<Icon/>
				<Calendar></Calendar>
			</div>
		);
	}
}

export default App;