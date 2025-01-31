import { render } from "@testing-library/react";

import { OrderStatus } from "./order-status";
describe("Order Status", () => {
    it("should display the right text when order status is pending", () => {
        const wrapper = render(<OrderStatus status="pending" />);

        const status = wrapper.getByText("Pendente");
        const badge = wrapper.getByTestId("badge");

        // wrapper.debug();
        expect(status).toBeInTheDocument();
        expect(badge).toHaveClass("bg-slate-400");
    });

    it("should display the right text when order status is canceled", () => {
        const wrapper = render(<OrderStatus status="canceled" />);

        const status = wrapper.getByText("Cancelado");
        const badge = wrapper.getByTestId("badge");

        // wrapper.debug();
        expect(status).toBeInTheDocument();
        expect(badge).toHaveClass("bg-rose-400");
    });

    it("should display the right text when order status is delivering", () => {
        const wrapper = render(<OrderStatus status="delivering" />);

        const status = wrapper.getByText("Em entrega");
        const badge = wrapper.getByTestId("badge");

        // wrapper.debug();
        expect(status).toBeInTheDocument();
        expect(badge).toHaveClass("bg-amber-400");
    });

    it("should display the right text when order status is processing", () => {
        const wrapper = render(<OrderStatus status="processing" />);

        const status = wrapper.getByText("Em preparo");
        const badge = wrapper.getByTestId("badge");

        // wrapper.debug();
        expect(status).toBeInTheDocument();
        expect(badge).toHaveClass("bg-amber-400");
    });

    it("should display the right text when order status is delivered", () => {
        const wrapper = render(<OrderStatus status="delivered" />);

        const status = wrapper.getByText("Entregue");
        const badge = wrapper.getByTestId("badge");

        // wrapper.debug();
        expect(status).toBeInTheDocument();
        expect(badge).toHaveClass("bg-emerald-400");
    });
});
