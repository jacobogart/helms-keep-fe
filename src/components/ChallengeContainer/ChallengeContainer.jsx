import React, { Component } from 'react';
import Challenge from '../../containers/Challenge/Challenge';
import shortid from 'shortid';
import PropTypes from 'prop-types';
export class ChallengeContainer extends Component {
	state = {
		chalInput: ''
	};

	// componentDidUpdate() {
	// 	this.scrollToBottom();
	// }

	// scrollToBottom() {
	// 	this.el.scrollIntoView({ behavior: 'smooth' });
	// }

	handleChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleSubmit = e => {
		e.preventDefault();
    const challenge = { id: shortid.generate(), message: this.state.chalInput, isCompleted: false };
    const { viewType } = this.props;

		if (viewType === 'list') {
			this.props.addChallenge(challenge);
		} else {
			this.props.saveChallenge(challenge);
		}
		this.setState({ chalInput: '' });
	};

  render() {
		const ulClass = this.props.challengeType === 'complete' ? 'complete-ul' : 'incomplete-ul';

		const newChallengeInput =
			this.props.challengeType !== 'complete' ? (
        <form className="form-row" onSubmit={this.handleSubmit}>
					<input
						className="new-challenge-input"
						placeholder="+ Add new challenge..."
						name="chalInput"
						onChange={this.handleChange}
						value={this.state.chalInput}
					/>
					<button type="submit" className="add-challenge-btn" disabled={!this.state.chalInput}>
						+
					</button>
				</form>
			) : null;

		const challenges = this.props.challenges.map(chal => {
			return (
				<Challenge
					data={chal}
					viewType={this.props.viewType}
					key={chal.id}
					updateChallenge={this.props.updateChallenge}
          deleteChallenge={this.props.deleteChallenge}
          editChallenge={this.props.editChallenge}
          removeChallenge={this.props.removeChallenge}
				/>
			);
		});

		return (
			<article className="ChallengeContainer">
				<ul className={ulClass}>
					{challenges}
					<div
						ref={el => {
							this.el = el;
						}}
					/>
				</ul>
				{newChallengeInput}
			</article>
		);
	}
}
ChallengeContainer.propTypes = {
	addChallenge: PropTypes.func,
	challenges: PropTypes.arrayOf(PropTypes.object),
	deleteChallenge: PropTypes.func,
	type: PropTypes.string,
	updateChallenge: PropTypes.func
  };

export default ChallengeContainer;
