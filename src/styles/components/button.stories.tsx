import type { Meta, StoryObj } from "@storybook/react";
import cx from "clsx";

import buttonClasses from "./button.module.css";

const sizes = {
  [`normal`]: ``,
  [`large`]: buttonClasses.sizeLarge,
  [`small`]: buttonClasses.sizeSmall,
  [`extra-small`]: buttonClasses.sizeExtraSmall,
} as const;

const Button = ({
  className,
  children,
  disabled,
  size,
}: {
  className: string;
  children: React.ReactNode;
  disabled?: boolean;
  size?: keyof typeof sizes;
}) => (
  <button
    className={cx(className, size && sizes[size])}
    disabled={disabled}
    type="button"
  >
    {children}
  </button>
);

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
  argTypes: {
    disabled: {
      control: { type: "boolean" },
    },
    size: {
      options: Object.keys(sizes),
      control: { type: "radio" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Ordinary: Story = {
  render: (args) => (
    <Button {...args} className={buttonClasses.button}>
      Ordinary
    </Button>
  ),
};

export const Primary: Story = {
  render: (args) => (
    <Button
      {...args}
      className={cx(buttonClasses.button, buttonClasses.variantPrimary)}
    >
      Primary
    </Button>
  ),
};

export const Danger: Story = {
  render: (args) => (
    <Button
      {...args}
      className={cx(buttonClasses.button, buttonClasses.variantDanger)}
    >
      Danger
    </Button>
  ),
};

export const Stealth: Story = {
  render: (args) => (
    <Button
      {...args}
      className={cx(buttonClasses.button, buttonClasses.variantStealth)}
    >
      Stealth
    </Button>
  ),
};
