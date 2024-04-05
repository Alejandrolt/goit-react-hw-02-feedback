import React, { Component } from 'react';
import { FeedbackOptions } from './FeedbackOptions';
import { Section } from './Section';
import { Statistics } from './Statistics';

class App extends Component {
  state = {
    Good: 0,
    Neutral: 0,
    Bad: 0,
  };

  countTotalFeedback = () => {
    const { Good, Neutral, Bad } = this.state;
    return Good + Neutral + Bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { Good } = this.state;
    const total = this.countTotalFeedback();
    return total === 0 ? 0 : Math.round((Good / total) * 100);
  };

  handleLeaveFeedback = feedback => {
    this.setState(prevState => ({
      [feedback]: prevState[feedback] + 1,
    }));
  };

  render() {
    const { Good, Neutral, Bad } = this.state;
    const total = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    const feedbackOptions = Object.keys(this.state);

    return (
      <div>
        <Section title="Leave Feedback">
          <FeedbackOptions
            options={feedbackOptions}
            onLeaveFeedback={this.handleLeaveFeedback}
          />
        </Section>
        <Section title="Statistics">
          {total === 0 ? (
            <p>There is no feedback</p>
          ) : (
            <Statistics
              good={Good}
              neutral={Neutral}
              bad={Bad}
              total={total}
              positivePercentage={positivePercentage}
            />
          )}
        </Section>
      </div>
    );
  }
}

export default App;
