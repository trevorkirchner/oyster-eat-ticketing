/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEventIds = /* GraphQL */ `
  mutation CreateEventIds(
    $input: CreateEventIdsInput!
    $condition: ModelEventIdsConditionInput
  ) {
    createEventIds(input: $input, condition: $condition) {
      id
      Year
      TicketPrice
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEventIds = /* GraphQL */ `
  mutation UpdateEventIds(
    $input: UpdateEventIdsInput!
    $condition: ModelEventIdsConditionInput
  ) {
    updateEventIds(input: $input, condition: $condition) {
      id
      Year
      TicketPrice
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEventIds = /* GraphQL */ `
  mutation DeleteEventIds(
    $input: DeleteEventIdsInput!
    $condition: ModelEventIdsConditionInput
  ) {
    deleteEventIds(input: $input, condition: $condition) {
      id
      Year
      TicketPrice
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTickets = /* GraphQL */ `
  mutation CreateTickets(
    $input: CreateTicketsInput!
    $condition: ModelTicketsConditionInput
  ) {
    createTickets(input: $input, condition: $condition) {
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
export const updateTickets = /* GraphQL */ `
  mutation UpdateTickets(
    $input: UpdateTicketsInput!
    $condition: ModelTicketsConditionInput
  ) {
    updateTickets(input: $input, condition: $condition) {
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
export const deleteTickets = /* GraphQL */ `
  mutation DeleteTickets(
    $input: DeleteTicketsInput!
    $condition: ModelTicketsConditionInput
  ) {
    deleteTickets(input: $input, condition: $condition) {
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
