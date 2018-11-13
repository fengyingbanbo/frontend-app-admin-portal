import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@edx/paragon';

import CouponDetails from '../../containers/CouponDetails';

import { isTriggerKey } from '../../utils';

import './Coupon.scss';

const triggerKeys = {
  OPEN_DETAILS: [' ', 'Enter'],
  CLOSE_DETAILS: [' ', 'Enter', 'Escape'],
};

class Coupon extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      detailsExpanded: false,
      dimmed: false,
    };

    this.toggleCouponDetails = this.toggleCouponDetails.bind(this);
    this.handleCouponKeyDown = this.handleCouponKeyDown.bind(this);
  }

  setCouponOpacity(dimmedStatus) {
    this.setState({
      dimmed: dimmedStatus,
    });
  }

  closeCouponDetails() {
    this.setState({
      detailsExpanded: false,
      dimmed: false,
    });
  }

  toggleCouponDetails() {
    const detailsExpanded = !this.state.detailsExpanded;

    this.setState({
      detailsExpanded,
      dimmed: false,
    });

    if (detailsExpanded) {
      this.props.onExpand();
    } else {
      this.props.onCollapse();
    }
  }

  handleCouponKeyDown(event) {
    const { detailsExpanded } = this.state;
    if (!detailsExpanded && isTriggerKey({ triggerKeys, action: 'OPEN_DETAILS', key: event.key })) {
      event.preventDefault();
      this.toggleCouponDetails();
    } else if (detailsExpanded && isTriggerKey({ triggerKeys, action: 'CLOSE_DETAILS', key: event.key })) {
      event.preventDefault();
      this.toggleCouponDetails();
    }
  }

  renderExpandCollapseIcon() {
    const { detailsExpanded } = this.state;
    const iconClass = detailsExpanded ? 'fa-chevron-up' : 'fa-chevron-down';
    const iconColor = detailsExpanded ? 'text-white' : 'text-primary';
    const screenReaderText = detailsExpanded ? 'Close' : 'Open';
    return (
      <Icon
        className={['fa', iconClass, iconColor]}
        screenReaderText={`${screenReaderText} coupon details`}
      />
    );
  }

  renderErrorIcon() {
    return (
      <Icon
        className={['fa', 'fa-exclamation-circle', 'text-danger', 'mr-2']}
        screenReaderText="Coupon has an error."
      />
    );
  }

  render() {
    const { detailsExpanded, dimmed } = this.state;
    const { data } = this.props;

    return (
      <div
        className={classNames(
          'coupon mb-3 mb-lg-2 rounded border',
          {
            expanded: detailsExpanded,
            'border-danger': data.hasError && !detailsExpanded,
            dimmed,
          },
        )}
      >
        <div
          className={classNames(
            'metadata',
            'row no-gutters p-2 d-flex align-items-center',
            {
              rounded: !detailsExpanded,
              'rounded-top': detailsExpanded,
            },
          )}
          onClick={this.toggleCouponDetails}
          onKeyDown={this.handleCouponKeyDown}
          role="button"
          tabIndex="0"
          aria-expanded={detailsExpanded}
          aria-controls={`coupon-details-${data.id}`}
        >
          <div className="col-sm-12 col-lg-3 mb-2 mb-lg-0">
            <small className={classNames({ 'text-muted': !detailsExpanded, 'text-light': detailsExpanded })}>Coupon Name</small>
            <div>{data.title}</div>
          </div>
          <div className="col-sm-12 col-lg-4 mb-2 mb-lg-0">
            <div className="row no-gutters">
              <div className="col">
                <small className={classNames({ 'text-muted': !detailsExpanded, 'text-light': detailsExpanded })}>Valid From</small>
                <div>{data.validFromDate}</div>
              </div>
              <div className="col">
                <small className={classNames({ 'text-muted': !detailsExpanded, 'text-light': detailsExpanded })}>Valid To</small>
                <div>{data.validToDate}</div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-lg-4 mb-2 mb-lg-0">
            <div className="row no-gutters">
              <div className="col">
                <small className={classNames({ 'text-muted': !detailsExpanded, 'text-light': detailsExpanded })}>Unassigned Codes</small>
                <div>{data.unassignedCodes}</div>
              </div>
              <div className="col">
                <small className={classNames({ 'text-muted': !detailsExpanded, 'text-light': detailsExpanded })}>Enrollments Redeemed</small>
                <div>
                  {`${data.enrollmentsRedeemed} of ${data.totalEnrollments}`}
                  <span className="ml-1">
                    {`(${Math.round((data.enrollmentsRedeemed / data.totalEnrollments) * 100)}%)`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="icons col-lg-1 order-first order-lg-last text-right pr-2 mt-1 m-lg-0">
            {data.hasError && !detailsExpanded && this.renderErrorIcon()}
            {this.renderExpandCollapseIcon()}
          </div>
        </div>
        {<CouponDetails id={data.id} expanded={detailsExpanded} hasError={data.hasError} />}
      </div>
    );
  }
}

Coupon.defaultProps = {
  onExpand: () => {},
  onCollapse: () => {},
};

Coupon.propTypes = {
  data: PropTypes.shape({
    // ...
  }).isRequired,
  onExpand: PropTypes.func,
  onCollapse: PropTypes.func,
};

export default Coupon;