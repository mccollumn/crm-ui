import type { Meta, StoryObj } from "@storybook/react";
import CaseComments from "../app/components/cases/CaseComments";

const caseInfoLeft = [
  { label: "Subject", value: "We're confused" },
  { label: "Account Name", value: "A Customer" },
  {
    label: "Description",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
  },
];
const caseInfoRight = [
  { label: "Status", value: "Open" },
  { label: "Sub Status", value: "Waiting on customer" },
  {
    label: "Date/Time Opened",
    value: "8/2/2023 10:12 AM",
  },
];

const meta = {
  title: "Sections/Case Comments",
  component: CaseComments,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof CaseComments>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Comments: Story = {
  args: {},
};
