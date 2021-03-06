import { connect } from 'react-redux';

import EnterpriseApp from '../../components/EnterpriseApp';

import { fetchPortalConfiguration } from '../../data/actions/portalConfiguration';
import { toggleSidebarToggle } from '../../data/actions/sidebar';

const mapStateToProps = (state) => {
  const enterpriseListState = state.table['enterprise-list'] || {};

  return {
    enterprises: enterpriseListState.data,
    error: state.portalConfiguration.error,
    enableCodeManagementScreen: state.portalConfiguration.enableCodeManagementScreen,
    enableSubscriptionManagementScreen: state.portalConfiguration.enableSubscriptionManagementScreen, // eslint-disable-line max-len
    enableSamlConfigurationScreen: state.portalConfiguration.enableSamlConfigurationScreen,
    enterpriseId: state.portalConfiguration.enterpriseId,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPortalConfiguration: (slug) => {
    dispatch(fetchPortalConfiguration(slug));
  },
  toggleSidebarToggle: () => {
    dispatch(toggleSidebarToggle());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EnterpriseApp);
