/* eslint-disable testing-library/prefer-screen-queries */
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";

import React from "react";
import App from "../App";

describe("ToDo-Liste", () => {
    it("kann ein Todo hinzufügen und löschen", () => {
        const { getByText, getByRole, queryByText } = render(<App />);

        const input = getByRole("textbox");

        // Füge ein neues Todo hinzu
        fireEvent.change(input, { target: { value: "Test Todo" } });
        fireEvent.submit(input);

        // Überprüfe, ob das neue Todo in der Liste ist
        const todo = getByText("Test Todo");
        expect(todo).toBeInTheDocument();

        // Lösche das Todo
        const deleteButton = getByText(/(löschen|delete|x|❌|✖️)/i);
        fireEvent.click(deleteButton);

        // Überprüfe, ob das Todo nicht mehr in der Liste ist
        const deletedTodo = queryByText("Test Todo");
        expect(deletedTodo).not.toBeInTheDocument();
    });

    it("kann ein Todo bearbeiten", () => {
        const { getByText, getAllByRole } = render(<App />);
        const input = getAllByRole("textbox")[0];

        // Füge ein neues Todo hinzu
        fireEvent.change(input, { target: { value: "Test Todo" } });
        fireEvent.submit(input);

        // Bearbeite das Todo
        const editButton = getByText(/(bearbeiten|edit|📝|✏️)/i);
        fireEvent.click(editButton);

        const editInput = getAllByRole("textbox")[1];
        fireEvent.change(editInput, { target: { value: "Geändertes Todo" } });
        const saveButton = getByText(/(speichern|save|sichern|✅|☑️|✔️)/i);
        fireEvent.click(saveButton);

        // Überprüfe, ob das Todo mit dem neuen Text angezeigt wird
        const editedTodo = getByText("Geändertes Todo");
        expect(editedTodo).toBeInTheDocument();
    });
});
