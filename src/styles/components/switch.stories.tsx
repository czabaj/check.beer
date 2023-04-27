import type { Meta, StoryObj } from "@storybook/react";
import cx from "clsx";

import switchClasses from "./switch.module.css";

const Switch = ({
  className,
  disabled,
  label,
}: {
  className: string;
  disabled?: boolean;
  label: React.ReactNode;
}) => (
  <label>
    {label}
    <input className={className} disabled={disabled} type="checkbox" />
  </label>
);

const meta: Meta<typeof Switch> = {
  title: "Switch",
  component: Switch,
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Ordinary: Story = {
  render: (args) => (
    <Switch {...args} className={switchClasses.switch} label="Ordinary" />
  ),
};
