/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEventIds = /* GraphQL */ `
  query GetEventIds($id: ID!) {
    getEventIds(id: $id) {
      id
      Year
      TicketPrice
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEventIds = /* GraphQL */ `
  query ListEventIds(
    $filter: ModelEventIdsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEventIds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        Year
        TicketPrice
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTickets = /* GraphQL */ `
  query GetTickets($id: ID!) {
    getTickets(id: $id) {
      id
      UserId
      EventId
      TicketId
      FirstName
      LastName
      Email
      PhoneNumber
      PaymentStatus
      Timestamp
      TicketUsed
      QRData
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTickets = /* GraphQL */ `
  query ListTickets(
    $filter: ModelTicketsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTickets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        UserId
        EventId
        TicketId
        FirstName
        LastName
        Email
        PhoneNumber
        PaymentStatus
        Timestamp
        TicketUsed
        QRData
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
