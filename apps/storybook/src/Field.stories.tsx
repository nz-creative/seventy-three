import type { Meta, StoryObj } from "@storybook/react";

import {
  Field,
  FieldControl,
  FieldError,
  FieldHint,
  FieldLabel,
  Input,
  Textarea,
} from "@seventythree/ui";

const meta = {
  title: "Components/Field",
  component: Field,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Wraps label, optional hint, optional error, and control with stable ids and aria-describedby / aria-invalid wiring. Wrap Input or Textarea with FieldControl (Radix Slot merges props onto the child).",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHint: Story = {
  render: () => (
    <Field className="w-[320px]">
      <FieldLabel>Workspace name</FieldLabel>
      <FieldHint>Shown in the sidebar and invitations.</FieldHint>
      <FieldControl>
        <Input placeholder="Acme" />
      </FieldControl>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field invalid className="w-[320px]">
      <FieldLabel variant="error">Email</FieldLabel>
      <FieldControl>
        <Input type="email" defaultValue="not-an-email" />
      </FieldControl>
      <FieldError>Enter a valid email address.</FieldError>
    </Field>
  ),
};

export const HintAndError: Story = {
  render: () => (
    <Field invalid className="w-[400px]">
      <FieldLabel variant="error">Summary</FieldLabel>
      <FieldHint>One line for changelogs and PR titles.</FieldHint>
      <FieldControl>
        <Textarea rows={3} defaultValue="" placeholder="Describe the change…" />
      </FieldControl>
      <FieldError>Summary is required.</FieldError>
    </Field>
  ),
};
