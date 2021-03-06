import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['verified-user-alert'],
  store: Ember.inject.service(),

  // We only show the verification banner if we have a user. In most cases we
  // will, but this avoids flicker when we e.g. log the user out (which will
  // nullify the user).
  userNeedsVerification: Ember.computed.not("user.verified"),
  hasUser: Ember.computed.notEmpty("user"),
  showVerificationBanner: Ember.computed.and("hasUser", "userNeedsVerification"),

  sending: false,
  sent: false,
  error: null,
  isDisabled: Ember.computed.or('sending', 'sent'),

  actions: {
    resendVerification: function(){
      this.setProperties({ sending: true, error: null });

      let reset = this.get('store').createRecord('reset', {type:'verification_code'});
      reset.save().then( () => {
        this.set('sent', true);
      }, (e) => {
        this.set('error', e);
      }).finally( () => {
        this.set('sending', false);
      });
    }
  }
});
