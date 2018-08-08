import React from 'react';

const COLORS = ['#673ab7', '#2196f3', '#26a69a', '#e91e63']

let Definition = (props) => {
	let { def, idx } = props;

	console.log(props.def);

	let styles = {
		color: '#fff',
		padding: '10px',
		backgroundColor: COLORS[idx]
	}

	return (
		<div className="card text-center" style={styles}>
			<h5>Definition {idx}</h5>
			<p>{def.definitions[0]}</p>
		</div>
	)
}

export default Definition;
