import { render, fireEvent } from "@testing-library/react";
import { BookmarkChecker } from "@/components/BookmarkChecker";
import { useSession } from "next-auth/react";
import "@testing-library/jest-dom";
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        refresh: jest.fn(),
    }),
}));
jest.mock("next-auth/react");

describe("BookmarkChecker", () => {
    const mockSession = {
        data: { accessToken: "mockToken" },
        status: "authenticated",
    };

    beforeEach(() => {
        (useSession as jest.Mock).mockReturnValue(mockSession);
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        ) as jest.Mock;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders with initial state", () => {
        const { getByRole } = render(
            <BookmarkChecker id="123" initialIsBookmarked={false} />
        );
        expect(getByRole("button")).toBeInTheDocument();
    });

    it("calls POST on click if not bookmarked", async () => {
        const { getByRole } = render(
            <BookmarkChecker id="123" initialIsBookmarked={false} />
        );
        fireEvent.click(getByRole("button"));
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining("/bookmarks/123"),
            expect.objectContaining({ method: "POST" })
        );
    });

    it("calls DELETE on click if already bookmarked", async () => {
        const { getByRole } = render(
            <BookmarkChecker id="123" initialIsBookmarked={true} />
        );
        fireEvent.click(getByRole("button"));
        expect(fetch).toHaveBeenCalledWith(
            expect.stringContaining("/bookmarks/123"),
            expect.objectContaining({ method: "DELETE" })
        );
    });
});
