import type { Meta, StoryObj } from "@storybook/react";

import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@seventythree/ui";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Surface with optional header, body, and footer. Compose with Button and text utilities.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Update your account settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Card content uses text-sm and muted for supporting copy.
        </p>
      </CardContent>
      <CardFooter>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  ),
};
