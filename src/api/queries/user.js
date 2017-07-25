import gql from 'graphql-tag';

export const getUserQuery = (login) => gql`
  {
    user(login: ${login}) {
      name
      bio
      email
      location
      company
      websteUrl
      viewerIsFollowing
      followers {
        totalCount
      }
      following {
        totalCount
      }
      repositories {
        totalCount
      }
      organizations(first: 100) {
        edges {
          node {
            avatarUrl
            login
          }
        }
      }
    }
  }
`;
