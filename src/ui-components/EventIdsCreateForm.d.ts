/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type EventIdsCreateFormInputValues = {
    Year?: string;
    TicketPrice?: number;
};
export declare type EventIdsCreateFormValidationValues = {
    Year?: ValidationFunction<string>;
    TicketPrice?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type EventIdsCreateFormOverridesProps = {
    EventIdsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    Year?: PrimitiveOverrideProps<TextFieldProps>;
    TicketPrice?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type EventIdsCreateFormProps = React.PropsWithChildren<{
    overrides?: EventIdsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: EventIdsCreateFormInputValues) => EventIdsCreateFormInputValues;
    onSuccess?: (fields: EventIdsCreateFormInputValues) => void;
    onError?: (fields: EventIdsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: EventIdsCreateFormInputValues) => EventIdsCreateFormInputValues;
    onValidate?: EventIdsCreateFormValidationValues;
} & React.CSSProperties>;
export default function EventIdsCreateForm(props: EventIdsCreateFormProps): React.ReactElement;
