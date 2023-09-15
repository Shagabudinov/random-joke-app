import React, { useState } from "react";
import { Button, Table, Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../customHooks/hooks";
import {
    jokeToHistory,
    randomJoke,
    deleteJokeFromHistory,
} from "../slices/jokesSlice";
import { CloseOutlined } from "@ant-design/icons";
import './randomJoke.css'
// @ts-ignore
import cursor from "../img/click.png";

interface Column {
    title: string;
    dataIndex: string;
    date: string;
    render?: (text: any, record: randomJoke) => React.ReactNode;
    width?: number;
}

const RandomMathJoke = () => {
    const dispatch = useAppDispatch();
    const jokes = useAppSelector((state) => state.jokes);

    const lastJokes = jokes.slice(0, -1);
    const [newJoke, setNewJoke] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [columns] = useState<Column[]>([
        {
            title: "ID",
            dataIndex: "id",
            date: "id",
            width: 20,
        },
        {
            title: "Random Joke",
            dataIndex: "randomJoke",
            date: "randomJoke",
        },
        {
            title: "Date",
            dataIndex: "correctDate",
            date: "correctDate",
            width: 160,
        },
        {
            title: "",
            dataIndex: "action",
            date: "action",
            width: 10,
            render: (_, Joke: any) => (
                <Button type="link" onClick={() => handleDelete(Joke.id)}>
                    <CloseOutlined />
                </Button>
            ),
        },
    ]);
    //https://geek-jokes.sameerkumar.website/api?format=json
    //http://numbersapi.com/random/math
    const handleGetNewRandomJoke = () => {
        setIsLoading(true);
        fetch(`https://geek-jokes.sameerkumar.website/api?format=text`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error ${response.status}`);
                }
                return response.text();
            })
            .then((Joke) => {
                setNewJoke(Joke);
                setIsLoading(false);
                dispatch(jokeToHistory(Joke));
            })
            .catch((error) => {
                throw new Error(error);
            });
    };

    const handleDelete = (id: number) => {
        dispatch(deleteJokeFromHistory(id));
    };

    return (
        <div className="Joke-container">
            <div className="Joke__new-Joke">
                <div className="Joke__random-Joke">
                    <h2 className="Joke__random-Joke-text">
                        {newJoke ? newJoke : "Here can be a random Joke"}
                    </h2>
                </div>
                <div className="Joke__random-Joke-button">
                    <img src={cursor} alt="" className="cursor-image" />
                    <Button
                        className="Joke__button"
                        onClick={() => {
                            handleGetNewRandomJoke();
                        }}
                    >
                        {isLoading ? (
                            <Spin />
                        ) : (
                            <p className="button-text">
                                Generate new random Joke
                            </p>
                        )}
                    </Button>
                </div>
            </div>
            <h2 className="h2">History</h2>
            {jokes.length > 1 ? (
                <Table
                    className="table-history"
                    columns={columns}
                    dataSource={lastJokes}
                    pagination={{ pageSize: 3 }}
                    rowKey={(Joke) => Joke.date}
                />
            ) : (
                <p className="unabled-text">no history yet...</p>
            )}
        </div>
    );
};

export default RandomMathJoke;
