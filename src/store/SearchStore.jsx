import {useState} from "react";

export default function SearchStore() {
    const [search, setSearch] = useState("");

    return {search, setSearch};
};

