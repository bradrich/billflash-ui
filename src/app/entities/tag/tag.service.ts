import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BillsQuery } from '../bill/bill.graphql';
import { DeleteTagMutation } from './tag.graphql';
import { Tag } from './tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(
    private apollo: Apollo
  ) {}

  /**
   * Edits a `tag` through the API.
   * @param {Tag} tag
   * @param {*} queryVariables
   * @param {*} mutation
   * @returns {Observable<any>}
   */
  edit(tag: Tag, queryVariables: any, mutation: any): Observable<any> {
    return this.apollo
        .mutate({
          mutation: mutation,
          variables: { data: tag },
          refetchQueries: [{
            query: BillsQuery,
            variables: queryVariables
          }]
        })
        .pipe(
          catchError((err) => throwError(err))
        );
  }

  /**
   * Deletes a `tag` through the API
   * @param {*} variables
   * @param {*} queryVariables
   * @returns {Observable<any>}
   */
  delete(variables: any, queryVariables: any): Observable<any> {
    return this.apollo
        .mutate({
          mutation: DeleteTagMutation,
          variables: variables,
          refetchQueries: [{
            query: BillsQuery,
            variables: queryVariables
          }]
        })
        .pipe(
          catchError((err) => throwError(err))
        );
  }

}
