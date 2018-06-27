import gql from 'graphql-tag';

import { Tag } from './tag.model';

export const TagsQuery = gql`
  query Tags($where: TagWhereInput, $orderBy: TagOrderByInput) {
    tags(where: $where, orderBy: $orderBy) {
      id
      name
      color
      createdAt
      updatedAt
      bills(orderBy: name_ASC) {
        name
        nextDueDate
      }
    }
  }
`;
export interface TagsQueryResponse {
  tags: Tag[];
}

export const TagQuery = gql`
  query Tag($where: TagWhereUniqueInput!) {
    tag(where: $where) {
      id
      name
      color
      createdAt
      updatedAt
      bills(orderBy: name_ASC) {
        name
        nextDueDate
      }
    }
  }
`;
export interface TagQueryResponse {
  tag: Tag;
}

export const CreateTagMutation = gql`
  mutation CreateTag($data: TagCreateInput!) {
    createTag(data: $data) {
      id
      name
    }
  }
`;
export interface CreateTagMutationResponse {
  tag: Tag;
}

export const UpdateTagMutation = gql`
  mutation UpdateTag($data: TagUpdateInput!, $where: TagWhereUniqueInput!) {
    updateTag(data: $data, where: $where) {
      id
      name
    }
  }
`;
export interface UpdateTagMutationResponse {
  tag: Tag;
}

export const DeleteTagMutation = gql`
  mutation DeleteTag($where: TagWhereUniqueInput!) {
    deleteTag(where: $where) {
      id
    }
  }
`;
