import Ember from 'ember';

export default function can(user, scope, permittablePromise){
  if(scope === 'manage' && !user.get('verified')) {
    return Ember.RSVP.resolve(false);
  }

  let permittable;

  return new Ember.RSVP.resolve(permittablePromise)
    .then(function(resolvedPermittable) {
      Ember.assert('Must pass a parameter that implements `permitsRole`', !!resolvedPermittable.permitsRole);
      permittable = resolvedPermittable;
      return user.get('roles');
    })
    .then(function(roles){
      return roles.map((role) => {
        return permittable.permitsRole(role, scope);
      }).indexOf(true) > -1;
    });
}
