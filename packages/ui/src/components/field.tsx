import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { fieldAriaDescribedBy, fieldIdSuffixFromReactId } from "../lib/field-ids";
import { cn } from "../lib/utils";
import { Label } from "./label";

type FieldContextValue = {
  controlId: string;
  descriptionId: string;
  errorId: string;
  invalid: boolean;
  hintPresent: boolean;
  errorPresent: boolean;
  setHintPresent: (v: boolean) => void;
  setErrorPresent: (v: boolean) => void;
};

const FieldContext = React.createContext<FieldContextValue | null>(null);

function useField() {
  const ctx = React.useContext(FieldContext);
  if (!ctx) throw new Error("Field subcomponents must be used within <Field>");
  return ctx;
}

export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** When true, marks the control invalid and surfaces error text for assistive tech. */
  invalid?: boolean;
}

/**
 * Groups label, optional hint, optional error, and control with stable `id` /
 * `aria-describedby` / `aria-invalid` wiring.
 */
function Field({
  className,
  invalid = false,
  children,
  ...props
}: FieldProps) {
  const base = React.useId();
  const suffix = fieldIdSuffixFromReactId(base);
  const controlId = `field-control-${suffix}`;
  const descriptionId = `field-desc-${suffix}`;
  const errorId = `field-err-${suffix}`;

  const [hintPresent, setHintPresent] = React.useState(false);
  const [errorPresent, setErrorPresent] = React.useState(false);

  const setHintPresentStable = React.useCallback((v: boolean) => {
    setHintPresent(v);
  }, []);
  const setErrorPresentStable = React.useCallback((v: boolean) => {
    setErrorPresent(v);
  }, []);

  const value = React.useMemo<FieldContextValue>(
    () => ({
      controlId,
      descriptionId,
      errorId,
      invalid,
      hintPresent,
      errorPresent,
      setHintPresent: setHintPresentStable,
      setErrorPresent: setErrorPresentStable,
    }),
    [
      controlId,
      descriptionId,
      errorId,
      invalid,
      hintPresent,
      errorPresent,
      setHintPresentStable,
      setErrorPresentStable,
    ]
  );

  return (
    <FieldContext.Provider value={value}>
      <div className={cn("flex flex-col gap-2", className)} {...props}>
        {children}
      </div>
    </FieldContext.Provider>
  );
}

export type FieldLabelProps = React.ComponentProps<typeof Label>;

function FieldLabel({ className, ...props }: FieldLabelProps) {
  const { controlId } = useField();
  return <Label htmlFor={controlId} className={className} {...props} />;
}

export type FieldHintProps = React.HTMLAttributes<HTMLParagraphElement>;

function FieldHint({ className, id, ...props }: FieldHintProps) {
  const { descriptionId, setHintPresent } = useField();

  React.useLayoutEffect(() => {
    setHintPresent(true);
    return () => setHintPresent(false);
  }, [setHintPresent]);

  return (
    <p
      id={id ?? descriptionId}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export type FieldErrorProps = React.HTMLAttributes<HTMLParagraphElement>;

function FieldError({ className, id, children, ...props }: FieldErrorProps) {
  const { errorId, setErrorPresent } = useField();
  const hasContent =
    children !== null &&
    children !== undefined &&
    !(typeof children === "string" && children.trim() === "");

  React.useLayoutEffect(() => {
    setErrorPresent(Boolean(hasContent));
    return () => setErrorPresent(false);
  }, [hasContent, setErrorPresent]);

  if (!hasContent) return null;

  return (
    <p
      id={id ?? errorId}
      role="alert"
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export type FieldControlProps = React.ComponentProps<typeof Slot>;

/**
 * Forwards `id`, `aria-describedby`, and `aria-invalid` to the child (`Input`,
 * `Textarea`, etc.). Render a single child element (Slot merges props into it).
 */
const FieldControl = React.forwardRef<HTMLElement, FieldControlProps>(
  ({ ...props }, ref) => {
    const {
      controlId,
      descriptionId,
      errorId,
      invalid,
      hintPresent,
      errorPresent,
    } = useField();

    const describedBy = fieldAriaDescribedBy({
      hintPresent,
      errorPresent,
      descriptionId,
      errorId,
    });

    return (
      <Slot
        ref={ref}
        data-slot="field-control"
        id={controlId}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        {...props}
      />
    );
  }
);
FieldControl.displayName = "FieldControl";

export {
  Field,
  FieldLabel,
  FieldHint,
  FieldError,
  FieldControl,
};
