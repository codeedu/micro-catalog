import {Provider} from '@loopback/context';

import {
  AuthorizationContext,
  AuthorizationDecision,
  AuthorizationMetadata,
  Authorizer,
} from '@loopback/authorization';

export class SubscriberAuthorizationProvider implements Provider<Authorizer> {
  constructor() {}

  value() {
    return this.authorize.bind(this);
  }

  async authorize(
    authorizationCtx: AuthorizationContext,
    metadata: AuthorizationMetadata,
  ) {
    //expiracao - catalog admin não tem que verificar a expiracao
    const allowedRoles = metadata.allowedRoles; //roles definidas no controller subscriber
    const userRoles = authorizationCtx.principals[0].roles; //roles do usuario
    return allowedRoles?.find((r) => userRoles.includes(r))
      ? AuthorizationDecision.ALLOW
      : AuthorizationDecision.DENY;
  }
}
