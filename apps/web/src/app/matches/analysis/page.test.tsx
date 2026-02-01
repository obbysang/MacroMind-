import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import MatchAnalysis from "./page";

// Mock Sidebar
vi.mock("@/components/layout/Sidebar", () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: any }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("MatchAnalysis Page", () => {
  // Mock window.alert
  const originalAlert = window.alert;
  const mockAlert = vi.fn();

  beforeEach(() => {
    window.alert = mockAlert;
  });

  afterEach(() => {
    window.alert = originalAlert;
    vi.clearAllMocks();
  });

  it("renders the match analysis page correctly", () => {
    render(<MatchAnalysis />);
    expect(screen.getByText("Match Analysis")).toBeInTheDocument();
    expect(screen.getByText("Match Momentum & Macro Shifts")).toBeInTheDocument();
    expect(screen.getByText("Critical Incidents")).toBeInTheDocument();
    expect(screen.getByText("AI Impact Analysis")).toBeInTheDocument();
  });

  it("handles Export Report button click", () => {
    render(<MatchAnalysis />);
    const exportButton = screen.getByText("Export Report");
    fireEvent.click(exportButton);
    expect(mockAlert).toHaveBeenCalledWith("Export functionality coming soon!");
  });

  it("handles AI Summary button click", () => {
    render(<MatchAnalysis />);
    const summaryButton = screen.getByText("AI Summary");
    fireEvent.click(summaryButton);
    expect(mockAlert).toHaveBeenCalledWith("AI Summary is being generated...");
  });

  it("has accessible buttons", () => {
    render(<MatchAnalysis />);
    expect(screen.getByLabelText("Back to matches")).toBeInTheDocument();
    expect(screen.getByLabelText("Search events")).toBeInTheDocument();
    expect(screen.getByLabelText("Notifications")).toBeInTheDocument();
    expect(screen.getByLabelText("Chat")).toBeInTheDocument();
  });
});
