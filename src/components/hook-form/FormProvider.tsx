import { FormProvider as Form } from "react-hook-form";
import { IFormProvider, MethodeType } from "~/types";
// ----------------------------------------------------------------------

import { FC } from "react";
import styled from "@emotion/styled";

const FormProvider: FC<IFormProvider<MethodeType>> = ({
  children,
  onSubmit,
  methods,
}): JSX.Element => {
  return (
    <Form {...methods}>
      <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
    </Form>
  );
};
const StyledForm = styled("form")(
  () => `  
  width:100%;  
`
);
export default FormProvider;
