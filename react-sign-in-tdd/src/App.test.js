import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByTestId("app");
  expect(linkElement).toBeInTheDocument();
});

describe("Navigation", () => {
  beforeEach(() => {
    render(<App />);
  });
  it("should have app on title", () => {


    const titleElement = screen.getByTestId("app-header--navbar-title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('App');
  });

  it('should render home page', ()=>{
    expect(screen.getByTestId("home-page--wrapper")).toBeInTheDocument();
  })
  it("should navigate to post after click then to home on click again", () => {

    const linkElement = screen.getByTestId("app-header--navbar-link-post");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("post-1")
    fireEvent.click(linkElement);
    expect(screen.getByTestId("post-page--wrapper")).toBeInTheDocument();

    const linkHomeElement = screen.getByTestId("app-header--navbar-link-home");
    expect(linkHomeElement).toBeInTheDocument()
    expect(linkHomeElement).toHaveTextContent('home');
    fireEvent.click(linkHomeElement);

    expect(screen.getByTestId("home-page--wrapper")).toBeInTheDocument();
  });
});
