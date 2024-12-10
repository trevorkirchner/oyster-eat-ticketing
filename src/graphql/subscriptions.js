/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateEventIds = /* GraphQL */ `
  subscription OnCreateEventIds($filter: ModelSubscriptionEventIdsFilterInput) {
    onCreateEventIds(filter: $filter) {
      id
      Year
      TicketPrice
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateEventIds = /* GraphQL */ `
  subscription OnUpdateEventIds($filter: ModelSubscriptionEventIdsFilterInput) {
    onUpdateEventIds(filter: $filter) {
      id
      Year
      TicketPrice
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteEventIds = /* GraphQL */ `
  subscription OnDeleteEventIds($filter: ModelSubscriptionEventIdsFilterInput) {
    onDeleteEventIds(filter: $filter) {
      id
      Year
      TicketPrice
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTickets = /* GraphQL */ `
  subscription OnCreateTickets($filter: ModelSubscriptionTicketsFilterInput) {
    onCreateTickets(filter: $filter) {
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
export const onUpdateTickets = /* GraphQL */ `
  subscription OnUpdateTickets($filter: ModelSubscriptionTicketsFilterInput) {
    onUpdateTickets(filter: $filter) {
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
export const onDeleteTickets = /* GraphQL */ `
  subscription OnDeleteTickets($filter: ModelSubscriptionTicketsFilterInput) {
    onDeleteTickets(filter: $filter) {
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
