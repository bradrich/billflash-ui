import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { appApiUri } from '../app.constants';

@NgModule({
  exports : [
    ApolloModule,
    HttpLinkModule
  ]
})
export class SharedApolloModule {

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink
  ) {
    const uri = appApiUri;
    const http = httpLink.create({ uri });
    const cache = new InMemoryCache();

    apollo.create({
      link: http,
      cache: cache,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'cache-first',
          errorPolicy: 'ignore'
        },
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all'
        },
        mutate: {
          errorPolicy: 'all'
        }
      }
    });
  }

}
