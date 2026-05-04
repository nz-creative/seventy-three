import type { Meta, StoryObj } from "@storybook/react";

import { Input, Label, Textarea } from "@seventythree/ui";

const meta = {
  title: "Components/Form fields",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Input, Textarea, and Label. Shared control styles come from `controlFieldBaseClasses` in the UI package. Pair `Label` `htmlFor` with the control `id`.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LabelAndInput: Story = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" autoComplete="email" />
    </div>
  ),
};

export const TextareaField: Story = {
  render: () => (
    <div className="flex w-[400px] flex-col gap-2">
      <Label htmlFor="notes">Notes</Label>
      <Textarea id="notes" placeholder="Optional details…" rows={4} />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="flex w-[320px] flex-col gap-2">
      <Label htmlFor="err" variant="error">
        Password
      </Label>
      <Input id="err" type="password" aria-invalid="true" defaultValue="123" />
    </div>
  ),
};
