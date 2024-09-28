import {useState} from "react";

export default function useSearchStoreLocal() {
    const [searchValue, setSearchValue] = useState("");

    return {searchValue, setSearchValue};
};

