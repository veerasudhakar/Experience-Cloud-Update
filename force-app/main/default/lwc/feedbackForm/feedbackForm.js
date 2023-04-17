import { LightningElement,wire } from 'lwc';
import getRatingOptions from '@salesforce/apex/FeedbackSurveyFormController.getRatingOptions';
import submitFeedback from '@salesforce/apex/FeedbackSurveyFormController.submitFeedback';
export default class FeedbackForm extends LightningElement {
    feedback = '';
    rating = '';
    ratingOptions = [];

    @wire(getRatingOptions)
    wiredRatingOptions({ error, data }) {
        if (data) {
            this.ratingOptions = data;
        } else if (error) {
            console.error(error);
        }
    }

    handleFeedbackChange(event) {
        this.feedback = event.target.value;
    }

    handleRatingChange(event) {
        this.rating = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();
        submitFeedback({ feedback: this.feedback, rating: this.rating })
            .then(() => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Feedback Submitted',
                        message: 'Thank you for your feedback!',
                        variant: 'success'
                    })
                );
                this.feedback = '';
                this.rating = '';
            })
            .catch((error) => {
                console.error(error);
            });
    }
}