import * as React from "react";

import { controlFieldBaseClasses } from "../lib/control-styles";
import { cn } from "../lib/utils";

export interface TextareaProps
  extends React.ComponentProps<"textarea"> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          controlFieldBaseClasses,
          "min-h-20 resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
