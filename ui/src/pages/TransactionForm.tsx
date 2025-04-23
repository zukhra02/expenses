import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import {ExpenseDto} from "../types/expense";

type NewTransactionFormProps = {
    onChange: (data: ExpenseDto) => void;
    expense: ExpenseDto;
};

export const TransactionForm = ({ onChange, expense }: NewTransactionFormProps) => {
    const [form, setForm] = useState<ExpenseDto>(expense);

    useEffect(() => {
        setForm(expense); // actualiza el form cuando cambian los datos iniciales
    }, [expense]);

    useEffect(() => {
        onChange(form);
    }, [form, onChange]);

    const handleChange = (e: React.ChangeEvent<any>) => {
        const { name, value } = e.target;

        let parsedValue: any = value;

        if (name === "balance") {
            parsedValue = parseFloat(value);
        }

        setForm((prev) => ({
            ...prev,
            [name]: parsedValue,
        }));
    };

    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select name="category" value={form.category} onChange={handleChange}>
                    <option>Electricity</option>
                    <option>Water</option>
                    <option>Taxes</option>
                    <option>Internet</option>
                    <option>Rental</option>
                    <option>Cleaning</option>
                    <option>Projects</option>
                    <option>Technical direction</option>
                    <option>Collaboration</option>
                    <option>Official requirements</option>
                    <option>Report</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={form.status} onChange={handleChange}>
                    <option>INCOME</option>
                    <option>OUTCOME</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    name="description"
                    value={form.description}
                    placeholder="Description"
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Balance</Form.Label>
                <Form.Control
                    type="number"
                    name="balance"
                    value={form.balance}
                    placeholder="0.00"
                    onChange={handleChange}
                />
            </Form.Group>
        </Form>
    );
};
