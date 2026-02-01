import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import MatchHistory from "./page";

// Mock Sidebar to avoid navigation issues and simplify test
vi.mock("@/components/layout/Sidebar", () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>,
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe("MatchHistory Page", () => {
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

  it("renders the match history page correctly", () => {
    render(<MatchHistory />);
    expect(screen.getAllByText("Match History")).toHaveLength(2);
    expect(screen.getByRole("heading", { name: "Match History" })).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
  });

  it("renders the list of matches", () => {
    render(<MatchHistory />);
    expect(screen.getByText("GEN.G")).toBeInTheDocument();
    expect(screen.getByText("HLE")).toBeInTheDocument();
    expect(screen.getByText("KT")).toBeInTheDocument();
  });

  it("filters matches based on search query", () => {
    render(<MatchHistory />);
    const searchInput = screen.getByLabelText("Search matches");

    // Search for "HLE"
    fireEvent.change(searchInput, { target: { value: "HLE" } });
    
    expect(screen.getByText("HLE")).toBeInTheDocument();
    expect(screen.queryByText("GEN.G")).not.toBeInTheDocument();
    expect(screen.queryByText("KT")).not.toBeInTheDocument();

    // Search for "14.1" (patch)
    fireEvent.change(searchInput, { target: { value: "14.1" } });
    expect(screen.getByText("KT")).toBeInTheDocument();
    expect(screen.queryByText("GEN.G")).not.toBeInTheDocument();
  });

  it("shows no results message when no matches match the query", () => {
    render(<MatchHistory />);
    const searchInput = screen.getByLabelText("Search matches");

    fireEvent.change(searchInput, { target: { value: "NonExistentTeam" } });
    
    expect(screen.getByText('No matches found matching "NonExistentTeam"')).toBeInTheDocument();
    expect(screen.queryByText("T1")).not.toBeInTheDocument();
  });

  it("handles Filter and Sort button clicks", () => {
    render(<MatchHistory />);
    
    fireEvent.click(screen.getByText("Filter"));
    expect(mockAlert).toHaveBeenCalledWith("Filter modal would open here");

    fireEvent.click(screen.getByText("Sort"));
    expect(mockAlert).toHaveBeenCalledWith("Sort options would open here");
  });
});
