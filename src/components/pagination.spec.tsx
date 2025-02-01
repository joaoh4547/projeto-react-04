import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Pagination } from "./pagination";

const onPageChangeCallback = vi.fn();
describe("Pagination", () => {
    beforeEach(() => {
        onPageChangeCallback.mockClear();
    });

    it("should display the right amount of pages and results", () => {
        const wrapper = render(
            <Pagination
                pageIndex={0}
                pageCount={200}
                perPage={10}
                onPageChange={() => {}}
            />,
        );

        expect(wrapper.getByText("Página 1 de 20")).toBeInTheDocument();
        expect(wrapper.getByText("Total de 200 item(s)")).toBeInTheDocument();
    });

    it("should be able navigate to the next page", async () => {
        const wrapper = render(
            <Pagination
                pageIndex={0}
                pageCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />,
        );

        const nextPageButton = wrapper.getByRole("button", {
            name: "Proxima Página",
        });

        const user = userEvent.setup();

        await user.click(nextPageButton);

        expect(onPageChangeCallback).toHaveBeenCalledWith(1);
    });

    it("should be able navigate to the previous page", async () => {
        const wrapper = render(
            <Pagination
                pageIndex={5}
                pageCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />,
        );

        const nextPageButton = wrapper.getByRole("button", {
            name: "Página Anterior",
        });

        const user = userEvent.setup();

        await user.click(nextPageButton);

        expect(onPageChangeCallback).toHaveBeenCalledWith(4);
    });

    it("should be able navigate to the first page", async () => {
        const wrapper = render(
            <Pagination
                pageIndex={5}
                pageCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />,
        );

        const nextPageButton = wrapper.getByRole("button", {
            name: "Primeira Página",
        });

        const user = userEvent.setup();

        await user.click(nextPageButton);

        expect(onPageChangeCallback).toHaveBeenCalledWith(0);
    });

    it("should be able navigate to the last page", async () => {
        const wrapper = render(
            <Pagination
                pageIndex={0}
                pageCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />,
        );

        const nextPageButton = wrapper.getByRole("button", {
            name: "Última Página",
        });

        const user = userEvent.setup();

        await user.click(nextPageButton);

        expect(onPageChangeCallback).toHaveBeenCalledWith(19);
    });
});
