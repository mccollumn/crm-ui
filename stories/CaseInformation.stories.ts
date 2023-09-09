import type { Meta, StoryObj } from "@storybook/react";
import CaseInformation from "../app/components/cases/CaseInformation";

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
  title: "Sections/Case Information",
  component: CaseInformation,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof CaseInformation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CaseInfo: Story = {
  args: {
    caseID: "138195",
  },
};
