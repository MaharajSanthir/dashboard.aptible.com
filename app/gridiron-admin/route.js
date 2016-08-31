import Ember from 'ember';

export default Ember.Route.extend({
  complianceStatus: Ember.inject.service(),
  model() {
    return this.get('complianceStatus.organizationProfile');
  },

  afterModel(model) {
    if (!model.get('hasCompletedSetup')) {
      this.transitionTo('setup');
    }
  },

  setupController(controller) {
    controller.set('organizations', this.modelFor('gridiron'));
    controller.set('organization', this.modelFor('gridiron-organization'));
  },

  redirect() {
    let context = this.get('complianceStatus.authorizationContext');
    if (!context.get('userIsGridironAdmin')) {
      let message = `Access Denied: You must be a Gridiron Owner in order to view this page`;
      Ember.get(this, 'flashMessages').danger(message);

      this.transitionTo('gridiron-user');
    }
  }
});
