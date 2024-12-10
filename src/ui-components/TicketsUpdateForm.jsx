/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getTickets } from "../graphql/queries";
import { updateTickets } from "../graphql/mutations";
const client = generateClient();
export default function TicketsUpdateForm(props) {
  const {
    id: idProp,
    tickets: ticketsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    UserId: "",
    EventId: "",
    TicketId: "",
    FirstName: "",
    LastName: "",
    Email: "",
    PhoneNumber: "",
    PaymentStatus: "",
    Timestamp: "",
    TicketUsed: false,
    QRData: "",
  };
  const [UserId, setUserId] = React.useState(initialValues.UserId);
  const [EventId, setEventId] = React.useState(initialValues.EventId);
  const [TicketId, setTicketId] = React.useState(initialValues.TicketId);
  const [FirstName, setFirstName] = React.useState(initialValues.FirstName);
  const [LastName, setLastName] = React.useState(initialValues.LastName);
  const [Email, setEmail] = React.useState(initialValues.Email);
  const [PhoneNumber, setPhoneNumber] = React.useState(
    initialValues.PhoneNumber
  );
  const [PaymentStatus, setPaymentStatus] = React.useState(
    initialValues.PaymentStatus
  );
  const [Timestamp, setTimestamp] = React.useState(initialValues.Timestamp);
  const [TicketUsed, setTicketUsed] = React.useState(initialValues.TicketUsed);
  const [QRData, setQRData] = React.useState(initialValues.QRData);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = ticketsRecord
      ? { ...initialValues, ...ticketsRecord }
      : initialValues;
    setUserId(cleanValues.UserId);
    setEventId(cleanValues.EventId);
    setTicketId(cleanValues.TicketId);
    setFirstName(cleanValues.FirstName);
    setLastName(cleanValues.LastName);
    setEmail(cleanValues.Email);
    setPhoneNumber(cleanValues.PhoneNumber);
    setPaymentStatus(cleanValues.PaymentStatus);
    setTimestamp(cleanValues.Timestamp);
    setTicketUsed(cleanValues.TicketUsed);
    setQRData(cleanValues.QRData);
    setErrors({});
  };
  const [ticketsRecord, setTicketsRecord] = React.useState(ticketsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getTickets.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTickets
        : ticketsModelProp;
      setTicketsRecord(record);
    };
    queryData();
  }, [idProp, ticketsModelProp]);
  React.useEffect(resetStateValues, [ticketsRecord]);
  const validations = {
    UserId: [],
    EventId: [],
    TicketId: [],
    FirstName: [],
    LastName: [],
    Email: [{ type: "Email" }],
    PhoneNumber: [{ type: "Phone" }],
    PaymentStatus: [],
    Timestamp: [],
    TicketUsed: [],
    QRData: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          UserId: UserId ?? null,
          EventId: EventId ?? null,
          TicketId: TicketId ?? null,
          FirstName: FirstName ?? null,
          LastName: LastName ?? null,
          Email: Email ?? null,
          PhoneNumber: PhoneNumber ?? null,
          PaymentStatus: PaymentStatus ?? null,
          Timestamp: Timestamp ?? null,
          TicketUsed: TicketUsed ?? null,
          QRData: QRData ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateTickets.replaceAll("__typename", ""),
            variables: {
              input: {
                id: ticketsRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "TicketsUpdateForm")}
      {...rest}
    >
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        value={UserId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UserId: value,
              EventId,
              TicketId,
              FirstName,
              LastName,
              Email,
              PhoneNumber,
              PaymentStatus,
              Timestamp,
              TicketUsed,
              QRData,
            };
            const result = onChange(modelFields);
            value = result?.UserId ?? value;
          }
          if (errors.UserId?.hasError) {
            runValidationTasks("UserId", value);
          }
          setUserId(value);
        }}
        onBlur={() => runValidationTasks("UserId", UserId)}
        errorMessage={errors.UserId?.errorMessage}
        hasError={errors.UserId?.hasError}
        {...getOverrideProps(overrides, "UserId")}
      ></TextField>
      <TextField
        label="Event id"
        isRequired={false}
        isReadOnly={false}
        value={EventId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UserId,
              EventId: value,
              TicketId,
              FirstName,
              LastName,
              Email,
              PhoneNumber,
              PaymentStatus,
              Timestamp,
              TicketUsed,
              QRData,
            };
            const result = onChange(modelFields);
            value = result?.EventId ?? value;
          }
          if (errors.EventId?.hasError) {
            runValidationTasks("EventId", value);
          }
          setEventId(value);
        }}
        onBlur={() => runValidationTasks("EventId", EventId)}
        errorMessage={errors.EventId?.errorMessage}
        hasError={errors.EventId?.hasError}
        {...getOverrideProps(overrides, "EventId")}
      ></TextField>
      <TextField
        label="Ticket id"
        isRequired={false}
        isReadOnly={false}
        value={TicketId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UserId,
              EventId,
              TicketId: value,
              FirstName,
              LastName,
              Email,
              PhoneNumber,
              PaymentStatus,
              Timestamp,
              TicketUsed,
              QRData,
            };
            const result = onChange(modelFields);
            value = result?.TicketId ?? value;
          }
          if (errors.TicketId?.hasError) {
            runValidationTasks("TicketId", value);
          }
          setTicketId(value);
        }}
        onBlur={() => runValidationTasks("TicketId", TicketId)}
        errorMessage={errors.TicketId?.errorMessage}
        hasError={errors.TicketId?.hasError}
        {...getOverrideProps(overrides, "TicketId")}
      ></TextField>
      <TextField
        label="First name"
        isRequired={false}
        isReadOnly={false}
        value={FirstName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UserId,
              EventId,
              TicketId,
              FirstName: value,
              LastName,
              Email,
              PhoneNumber,
              PaymentStatus,
              Timestamp,
              TicketUsed,
              QRData,
            };
            const result = onChange(modelFields);
            value = result?.FirstName ?? value;
          }
          if (errors.FirstName?.hasError) {
            runValidationTasks("FirstName", value);
          }
          setFirstName(value);
        }}
        onBlur={() => runValidationTasks("FirstName", FirstName)}
        errorMessage={errors.FirstName?.errorMessage}
        hasError={errors.FirstName?.hasError}
        {...getOverrideProps(overrides, "FirstName")}
      ></TextField>
      <TextField
        label="Last name"
        isRequired={false}
        isReadOnly={false}
        value={LastName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UserId,
              EventId,
              TicketId,
              FirstName,
              LastName: value,
              Email,
              PhoneNumber,
              PaymentStatus,
              Timestamp,
              TicketUsed,
              QRData,
            };
            const result = onChange(modelFields);
            value = result?.LastName ?? value;
          }
          if (errors.LastName?.hasError) {
            runValidationTasks("LastName", value);
          }
          setLastName(value);
        }}
        onBlur={() => runValidationTasks("LastName", LastName)}
        errorMessage={errors.LastName?.errorMessage}
        hasError={errors.LastName?.hasError}
        {...getOverrideProps(overrides, "LastName")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={Email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UserId,
              EventId,
              TicketId,
              FirstName,
              LastName,
              Email: value,
              PhoneNumber,
              PaymentStatus,
              Timestamp,
              TicketUsed,
              QRData,
            };
            const result = onChange(modelFields);
            value = result?.Email ?? value;
          }
          if (errors.Email?.hasError) {
            runValidationTasks("Email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("Email", Email)}
        errorMessage={errors.Email?.errorMessage}
        hasError={errors.Email?.hasError}
        {...getOverrideProps(overrides, "Email")}
      ></TextField>
      <TextField
        label="Phone number"
        isRequired={false}
        isReadOnly={false}
        type="tel"
        value={PhoneNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UserId,
              EventId,
              TicketId,
              FirstName,
              LastName,
              Email,
              PhoneNumber: value,
              PaymentStatus,
              Timestamp,
              TicketUsed,
              QRData,
            };
            const result = onChange(modelFields);
            value = result?.PhoneNumber ?? value;
          }
          if (errors.PhoneNumber?.hasError) {
            runValidationTasks("PhoneNumber", value);
          }
          setPhoneNumber(value);
        }}
        onBlur={() => runValidationTasks("PhoneNumber", PhoneNumber)}
        errorMessage={errors.PhoneNumber?.errorMessage}
        hasError={errors.PhoneNumber?.hasError}
        {...getOverrideProps(overrides, "PhoneNumber")}
      ></TextField>
      <TextField
        label="Payment status"
        isRequired={false}
        isReadOnly={false}
        value={PaymentStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UserId,
              EventId,
              TicketId,
              FirstName,
              LastName,
              Email,
              PhoneNumber,
              PaymentStatus: value,
              Timestamp,
              TicketUsed,
              QRData,
            };
            const result = onChange(modelFields);
            value = result?.PaymentStatus ?? value;
          }
          if (errors.PaymentStatus?.hasError) {
            runValidationTasks("PaymentStatus", value);
          }
          setPaymentStatus(value);
        }}
        onBlur={() => runValidationTasks("PaymentStatus", PaymentStatus)}
        errorMessage={errors.PaymentStatus?.errorMessage}
        hasError={errors.PaymentStatus?.hasError}
        {...getOverrideProps(overrides, "PaymentStatus")}
      ></TextField>
      <TextField
        label="Timestamp"
        isRequired={false}
        isReadOnly={false}
        value={Timestamp}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UserId,
              EventId,
              TicketId,
              FirstName,
              LastName,
              Email,
              PhoneNumber,
              PaymentStatus,
              Timestamp: value,
              TicketUsed,
              QRData,
            };
            const result = onChange(modelFields);
            value = result?.Timestamp ?? value;
          }
          if (errors.Timestamp?.hasError) {
            runValidationTasks("Timestamp", value);
          }
          setTimestamp(value);
        }}
        onBlur={() => runValidationTasks("Timestamp", Timestamp)}
        errorMessage={errors.Timestamp?.errorMessage}
        hasError={errors.Timestamp?.hasError}
        {...getOverrideProps(overrides, "Timestamp")}
      ></TextField>
      <SwitchField
        label="Ticket used"
        defaultChecked={false}
        isDisabled={false}
        isChecked={TicketUsed}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              UserId,
              EventId,
              TicketId,
              FirstName,
              LastName,
              Email,
              PhoneNumber,
              PaymentStatus,
              Timestamp,
              TicketUsed: value,
              QRData,
            };
            const result = onChange(modelFields);
            value = result?.TicketUsed ?? value;
          }
          if (errors.TicketUsed?.hasError) {
            runValidationTasks("TicketUsed", value);
          }
          setTicketUsed(value);
        }}
        onBlur={() => runValidationTasks("TicketUsed", TicketUsed)}
        errorMessage={errors.TicketUsed?.errorMessage}
        hasError={errors.TicketUsed?.hasError}
        {...getOverrideProps(overrides, "TicketUsed")}
      ></SwitchField>
      <TextField
        label="Qr data"
        isRequired={false}
        isReadOnly={false}
        value={QRData}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              UserId,
              EventId,
              TicketId,
              FirstName,
              LastName,
              Email,
              PhoneNumber,
              PaymentStatus,
              Timestamp,
              TicketUsed,
              QRData: value,
            };
            const result = onChange(modelFields);
            value = result?.QRData ?? value;
          }
          if (errors.QRData?.hasError) {
            runValidationTasks("QRData", value);
          }
          setQRData(value);
        }}
        onBlur={() => runValidationTasks("QRData", QRData)}
        errorMessage={errors.QRData?.errorMessage}
        hasError={errors.QRData?.hasError}
        {...getOverrideProps(overrides, "QRData")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || ticketsModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || ticketsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
