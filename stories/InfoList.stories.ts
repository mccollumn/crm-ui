import type { Meta, StoryObj } from "@storybook/react";
import InfoList from "../app/components/InfoList";

const items = [
  { label: "Subject", value: "We're confused" },
  { label: "Account Name", value: "A Customer" },
  {
    label: "Description",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
];

const meta = {
  title: "Lists/Info",
  component: InfoList,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    // layout: 'fullscreen',
  },
} satisfies Meta<typeof InfoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CaseInfoList: Story = {
  args: {
    items: items,
  },
};
