import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Button, Icon } from '@edx/paragon';

import RenderField from '../RenderField';
import StatusAlert from '../StatusAlert';
import TextAreaAutoSize from '../TextAreaAutoSize';

import { isRequired, isValidEmail, maxLength512 } from '../../utils';

class SupportForm extends React.Component {
  renderErrorMessage() {
    const { error: { message } } = this.props;

    return (
      <StatusAlert
        className="mt-3"
        alertType="danger"
        iconClassName="fa fa-times-circle"
        title="Unable to send your request to the edX Customer Success team."
        message={`Try refreshing your screen (${message})`}
      />
    );
  }

  renderSuccessMessage() {
    return (
      <StatusAlert
        className="mt-3"
        alertType="success"
        iconClassName="fa fa-check-circle"
        title="Request received"
        message="The edX Customer Success team will contact you soon."
        dismissible
      />
    );
  }

  render() {
    const {
      handleSubmit,
      submitting,
      invalid,
      submitSucceeded,
      submitFailed,
      error,
    } = this.props;

    return (
      <React.Fragment>
        {submitFailed && error && this.renderErrorMessage()}
        {submitSucceeded && this.renderSuccessMessage()}
        <div className="support-form row">
          <div className="col-12 col-md-6 col-lg-4">
            <form onSubmit={handleSubmit}>
              <Field
                name="emailAddress"
                type="email"
                component={RenderField}
                label={
                  <React.Fragment>
                    Email Address
                    <span className="required">*</span>
                  </React.Fragment>
                }
                validate={[isRequired, isValidEmail]}
                required
              />
              <Field
                name="enterpriseName"
                type="text"
                component={RenderField}
                label={
                  <React.Fragment>
                    Company
                    <span className="required">*</span>
                  </React.Fragment>
                }
                validate={[isRequired]}
                required
                disabled
              />
              <Field
                name="subject"
                type="text"
                component={RenderField}
                label={
                  <React.Fragment>
                    Subject
                    <span className="required">*</span>
                  </React.Fragment>
                }
                validate={[isRequired]}
                required
              />
              <Field
                name="notes"
                type="text"
                component={TextAreaAutoSize}
                label={
                  <React.Fragment>
                    Notes
                    <span className="required">*</span>
                  </React.Fragment>
                }
                validate={[isRequired, maxLength512]}
                required
              />
              <Button
                type="submit"
                disabled={invalid || submitting}
                className="btn-primary"
              >
                <React.Fragment>
                  {submitting && <Icon className="fa fa-spinner fa-spin mr-2" />}
                  Contact Support
                </React.Fragment>
              </Button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

SupportForm.defaultProps = {
  error: null,
};

SupportForm.propTypes = {
  // props From redux-form
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Error),

  // custom props
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  initialValues: PropTypes.shape({
    emailAddress: PropTypes.string.isRequired,
    enterpriseName: PropTypes.string.isRequired,
  }).isRequired,
};

export default reduxForm({ form: 'support-form' })(SupportForm);
