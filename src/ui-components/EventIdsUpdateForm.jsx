/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getEventIds } from "../graphql/queries";
import { updateEventIds } from "../graphql/mutations";
const client = generateClient();
export default function EventIdsUpdateForm(props) {
  const {
    id: idProp,
    eventIds: eventIdsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Year: "",
    TicketPrice: "",
  };
  const [Year, setYear] = React.useState(initialValues.Year);
  const [TicketPrice, setTicketPrice] = React.useState(
    initialValues.TicketPrice
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = eventIdsRecord
      ? { ...initialValues, ...eventIdsRecord }
      : initialValues;
    setYear(cleanValues.Year);
    setTicketPrice(cleanValues.TicketPrice);
    setErrors({});
  };
  const [eventIdsRecord, setEventIdsRecord] = React.useState(eventIdsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getEventIds.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getEventIds
        : eventIdsModelProp;
      setEventIdsRecord(record);
    };
    queryData();
  }, [idProp, eventIdsModelProp]);
  React.useEffect(resetStateValues, [eventIdsRecord]);
  const validations = {
    Year: [],
    TicketPrice: [],
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
          Year: Year ?? null,
          TicketPrice: TicketPrice ?? null,
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
            query: updateEventIds.replaceAll("__typename", ""),
            variables: {
              input: {
                id: eventIdsRecord.id,
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
      {...getOverrideProps(overrides, "EventIdsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Year"
        isRequired={false}
        isReadOnly={false}
        value={Year}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Year: value,
              TicketPrice,
            };
            const result = onChange(modelFields);
            value = result?.Year ?? value;
          }
          if (errors.Year?.hasError) {
            runValidationTasks("Year", value);
          }
          setYear(value);
        }}
        onBlur={() => runValidationTasks("Year", Year)}
        errorMessage={errors.Year?.errorMessage}
        hasError={errors.Year?.hasError}
        {...getOverrideProps(overrides, "Year")}
      ></TextField>
      <TextField
        label="Ticket price"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={TicketPrice}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              Year,
              TicketPrice: value,
            };
            const result = onChange(modelFields);
            value = result?.TicketPrice ?? value;
          }
          if (errors.TicketPrice?.hasError) {
            runValidationTasks("TicketPrice", value);
          }
          setTicketPrice(value);
        }}
        onBlur={() => runValidationTasks("TicketPrice", TicketPrice)}
        errorMessage={errors.TicketPrice?.errorMessage}
        hasError={errors.TicketPrice?.hasError}
        {...getOverrideProps(overrides, "TicketPrice")}
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
          isDisabled={!(idProp || eventIdsModelProp)}
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
              !(idProp || eventIdsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
