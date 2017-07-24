import gql from 'graphql-tag';

export const getIssueQuery = (owner, name, issue) => gql`
  {
    repository(owner: ${owner}, name: ${name}) {
      issue(number: ${issue}) {
        title
        body
        participants(first: 100) {
          edges {
            node {
              avatarUrl
              login
            }
          }
        }
        author {
          avatarUrl
          login
        }
        labels(first: 5) {
          edges {
            node {
              name
              color
            }
          }
        }
        comments(first: 100) {
          edges {
            node {
              body
              author {
                avatarUrl
                login
              }
            }
          }
        }
      }
    }
  }
`;
