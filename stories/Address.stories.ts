import type { Meta, StoryObj } from "@storybook/react";
import { Address } from "../app/components/Address";

const address = {
  street: "1600 Pennsylvania Ave.",
  city: "Washington",
  state: "D.C.",
  postalCode: "20500",
  country: "USA",
};

const meta = {
  title: "Address",
  component: Address,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    // layout: 'fullscreen',
  },
} satisfies Meta<typeof Address>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    ...address,
  },
};
