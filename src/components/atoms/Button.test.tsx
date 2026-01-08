import { render } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/dom";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary");
  });

  it("renders with different variants", () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole("button", { name: /outline button/i });
    expect(button).toHaveClass("border-2");
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass("disabled:opacity-50");
  });
});
