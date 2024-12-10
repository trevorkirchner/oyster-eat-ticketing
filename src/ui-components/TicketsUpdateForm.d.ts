/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type TicketsUpdateFormInputValues = {
    UserId?: string;
    EventId?: string;
    TicketId?: string;
    FirstName?: string;
    LastName?: string;
    Email?: string;
    PhoneNumber?: string;
    PaymentStatus?: string;
    Timestamp?: string;
    TicketUsed?: boolean;
    QRData?: string;
};
export declare type TicketsUpdateFormValidationValues = {
    UserId?: ValidationFunction<string>;
    EventId?: ValidationFunction<string>;
    TicketId?: ValidationFunction<string>;
    FirstName?: ValidationFunction<string>;
    LastName?: ValidationFunction<string>;
    Email?: ValidationFunction<string>;
    PhoneNumber?: ValidationFunction<string>;
    PaymentStatus?: ValidationFunction<string>;
    Timestamp?: ValidationFunction<string>;
    TicketUsed?: ValidationFunction<boolean>;
    QRData?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TicketsUpdateFormOverridesProps = {
    TicketsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    UserId?: PrimitiveOverrideProps<TextFieldProps>;
    EventId?: PrimitiveOverrideProps<TextFieldProps>;
    TicketId?: PrimitiveOverrideProps<TextFieldProps>;
    FirstName?: PrimitiveOverrideProps<TextFieldProps>;
    LastName?: PrimitiveOverrideProps<TextFieldProps>;
    Email?: PrimitiveOverrideProps<TextFieldProps>;
    PhoneNumber?: PrimitiveOverrideProps<TextFieldProps>;
    PaymentStatus?: PrimitiveOverrideProps<TextFieldProps>;
    Timestamp?: PrimitiveOverrideProps<TextFieldProps>;
    TicketUsed?: PrimitiveOverrideProps<SwitchFieldProps>;
    QRData?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TicketsUpdateFormProps = React.PropsWithChildren<{
    overrides?: TicketsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    tickets?: any;
    onSubmit?: (fields: TicketsUpdateFormInputValues) => TicketsUpdateFormInputValues;
    onSuccess?: (fields: TicketsUpdateFormInputValues) => void;
    onError?: (fields: TicketsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TicketsUpdateFormInputValues) => TicketsUpdateFormInputValues;
    onValidate?: TicketsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TicketsUpdateForm(props: TicketsUpdateFormProps): React.ReactElement;
