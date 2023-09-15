import React, { useState } from "react";
import { Button, Table, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../customHooks/hooks";
import {
    factToHistory,
    randomFact,
    deleteFactFromHistory,
} from "../slices/mathFactsSlice";
import { CloseOutlined } from '@ant-design/icons';
import './randomMathFact.css'
// @ts-ignore
import cursor from "../img/click.png";


interface Column {
    title: string;
    dataIndex: string;
    date: string;
    render?: (text: any, record: randomFact) => React.ReactNode;
    width?: number;
}

const RandomMathFact = () => {
    const dispatch = useAppDispatch();
    const facts = useAppSelector((state) => state.facts);

    const lastFacts = facts.slice(0, -1);
    const [newFact, setNewFact] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [columns, setColumns] = useState<Column[]>([
        {
            title: "ID",
            dataIndex: "id",
            date: "id",
            width: 20,
        },
        {
            title: "Random Fact",
            dataIndex: "randomFact",
            date: "randomFact",
        },
        {
            title: "Date",
            dataIndex: "correctDate",
            date: "correctDate",
            width: 160
        },
        {
            title: "",
            dataIndex: "action",
            date: "action",
            width: 10,
            render: (_, fact: any) => (
                <Button type="link" onClick={() => handleDelete(fact.id)}>
                    <CloseOutlined />
                </Button>
            ),
        },
    ]);

    const handleGetNewRandomFact = () => {
        setIsLoading(true);
        fetch("http://numbersapi.com/random/math")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}`);
                }
                return response.text();
            })
            .then((fact) => {
                setNewFact(fact);
                setIsLoading(false);
                dispatch(factToHistory(fact));
            })
            .catch((error) => {
                throw new Error(error);
            });
    };

    const handleDelete = (id: number) => {
        dispatch(deleteFactFromHistory(id));
    };

    return (
        <div className="fact-container">
            <div className="fact__new-fact">
                <div className="fact__random-fact">
                    <h2 className="fact__random-fact-text">
                        {newFact ? newFact : "Here can be a random fact"}
                    </h2>
                </div>
                <div className="fact__random-fact-button">
                    <img src={cursor} alt="" className="cursor-image" />
                    <Button
                        className="fact__button"
                        onClick={() => {
                            handleGetNewRandomFact();
                        }}
                    >
                        {isLoading ? (
                            <Spin />
                        ) : (
                            <p className="button-text">
                                Generate new random fact
                            </p>
                        )}
                    </Button>
                </div>
            </div>
            <h2 className="h2">History</h2>
            {facts.length > 1 ? (
                <Table
                    className="table-history"
                    columns={columns}
                    dataSource={lastFacts}
                    pagination={{pageSize: 3}}
                    rowKey={(fact) => fact.date}
                />
            ) : (
                <p className="unabled-text">no history yet...</p>
            )}
        </div>
    );
};

export default RandomMathFact;
